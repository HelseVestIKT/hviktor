#!/usr/bin/env node

/**
 * Generate example files from demo components.
 *
 * Usage:
 *   npm run generate:examples                    # Generate for all demo files
 *   npm run generate:examples -- dialog          # Generate for specific demo
 *   npm run generate:examples -- path/to/demo.ts # Generate for specific file
 *   npm run generate:examples -- dialog --check  # Write nothing, list what would change (exit 1 if anything)
 *   npm run generate:examples -- --no-format     # Skip prettier
 *
 * Every <app-demo-section> becomes a standalone example component that only contains
 * what that section actually uses:
 *  - Class members referenced from the section template, plus whatever those members
 *    reference through `this.x`, transitively. Constructors and lifecycle hooks keep
 *    only the statements that touch included members.
 *  - Exported top-level declarations in the demo file (interfaces, types, …) are imported
 *    from the demo file. Non-exported ones are copied into the example.
 *  - Imports are only kept when used. Entries in `@Component.imports` are matched against
 *    the real selectors in the library, so types and services never end up there.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const DEMO_DIR = path.join(ROOT, 'src/app/demo/pages/components');
const LIBRARY_DIR = path.join(ROOT, 'projects/hviktor/src');

const args = process.argv.slice(2);
const CHECK = args.includes('--check');
const FORMAT = !args.includes('--no-format');
const positional = args.filter((arg) => !arg.startsWith('--'));

// Generated examples will be placed in code-examples subfolder of each component
function getGeneratedDir(demoName) {
  return path.join(DEMO_DIR, demoName, 'code-examples');
}

// Demo-only wrappers that never belong in an example
const DEMO_WRAPPERS = ['DemoPageComponent', 'DemoSectionComponent'];

const LIFECYCLE_HOOKS = {
  ngOnChanges: 'OnChanges',
  ngOnInit: 'OnInit',
  ngDoCheck: 'DoCheck',
  ngAfterContentInit: 'AfterContentInit',
  ngAfterContentChecked: 'AfterContentChecked',
  ngAfterViewInit: 'AfterViewInit',
  ngAfterViewChecked: 'AfterViewChecked',
  ngOnDestroy: 'OnDestroy',
};

/** Angular/common imports that have no selector we can look up in the library. */
const KNOWN_TEMPLATE_USAGE = {
  FormsModule: (t) => /\bngModel\b/.test(t),
  ReactiveFormsModule: (t) =>
    /\b(formGroup|formControlName|formControl|formArrayName|formGroupName)\b/.test(t),
  RouterLink: (t) => /\brouterLink\b/.test(t),
  RouterLinkActive: (t) => /\brouterLinkActive\b/.test(t),
  RouterOutlet: (t) => /<router-outlet\b/.test(t),
  NgTemplateOutlet: (t) => /\bngTemplateOutlet\b/.test(t),
  NgComponentOutlet: (t) => /\bngComponentOutlet\b/.test(t),
  NgClass: (t) => /\bngClass\b/.test(t),
  NgStyle: (t) => /\bngStyle\b/.test(t),
  NgIf: (t) => /\*ngIf\b/.test(t),
  NgFor: (t) => /\*ngFor\b/.test(t),
  NgSwitch: (t) => /\bngSwitch\b/.test(t),
  NgSwitchCase: (t) => /\*ngSwitchCase\b/.test(t),
  NgSwitchDefault: (t) => /\*ngSwitchDefault\b/.test(t),
  AsyncPipe: (t) => usesPipe(t, 'async'),
  DatePipe: (t) => usesPipe(t, 'date'),
  JsonPipe: (t) => usesPipe(t, 'json'),
  DecimalPipe: (t) => usesPipe(t, 'number'),
  CurrencyPipe: (t) => usesPipe(t, 'currency'),
  PercentPipe: (t) => usesPipe(t, 'percent'),
  UpperCasePipe: (t) => usesPipe(t, 'uppercase'),
  LowerCasePipe: (t) => usesPipe(t, 'lowercase'),
  TitleCasePipe: (t) => usesPipe(t, 'titlecase'),
  SlicePipe: (t) => usesPipe(t, 'slice'),
  KeyValuePipe: (t) => usesPipe(t, 'keyvalue'),
  CommonModule: (t) =>
    /\*ng(If|For|Switch)|\bng(Class|Style|TemplateOutlet|Switch)\b/.test(t) ||
    /(^|[^|])\|\s*(async|date|json|number|currency|percent|uppercase|lowercase|titlecase|slice|keyvalue)\b/.test(
      t,
    ),
};

function usesPipe(template, pipeName) {
  return new RegExp(`(^|[^|])\\|\\s*${pipeName}\\b`).test(template);
}

/**
 * Convert kebab-case to PascalCase
 */
function toPascal(str) {
  return str
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');
}

/**
 * Convert string to slug (kebab-case, lowercase)
 */
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[ø]/g, 'o')
    .replace(/[å]/g, 'a')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert slug to camelCase
 */
function toCamelCase(str) {
  return str
    .split('-')
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join('');
}

function toKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function quote(str) {
  return `'${str.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function compareOrdinal(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

// ---------------------------------------------------------------------------
// Template parsing
// ---------------------------------------------------------------------------

/**
 * Find start tags in an HTML template. Quote-aware, so `(click)="a > b"` does not end the tag.
 */
function findStartTags(text, tagName) {
  const tags = [];
  const tagPattern = tagName
    ? new RegExp(`<(${tagName})(?=[\\s/>])`, 'g')
    : /<([a-zA-Z][\w-]*)(?=[\s/>])/g;

  let match;
  while ((match = tagPattern.exec(text)) !== null) {
    const start = match.index;
    let index = start + match[0].length;
    let quoteChar = null;

    while (index < text.length) {
      const char = text[index];
      if (quoteChar) {
        if (char === quoteChar) quoteChar = null;
      } else if (char === '"' || char === "'") {
        quoteChar = char;
      } else if (char === '>') {
        break;
      }
      index++;
    }

    const attributeText = text.slice(start + match[0].length, index).replace(/\/\s*$/, '');
    tags.push({
      tag: match[1].toLowerCase(),
      start,
      end: index + 1,
      attributes: parseAttributes(attributeText, start + match[0].length),
    });
    tagPattern.lastIndex = index + 1;
  }

  return tags;
}

/**
 * Parse attributes from the inside of a start tag.
 * `offset` is the position of `attributeText` in the full text, so callers can edit it.
 */
function parseAttributes(attributeText, offset = 0) {
  const attributes = [];
  const pattern = /([^\s=/>"']+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g;

  let match;
  while ((match = pattern.exec(attributeText)) !== null) {
    const raw = match[2];
    const value = raw && /^["']/.test(raw) ? raw.slice(1, -1) : raw;
    attributes.push({
      rawName: match[1],
      name: normalizeAttributeName(match[1]),
      value: value ?? null,
      end: offset + match.index + match[0].length,
    });
  }

  return attributes;
}

function normalizeAttributeName(rawName) {
  return rawName
    .replace(/^(bind-|on-|bindon-)/, '')
    .replace(/^[[(*]+/, '')
    .replace(/[\])]+$/, '');
}

function isBindingAttribute(rawName) {
  return /^(\[|\(|\*|bind-|on-|bindon-)/.test(rawName);
}

/**
 * Extract <app-demo-section> blocks from template
 */
function extractSections(template) {
  const sections = [];

  for (const tag of findStartTags(template, 'app-demo-section')) {
    const closeIndex = template.indexOf('</app-demo-section>', tag.end);
    if (closeIndex === -1) continue;

    const attribute = (name) => tag.attributes.find((a) => a.rawName === name)?.value ?? '';
    const title = attribute('title') || 'Untitled';

    sections.push({
      title,
      description: attribute('description'),
      content: dedent(template.slice(tag.end, closeIndex)),
      slug: toSlug(title),
    });
  }

  return sections;
}

function dedent(text) {
  const lines = text.split('\n');
  const nonEmpty = lines.filter((line) => line.trim().length > 0);
  const minIndent = nonEmpty.reduce(
    (min, line) => Math.min(min, line.match(/^(\s*)/)[1].length),
    Infinity,
  );

  return lines
    .map((line) => (line.trim().length === 0 ? '' : line.slice(minIndent)))
    .join('\n')
    .trim();
}

/**
 * Identifiers used in template expressions: interpolations, bindings, control flow and @let.
 */
function findTemplateIdentifiers(template) {
  const expressions = [];

  for (const match of template.matchAll(/\{\{([\s\S]*?)\}\}/g)) expressions.push(match[1]);

  for (const element of findStartTags(template)) {
    for (const attribute of element.attributes) {
      if (attribute.value && isBindingAttribute(attribute.rawName)) {
        expressions.push(attribute.value);
      }
    }
  }

  const blockPattern = /@(?:if|else\s+if|for|switch|case|defer)\s*\(/g;
  let match;
  while ((match = blockPattern.exec(template)) !== null) {
    let depth = 1;
    let index = match.index + match[0].length;
    const start = index;
    while (index < template.length && depth > 0) {
      if (template[index] === '(') depth++;
      if (template[index] === ')') depth--;
      index++;
    }
    expressions.push(template.slice(start, index - 1));
  }

  for (const letMatch of template.matchAll(/@let\s+[\w$]+\s*=\s*([^;]*);/g)) {
    expressions.push(letMatch[1]);
  }

  const identifiers = new Set();
  for (const expression of expressions) {
    const withoutStrings = expression.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, '""');
    for (const id of withoutStrings.matchAll(/(\?\.\s*|\.\s*)?([A-Za-z_$][\w$]*)/g)) {
      if (!id[1]) identifiers.add(id[2]);
    }
  }

  return identifiers;
}

// ---------------------------------------------------------------------------
// Library index: selectors, kits and pipes in projects/hviktor
// ---------------------------------------------------------------------------

let libraryIndex;

function getLibraryIndex() {
  if (libraryIndex) return libraryIndex;

  libraryIndex = { selectors: new Map(), kits: new Map(), pipes: new Map(), exports: new Set() };
  if (!fs.existsSync(LIBRARY_DIR)) return libraryIndex;

  const files = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== 'schematics') walk(fullPath);
      } else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.spec.ts')) {
        files.push(fullPath);
      }
    }
  })(LIBRARY_DIR);

  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    if (!/export\s+(class|const|interface|type|function|enum|abstract)/.test(text)) continue;

    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true);

    for (const statement of sourceFile.statements) {
      if (!hasExportModifier(statement)) continue;

      for (const name of declarationNames(statement)) libraryIndex.exports.add(name);

      if (ts.isClassDeclaration(statement) && statement.name) {
        const decorator = findDecorator(statement, ['Component', 'Directive', 'Pipe']);
        if (!decorator) continue;

        const options = decorator.options;
        if (decorator.name === 'Pipe') {
          const pipeName = stringProperty(options, 'name');
          if (pipeName) libraryIndex.pipes.set(statement.name.text, pipeName);
        } else {
          const selector = stringProperty(options, 'selector');
          if (selector) libraryIndex.selectors.set(statement.name.text, parseSelector(selector));
        }
      }

      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          let initializer = declaration.initializer;
          while (
            initializer &&
            (ts.isAsExpression(initializer) ||
              ts.isSatisfiesExpression(initializer) ||
              ts.isParenthesizedExpression(initializer))
          ) {
            initializer = initializer.expression;
          }
          if (!initializer || !ts.isArrayLiteralExpression(initializer)) continue;
          if (!ts.isIdentifier(declaration.name)) continue;

          const members = initializer.elements
            .map((element) => (ts.isSpreadElement(element) ? element.expression : element))
            .filter(ts.isIdentifier)
            .map((identifier) => identifier.text);
          libraryIndex.kits.set(declaration.name.text, members);
        }
      }
    }
  }

  return libraryIndex;
}

function findDecorator(node, names) {
  for (const decorator of ts.getDecorators(node) ?? []) {
    const expression = decorator.expression;
    if (!ts.isCallExpression(expression) || !ts.isIdentifier(expression.expression)) continue;
    if (!names.includes(expression.expression.text)) continue;

    const options = expression.arguments[0];
    return {
      name: expression.expression.text,
      options: options && ts.isObjectLiteralExpression(options) ? options : undefined,
    };
  }
  return undefined;
}

function findProperty(objectLiteral, name) {
  return objectLiteral?.properties.find(
    (property) =>
      ts.isPropertyAssignment(property) && property.name && propertyNameText(property.name) === name,
  );
}

function stringProperty(objectLiteral, name) {
  const initializer = findProperty(objectLiteral, name)?.initializer;
  if (
    initializer &&
    (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer))
  ) {
    return initializer.text;
  }
  return undefined;
}

function propertyNameText(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isPrivateIdentifier(name)) {
    return name.text;
  }
  return undefined;
}

/**
 * Parse an Angular selector into simple parts: tag, attribute names and classes.
 * `:not(...)` is ignored, which errs on the side of including an import.
 */
function parseSelector(selector) {
  return selector
    .split(',')
    .map((part) => part.replace(/:not\([^)]*\)/g, '').trim())
    .filter(Boolean)
    .map((part) => ({
      tag: part.match(/^[a-zA-Z][\w-]*/)?.[0].toLowerCase(),
      attributes: [...part.matchAll(/\[([^\]=~|^$*\s]+)/g)].map((m) => m[1].toLowerCase()),
      classes: [...part.matchAll(/\.([\w-]+)/g)].map((m) => m[1]),
    }))
    .filter((part) => part.tag || part.attributes.length || part.classes.length);
}

function selectorMatches(selectorParts, elements) {
  return selectorParts.some((part) =>
    elements.some((element) => {
      if (part.tag && element.tag !== part.tag) return false;
      const names = new Set(element.attributes.map((a) => a.name.toLowerCase()));
      if (!part.attributes.every((attribute) => names.has(attribute))) return false;
      const classes = (element.attributes.find((a) => a.name === 'class')?.value ?? '').split(
        /\s+/,
      );
      return part.classes.every((cls) => classes.includes(cls));
    }),
  );
}

/**
 * Is a name from the demo's `@Component.imports` used by this section's template?
 */
function isUsedInTemplate(name, template, elements, importSource) {
  const library = getLibraryIndex();

  if (library.selectors.has(name)) return selectorMatches(library.selectors.get(name), elements);

  if (library.kits.has(name)) {
    const seen = new Set();
    const expand = (kit) =>
      (library.kits.get(kit) ?? []).flatMap((member) => {
        if (seen.has(member)) return [];
        seen.add(member);
        return library.kits.has(member) ? expand(member) : [member];
      });
    return expand(name).some(
      (member) =>
        library.selectors.has(member) && selectorMatches(library.selectors.get(member), elements),
    );
  }

  if (library.pipes.has(name)) return usesPipe(template, library.pipes.get(name));

  if (KNOWN_TEMPLATE_USAGE[name]) return KNOWN_TEMPLATE_USAGE[name](template);

  // Known library export without a selector: a type, service or function — never a template import.
  if (library.exports.has(name)) return false;

  // Icons: HviIconChevronDown -> <hvi-icon-chevron-down
  if (importSource === '@helsevestikt/hviktor-icons' || /^HviIcon/.test(name)) {
    const kebab = toKebab(name.replace(/^HviIcon/, ''));
    return new RegExp(`<hvi-icon-${kebab}[\\s/>]`).test(template);
  }

  // Fallback for anything we have no selector for: <hvi-foo-bar>, hviFooBar or <foo-bar>
  const base = name.replace(/(Component|Directive)$/, '');
  const kebab = toKebab(base);
  const camel = base.charAt(0).toLowerCase() + base.slice(1);
  return elements.some(
    (element) =>
      element.tag === kebab ||
      element.tag === `app-${kebab}` ||
      element.attributes.some((a) => a.name === camel),
  );
}

// ---------------------------------------------------------------------------
// Demo file parsing
// ---------------------------------------------------------------------------

function hasExportModifier(node) {
  return (ts.getModifiers?.(node) ?? node.modifiers ?? []).some(
    (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
  );
}

function declarationNames(statement) {
  if (
    (ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isFunctionDeclaration(statement)) &&
    statement.name
  ) {
    return [statement.name.text];
  }
  if (ts.isVariableStatement(statement)) {
    return statement.declarationList.declarations
      .map((declaration) => declaration.name)
      .filter(ts.isIdentifier)
      .map((identifier) => identifier.text);
  }
  return [];
}

function isExcludedImport(specifier) {
  return (
    /(^|\/)shared(\/|$)/.test(specifier) ||
    specifier.includes('code-examples') ||
    specifier.includes('ExampleSource')
  );
}

/**
 * Parse demo file: imports, top-level declarations, the demo component and its sections.
 */
function parseDemoFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

  const fileName = path.basename(filePath, '.ts');
  const demoName = fileName.replace(/-demo$/, '');

  const imports = [];
  const topLevel = [];
  let componentClass;
  let componentOptions;

  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement)) {
      const clause = statement.importClause;
      const specifier = statement.moduleSpecifier.text;
      if (!clause || isExcludedImport(specifier)) continue;

      const declaration = {
        specifier,
        typeOnly: clause.isTypeOnly,
        defaultName: clause.name?.text,
        namespaceName: undefined,
        named: [],
      };

      if (clause.namedBindings && ts.isNamespaceImport(clause.namedBindings)) {
        declaration.namespaceName = clause.namedBindings.name.text;
      } else if (clause.namedBindings) {
        for (const element of clause.namedBindings.elements) {
          if (/Example(Source|Code)$/.test(element.name.text)) continue;
          declaration.named.push({
            name: element.name.text,
            propertyName: element.propertyName?.text,
            typeOnly: element.isTypeOnly,
          });
        }
      }

      imports.push(declaration);
      continue;
    }

    if (ts.isClassDeclaration(statement) && !componentClass) {
      const decorator = findDecorator(statement, ['Component']);
      if (decorator && findProperty(decorator.options, 'template')) {
        componentClass = statement;
        componentOptions = decorator.options;
        continue;
      }
    }

    const names = declarationNames(statement);
    if (names.length > 0) {
      topLevel.push({
        names,
        exported: hasExportModifier(statement),
        node: statement,
        text: content.slice(statement.getStart(sourceFile, true), statement.end),
      });
    }
  }

  if (!componentClass) {
    return { demoName, sections: [] };
  }

  // Raw template text, escapes kept as they are in the source
  const templateNode = findProperty(componentOptions, 'template').initializer;
  const template = content.slice(templateNode.getStart(sourceFile) + 1, templateNode.end - 1);

  // Names listed in @Component.imports, in their original order
  const importsNode = findProperty(componentOptions, 'imports')?.initializer;
  const componentImports =
    importsNode && ts.isArrayLiteralExpression(importsNode)
      ? importsNode.elements
          .map((element) => (ts.isSpreadElement(element) ? element.expression : element))
          .filter(ts.isIdentifier)
          .map((identifier) => identifier.text)
          .filter((name) => !DEMO_WRAPPERS.includes(name))
      : [];

  const implementsNames = (componentClass.heritageClauses ?? [])
    .filter((clause) => clause.token === ts.SyntaxKind.ImplementsKeyword)
    .flatMap((clause) => clause.types.map((type) => type.expression.getText(sourceFile)));

  return {
    filePath,
    demoName,
    content,
    sourceFile,
    imports,
    topLevel,
    componentClass,
    componentImports,
    implementsNames,
    sections: extractSections(template),
  };
}

// ---------------------------------------------------------------------------
// Dependency analysis
// ---------------------------------------------------------------------------

/**
 * Collect `this.x` member references and free identifiers in a node.
 */
function collectReferences(node) {
  const members = new Set();
  const free = new Set();

  const visit = (current) => {
    if (
      ts.isPropertyAccessExpression(current) &&
      current.expression.kind === ts.SyntaxKind.ThisKeyword
    ) {
      members.add(current.name.text);
    } else if (
      ts.isElementAccessExpression(current) &&
      current.expression.kind === ts.SyntaxKind.ThisKeyword &&
      ts.isStringLiteral(current.argumentExpression)
    ) {
      members.add(current.argumentExpression.text);
    } else if (ts.isIdentifier(current) && isFreeIdentifier(current)) {
      free.add(current.text);
    }
    ts.forEachChild(current, visit);
  };

  visit(node);
  return { members, free };
}

function isFreeIdentifier(identifier) {
  const parent = identifier.parent;
  if (!parent) return true;
  if (ts.isPropertyAccessExpression(parent) && parent.name === identifier) return false;
  if (ts.isQualifiedName(parent) && parent.right === identifier) return false;
  if (ts.isBindingElement(parent) && parent.propertyName === identifier) return false;
  if (
    (ts.isPropertyAssignment(parent) ||
      ts.isPropertyDeclaration(parent) ||
      ts.isMethodDeclaration(parent) ||
      ts.isPropertySignature(parent) ||
      ts.isMethodSignature(parent) ||
      ts.isGetAccessorDeclaration(parent) ||
      ts.isSetAccessorDeclaration(parent) ||
      ts.isEnumMember(parent) ||
      ts.isParameter(parent)) &&
    parent.name === identifier
  ) {
    return false;
  }
  return true;
}

function memberName(member) {
  if (ts.isConstructorDeclaration(member)) return 'constructor';
  return member.name ? propertyNameText(member.name) : undefined;
}

function isParameterProperty(parameter) {
  return (ts.getModifiers?.(parameter) ?? parameter.modifiers ?? []).some((modifier) =>
    [
      ts.SyntaxKind.PublicKeyword,
      ts.SyntaxKind.PrivateKeyword,
      ts.SyntaxKind.ProtectedKeyword,
      ts.SyntaxKind.ReadonlyKeyword,
    ].includes(modifier.kind),
  );
}

/**
 * Work out which class members, statements, top-level declarations and imports
 * one section needs, and build its class body.
 */
function analyzeSection(demo, section) {
  const { sourceFile, componentClass, content } = demo;

  const membersByName = new Map();
  const flowMembers = []; // constructor + lifecycle hooks: filtered per statement
  const parameterProperties = new Map(); // name -> parameter

  for (const member of componentClass.members) {
    const name = memberName(member);
    if (!name) continue;

    const text = content.slice(member.getStart(sourceFile), member.end);
    if (/Example(Source|Code)\b/.test(text)) continue;

    if (ts.isConstructorDeclaration(member)) {
      for (const parameter of member.parameters) {
        if (isParameterProperty(parameter) && ts.isIdentifier(parameter.name)) {
          parameterProperties.set(parameter.name.text, parameter);
        }
      }
    }

    if (
      (ts.isConstructorDeclaration(member) || LIFECYCLE_HOOKS[name]) &&
      member.body &&
      ts.isBlock(member.body)
    ) {
      flowMembers.push(member);
      continue;
    }

    if (!membersByName.has(name)) membersByName.set(name, []);
    membersByName.get(name).push(member);
  }

  const included = new Set();
  const free = new Set();
  const keptStatements = new Map(flowMembers.map((member) => [member, new Set()]));
  const queue = [...findTemplateIdentifiers(section.content)];

  const addReferences = (references) => {
    references.free.forEach((name) => free.add(name));
    references.members.forEach((name) => queue.push(name));
  };

  let changed = true;
  while (changed) {
    changed = false;

    while (queue.length > 0) {
      const name = queue.shift();
      if (included.has(name)) continue;
      if (!membersByName.has(name) && !parameterProperties.has(name)) continue;

      included.add(name);
      changed = true;
      for (const member of membersByName.get(name) ?? []) addReferences(collectReferences(member));
      if (parameterProperties.has(name)) {
        addReferences(collectReferences(parameterProperties.get(name)));
      }
    }

    for (const member of flowMembers) {
      const kept = keptStatements.get(member);
      for (const statement of member.body.statements) {
        if (kept.has(statement)) continue;
        const references = collectReferences(statement);
        if ([...references.members].some((name) => included.has(name))) {
          kept.add(statement);
          addReferences(references);
          changed = true;
        }
      }
    }
  }

  // Build the class body in original member order
  const pieces = [];
  const keptHooks = new Set();
  // A dropped member that started a new group (blank line before it) passes the
  // blank line on to the next kept member, so the grouping survives.
  let pendingBlankLine = false;
  const startsWithBlankLine = (text) => /^[ \t]*\n[ \t]*\n/.test(text);
  const push = (text) => {
    pieces.push(pendingBlankLine && !startsWithBlankLine(text) ? `\n${text}` : text);
    pendingBlankLine = false;
  };

  for (const member of componentClass.members) {
    const name = memberName(member);
    if (!name) continue;

    let text = '';
    if (keptStatements.has(member)) {
      text = buildFlowMember(demo, member, keptStatements.get(member), included);
      if (text && LIFECYCLE_HOOKS[name]) keptHooks.add(name);
    } else if (included.has(name) && membersByName.get(name)?.includes(member)) {
      text = content.slice(member.pos, member.end);
    }

    if (text) {
      push(text);
    } else if (startsWithBlankLine(content.slice(member.pos, member.end))) {
      pendingBlankLine = true;
    }
  }

  // Constructor parameters (e.g. `private http: HttpClient`) count as references too
  for (const member of flowMembers) {
    if (!ts.isConstructorDeclaration(member)) continue;
    for (const parameter of member.parameters) {
      if (!ts.isIdentifier(parameter.name)) continue;
      const name = parameter.name.text;
      const usedInBody = [...keptStatements.get(member)].some((statement) =>
        collectReferences(statement).free.has(name),
      );
      if (included.has(name) || usedInBody) {
        collectReferences(parameter).free.forEach((ref) => free.add(ref));
      }
    }
  }

  const classBody = pieces
    .join('')
    .replace(/^\s*\n/, '')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd();

  const implementsNames = demo.implementsNames.filter((interfaceName) =>
    [...keptHooks].some((hook) => LIFECYCLE_HOOKS[hook] === interfaceName),
  );

  return { classBody, free, implementsNames };
}

/**
 * Rebuild a constructor or lifecycle hook with only the statements we keep.
 */
function buildFlowMember(demo, member, kept, included) {
  const { content, sourceFile } = demo;
  const statements = member.body.statements;

  let parameters = member.parameters;
  if (ts.isConstructorDeclaration(member)) {
    parameters = member.parameters.filter((parameter) => {
      if (!ts.isIdentifier(parameter.name)) return true;
      const name = parameter.name.text;
      if (isParameterProperty(parameter)) return included.has(name);
      return [...kept].some((statement) => collectReferences(statement).free.has(name));
    });
  }

  if (kept.size === 0 && parameters.length === 0) return '';
  if (kept.size === statements.length && parameters.length === member.parameters.length) {
    return content.slice(member.pos, member.end);
  }

  const leading = content.slice(member.pos, member.getStart(sourceFile));
  const indent = ' '.repeat(
    sourceFile.getLineAndCharacterOfPosition(member.getStart(sourceFile)).character,
  );

  let header;
  if (parameters.length === member.parameters.length) {
    header = content.slice(member.getStart(sourceFile), member.body.getStart(sourceFile) + 1);
  } else {
    const parameterText = parameters.map((p) => p.getText(sourceFile)).join(', ');
    header = `constructor(${parameterText}) {`;
  }

  const body = statements
    .filter((statement) => kept.has(statement))
    .map((statement) => content.slice(statement.pos, statement.end))
    .join('');

  return `${leading}${header}${body}\n${indent}}`;
}

/**
 * Resolve free identifiers to imports and top-level declarations.
 */
function resolveDependencies(demo, free, componentImportNames, componentDir) {
  const names = new Set([...free, ...componentImportNames, 'Component']);

  // Top-level declarations in the demo file: import exported ones, inline the rest
  const inlined = new Set();
  const fromDemo = new Set();
  const pending = [...names];

  while (pending.length > 0) {
    const name = pending.shift();
    const declaration = demo.topLevel.find((d) => d.names.includes(name));
    if (!declaration) continue;

    if (declaration.exported) {
      fromDemo.add(name);
    } else if (!inlined.has(declaration)) {
      inlined.add(declaration);
      for (const ref of collectReferences(declaration.node).free) {
        if (!names.has(ref)) {
          names.add(ref);
          pending.push(ref);
        }
      }
    }
  }

  // Imports from the demo file, filtered to what is used
  const modules = new Map();
  const moduleFor = (specifier) => {
    if (!modules.has(specifier)) {
      modules.set(specifier, { defaultName: undefined, namespaceName: undefined, named: [] });
    }
    return modules.get(specifier);
  };

  for (const declaration of demo.imports) {
    let specifier = declaration.specifier;
    if (specifier.startsWith('.')) {
      const absolute = path.resolve(path.dirname(demo.filePath), specifier);
      specifier = toPosix(path.relative(componentDir, absolute));
      if (!specifier.startsWith('.')) specifier = `./${specifier}`;
    }

    if (declaration.defaultName && names.has(declaration.defaultName)) {
      moduleFor(specifier).defaultName = declaration.defaultName;
    }
    if (declaration.namespaceName && names.has(declaration.namespaceName)) {
      moduleFor(specifier).namespaceName = declaration.namespaceName;
    }
    for (const element of declaration.named) {
      if (names.has(element.name)) {
        moduleFor(specifier).named.push({
          ...element,
          typeOnly: element.typeOnly || declaration.typeOnly,
        });
      }
    }
  }

  if (fromDemo.size > 0) {
    let specifier = toPosix(path.relative(componentDir, demo.filePath)).replace(/\.ts$/, '');
    if (!specifier.startsWith('.')) specifier = `./${specifier}`;
    const module = moduleFor(specifier);
    for (const name of fromDemo) module.named.push({ name, typeOnly: false });
  }

  // Component is always needed, even if the demo file somehow lacks the import
  const core = moduleFor('@angular/core');
  if (!core.named.some((element) => element.name === 'Component')) {
    core.named.push({ name: 'Component', typeOnly: false });
  }

  const importLines = [...modules.entries()]
    .filter(([, m]) => m.defaultName || m.namespaceName || m.named.length > 0)
    .sort(([a], [b]) => {
      const relativeA = a.startsWith('.');
      const relativeB = b.startsWith('.');
      if (relativeA !== relativeB) return relativeA ? 1 : -1;
      return compareOrdinal(a, b);
    })
    .map(([specifier, m]) => {
      const parts = [];
      if (m.defaultName) parts.push(m.defaultName);
      if (m.namespaceName) parts.push(`* as ${m.namespaceName}`);
      if (m.named.length > 0) {
        const named = m.named
          .filter((e, i, all) => all.findIndex((other) => other.name === e.name) === i)
          .sort((a, b) => compareOrdinal(a.name, b.name))
          .map(
            (e) =>
              `${e.typeOnly ? 'type ' : ''}${e.propertyName ? `${e.propertyName} as ` : ''}${e.name}`,
          );
        parts.push(`{ ${named.join(', ')} }`);
      }
      return `import ${parts.join(', ')} from ${quote(specifier)};`;
    });

  const inlineDeclarations = demo.topLevel
    .filter((declaration) => inlined.has(declaration))
    .map((declaration) => declaration.text);

  return { importLines, inlineDeclarations };
}

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

function sourceExportName(example) {
  return example.className.replace(/Component$/, 'Source');
}

/**
 * Generate example component code
 */
function generateExampleComponent(demo, section) {
  const pascalDemoName = toPascal(demo.demoName);
  const pascalSectionName = toPascal(section.slug);
  const className = `${pascalDemoName}${pascalSectionName}ExampleComponent`;
  const selector = `app-${demo.demoName}-${section.slug}-example`;
  const componentDir = getGeneratedDir(demo.demoName);

  const elements = findStartTags(section.content);
  const importSources = new Map(
    demo.imports.flatMap((declaration) =>
      declaration.named.map((element) => [element.name, declaration.specifier]),
    ),
  );
  const componentImports = demo.componentImports
    .filter((name) => isUsedInTemplate(name, section.content, elements, importSources.get(name)))
    .sort(compareOrdinal);

  const { classBody, free, implementsNames } = analyzeSection(demo, section);
  implementsNames.forEach((name) => free.add(name));

  const { importLines, inlineDeclarations } = resolveDependencies(
    demo,
    free,
    componentImports,
    componentDir,
  );

  const template = section.content
    .split('\n')
    .map((line) => (line.length > 0 ? `    ${line}` : ''))
    .join('\n');

  const implementsClause = implementsNames.length ? ` implements ${implementsNames.join(', ')}` : '';
  const classBlock = classBody
    ? `export class ${className}${implementsClause} {\n${classBody}\n}`
    : `export class ${className}${implementsClause} {}`;

  const code = [
    importLines.join('\n'),
    ...inlineDeclarations,
    `@Component({
  selector: '${selector}',
  standalone: true,${componentImports.length ? `\n  imports: [${componentImports.join(', ')}],` : ''}
  template: \`
${template}
  \`,
})
${classBlock}`,
  ].join('\n\n');

  return {
    fileName: `${demo.demoName}.${section.slug}.example.ts`,
    className,
    code: code.trim() + '\n',
    slug: section.slug,
    title: section.title,
  };
}

/**
 * Generate source string file for raw import
 */
function generateSourceFile(example) {
  const escapedCode = example.code
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');

  return `// Auto-generated - do not edit manually
export const ${sourceExportName(example)} = \`${escapedCode}\`;
`;
}

/**
 * Generate index file for a component's examples
 */
function generateIndexFile(examples) {
  const modules = examples
    .flatMap((example) => {
      const base = example.fileName.replace(/\.ts$/, '');
      return [`./${base}`, `./${base}.source`];
    })
    .sort(compareOrdinal);

  return `// Auto-generated - do not edit manually
${modules.map((module) => `export * from ${quote(module)};`).join('\n')}
`;
}

/**
 * Generate manifest file with metadata for all examples
 */
function generateManifestFile(demoName, examples) {
  const entries = examples.map(
    (example) => `  {
    slug: ${quote(example.slug)},
    title: ${quote(example.title)},
    className: ${quote(example.className)},
    sourceExport: ${quote(sourceExportName(example))},
  },`,
  );

  const typeName = `${toPascal(demoName)}ExampleSlug`;
  const slugs = examples.map((example) => quote(example.slug));
  const oneLine = `export type ${typeName} = ${slugs.join(' | ')};`;
  const slugType =
    oneLine.length <= 100
      ? oneLine
      : `export type ${typeName} =\n${slugs.map((slug) => `  | ${slug}`).join('\n')};`;

  return `// Auto-generated - do not edit manually
export const ${toPascal(demoName)}ExamplesManifest = [
${entries.join('\n')}
] as const;

${slugType}
`;
}

// ---------------------------------------------------------------------------
// Formatting and writing
// ---------------------------------------------------------------------------

let prettier;
let prettierFailed = false;

async function format(code, filePath) {
  if (!FORMAT || prettierFailed) return code;
  try {
    prettier ??= require('prettier');
    const config = (await prettier.resolveConfig(filePath)) ?? {};
    return await prettier.format(code, { ...config, filepath: filePath });
  } catch (error) {
    prettierFailed = true;
    console.warn(`  Prettier failed, writing unformatted output: ${error.message}`);
    return code;
  }
}

const changedFiles = [];

function writeIfChanged(filePath, content) {
  const existing = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : undefined;
  if (existing === content) return false;

  const relative = toPosix(path.relative(ROOT, filePath));
  changedFiles.push(relative);
  if (CHECK) {
    console.log(`  Would update: ${relative}`);
  } else {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated: ${relative}`);
  }
  return true;
}

/**
 * Process a single demo file
 */
async function processDemoFile(filePath) {
  console.log(`Processing: ${toPosix(path.relative(ROOT, filePath))}`);

  const demo = parseDemoFile(filePath);

  if (demo.sections.length === 0) {
    console.log(`  No sections found`);
    return null;
  }

  const componentDir = getGeneratedDir(demo.demoName);
  const examples = [];
  const seenSlugs = new Set();

  for (const section of demo.sections) {
    if (seenSlugs.has(section.slug)) {
      console.warn(`  Warning: duplicate section title "${section.title}" — later one overwrites`);
    }
    seenSlugs.add(section.slug);

    const example = generateExampleComponent(demo, section);
    const examplePath = path.join(componentDir, example.fileName);
    example.code = await format(example.code, examplePath);
    examples.push(example);

    writeIfChanged(examplePath, example.code);
    writeIfChanged(examplePath.replace(/\.ts$/, '.source.ts'), generateSourceFile(example));
  }

  const indexPath = path.join(componentDir, 'index.ts');
  writeIfChanged(indexPath, await format(generateIndexFile(examples), indexPath));

  const manifestPath = path.join(componentDir, 'manifest.ts');
  writeIfChanged(
    manifestPath,
    await format(generateManifestFile(demo.demoName, examples), manifestPath),
  );

  // Warn about example files no section produces anymore
  const expected = new Set(
    examples.flatMap((e) => [e.fileName, e.fileName.replace(/\.ts$/, '.source.ts')]),
  );
  const stale = fs.existsSync(componentDir)
    ? fs
        .readdirSync(componentDir)
        .filter((file) => /\.example(\.source)?\.ts$/.test(file) && !expected.has(file))
    : [];
  if (stale.length > 0) {
    console.warn(`  Stale example files (no matching section, delete them): ${stale.join(', ')}`);
  }

  await updateDemoFile(filePath, demo, examples);

  return { demoName: demo.demoName, examples };
}

function findComponentClass(sourceFile) {
  return sourceFile.statements.find(
    (statement) => ts.isClassDeclaration(statement) && findDecorator(statement, ['Component']),
  );
}

/**
 * Make sure every section in the demo file shows its own generated example:
 *  - a [code] binding on the section,
 *  - a class property with that name pointing at the right source
 *    (a property pointing at another example's source, e.g. after renaming a section, is fixed),
 *  - an import of the source (imports through ./code-examples/index count too).
 * Imports of example sources that nothing uses anymore are removed.
 */
async function updateDemoFile(filePath, demo, examples) {
  let content = demo.content;
  const parse = () => ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
  const sectionTags = findStartTags(content, 'app-demo-section');

  if (sectionTags.length !== examples.length) {
    console.warn(`  Warning: could not match sections in demo file, skipping demo file update`);
    return;
  }

  const existingProperties = new Map(); // property name -> initializer text
  for (const member of demo.componentClass.members) {
    if (ts.isPropertyDeclaration(member) && member.name && member.initializer) {
      existingProperties.set(
        propertyNameText(member.name),
        member.initializer.getText(demo.sourceFile),
      );
    }
  }

  // 1) [code] bindings — edit from the end so earlier offsets stay valid
  const properties = new Map(); // property name -> source export it must point at
  for (let i = sectionTags.length - 1; i >= 0; i--) {
    const tag = sectionTags[i];
    const source = sourceExportName(examples[i]);
    const codeAttribute = tag.attributes.find((a) => a.rawName === '[code]');

    if (codeAttribute) {
      properties.set(codeAttribute.value, source);
      continue;
    }

    const existing = [...existingProperties.entries()].find(([, value]) => value === source);
    const propertyName = existing?.[0] ?? `${toCamelCase(examples[i].slug)}Code`;
    properties.set(propertyName, source);

    const titleAttribute = tag.attributes.find((a) => a.rawName === 'title');
    const insertAt = titleAttribute ? titleAttribute.end : tag.start + '<app-demo-section'.length;
    content = `${content.slice(0, insertAt)} [code]="${propertyName}"${content.slice(insertAt)}`;
  }

  // 2) Properties: fix the ones pointing at another example's source, add missing ones
  let componentClass = findComponentClass(parse());
  let sourceFile = componentClass.getSourceFile();
  const edits = [];
  const missing = [];

  for (const [name, source] of properties) {
    const member = componentClass.members.find(
      (m) => ts.isPropertyDeclaration(m) && m.name && propertyNameText(m.name) === name,
    );
    if (!member) {
      missing.push({ name, source });
    } else if (
      member.initializer &&
      ts.isIdentifier(member.initializer) &&
      /ExampleSource$/.test(member.initializer.text) &&
      member.initializer.text !== source
    ) {
      console.log(`  Fixed: ${name} pointed at ${member.initializer.text}, now ${source}`);
      edits.push({
        start: member.initializer.getStart(sourceFile),
        end: member.initializer.end,
        text: source,
      });
    }
  }

  if (missing.length > 0) {
    const lastCodeProperty = [...componentClass.members]
      .reverse()
      .find(
        (member) =>
          ts.isPropertyDeclaration(member) &&
          /Example(Source|Code)\b/.test(member.initializer?.getText(sourceFile) ?? ''),
      );
    const insertAt = lastCodeProperty ? lastCodeProperty.end : componentClass.members.pos;
    const block = missing.map((p) => `\n  readonly ${p.name} = ${p.source};`).join('');
    edits.push({ start: insertAt, end: insertAt, text: lastCodeProperty ? block : `${block}\n` });
  }

  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    content = `${content.slice(0, edit.start)}${edit.text}${content.slice(edit.end)}`;
  }

  // 3) Imports: drop example sources nothing uses anymore, add the missing ones
  sourceFile = parse();
  const usedIdentifiers = new Set();
  const collectUsed = (node) => {
    if (ts.isImportDeclaration(node)) return;
    if (ts.isIdentifier(node)) usedIdentifiers.add(node.text);
    ts.forEachChild(node, collectUsed);
  };
  ts.forEachChild(sourceFile, collectUsed);

  const importedNames = new Set();
  const importEdits = [];
  let lastImportEnd = 0;

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    lastImportEnd = statement.end;

    const bindings = statement.importClause?.namedBindings;
    if (!bindings || !ts.isNamedImports(bindings)) continue;

    const specifier = statement.moduleSpecifier.text;
    const elements = bindings.elements;
    const kept = elements.filter(
      (element) =>
        !specifier.includes('code-examples') ||
        !/ExampleSource$/.test(element.name.text) ||
        usedIdentifiers.has(element.name.text),
    );
    kept.forEach((element) => importedNames.add(element.name.text));

    if (kept.length === elements.length) continue;
    if (kept.length === 0 && !statement.importClause.name) {
      importEdits.push({ start: statement.pos, end: statement.end, text: '' });
    } else {
      importEdits.push({
        start: bindings.getStart(sourceFile),
        end: bindings.end,
        text: `{ ${kept.map((element) => element.getText(sourceFile)).join(', ')} }`,
      });
    }
  }

  const newImports = examples
    .map(sourceExportName)
    .filter((source, index, all) => all.indexOf(source) === index)
    .filter((source) => !importedNames.has(source))
    .map((source) => {
      const example = examples.find((e) => sourceExportName(e) === source);
      return `\nimport { ${source} } from './code-examples/${example.fileName.replace(/\.ts$/, '.source')}';`;
    });
  if (newImports.length > 0) {
    importEdits.push({ start: lastImportEnd, end: lastImportEnd, text: newImports.join('') });
  }

  for (const edit of importEdits.sort((a, b) => b.start - a.start)) {
    content = `${content.slice(0, edit.start)}${edit.text}${content.slice(edit.end)}`;
  }

  if (content !== demo.content) content = await format(content, filePath);
  writeIfChanged(filePath, content);
}

/**
 * Find all demo files
 */
function findAllDemoFiles() {
  const demoFiles = [];

  function walkDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.name.endsWith('-demo.ts')) {
        demoFiles.push(fullPath);
      }
    }
  }

  walkDir(DEMO_DIR);
  return demoFiles;
}

/**
 * Main entry point
 */
async function main() {
  let filesToProcess = [];

  if (positional.length === 0) {
    filesToProcess = findAllDemoFiles();
  } else {
    const target = positional[0];

    if (fs.existsSync(target)) {
      filesToProcess = [path.resolve(target)];
    } else {
      const demoPath = path.join(DEMO_DIR, target, `${target}-demo.ts`);
      if (fs.existsSync(demoPath)) {
        filesToProcess = [demoPath];
      } else {
        console.error(`Demo file not found: ${demoPath}`);
        process.exit(1);
      }
    }
  }

  if (filesToProcess.length === 0) {
    console.log('No demo files found to process.');
    return;
  }

  console.log(`Found ${filesToProcess.length} demo file(s) to process.\n`);

  const results = [];
  for (const file of filesToProcess) {
    const result = await processDemoFile(file);
    if (result) results.push(result);
  }

  const verb = CHECK ? 'would change' : 'changed';
  console.log(
    `\nProcessed ${results.length} demo(s), ${changedFiles.length} file(s) ${verb}.`,
  );

  if (CHECK && changedFiles.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
