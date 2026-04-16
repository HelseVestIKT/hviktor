# Component Conventions

Reference for how hviktor-angular components/directives are structured.

## Directive vs Component

- **Directive**: Augments a native HTML element (`button`, `input`, `dialog`, `label`). Selector: `element[hviName]`
- **Component**: Needs a template (even if just `<ng-content />`). Selector: `hvi-name`

## Class and Selector Naming

- Class prefix: `Hvi` (e.g. `HviButton`, `HviAlert`)
- Component selector: `hvi-foo`
- Directive selector: `button[hviButton]`, `input[hviInput]`, `label[hviChip]`

## Host Metadata

All styling is applied through the `host` metadata block — never `@HostBinding`/`@HostListener`:

```typescript
@Directive({
  selector: 'button[hviButton]',
  standalone: true,
  host: {
    class: 'ds-button',
    '[attr.data-size]': 'size',
    '[attr.data-variant]': 'variant',
    '[attr.data-color]': 'color',
    '[attr.data-fullwidth]': 'fullWidth ? "" : null',
    '[attr.data-icon]': 'icon ? "" : null',
    '[attr.aria-busy]': 'loading ? "true" : null',
    '[type]': 'type',
  },
})
```

Patterns:

- `class: 'ds-*'` — always-on CSS class
- `'[attr.data-*]': 'inputProp'` — string inputs bound to data attributes
- `'[attr.data-*]': 'boolProp ? "" : null'` — boolean inputs: empty string when true, removed when null
- `'[attr.aria-*]': 'prop ? "true" : null'` — ARIA boolean attributes
- `style: 'display: block'` — inline host styles when needed

## Inputs

Use `@Input()` decorators with transforms:

```typescript
@Input() variant: 'primary' | 'secondary' | 'tertiary';
@Input() size: 'sm' | 'md' | 'lg';
@Input() color: 'accent' | 'brand1' | 'brand2' | 'brand3' | 'neutral' | 'danger';
@Input({ transform: booleanAttribute }) loading = false;
@Input({ transform: booleanAttribute }) fullWidth = false;
@Input({ transform: numberAttribute }) max: number;
```

## Dependency Injection

Use `inject()` — never constructor parameters:

```typescript
private destroyRef = inject(DestroyRef);
private http = inject(HttpClient);
```

## Templates

- Use `<ng-content />` for content projection
- Use `@if`, `@for`, `@switch` — never `*ngIf`, `*ngFor`
- Do NOT import `CommonModule`

## File Structure

```
projects/hviktor/src/<component>/
  <component>.component.ts       # or .directive.ts
  <component>.component.spec.ts  # unit tests
  index.ts                       # named exports only
```
