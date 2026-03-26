# Converting to Web Components

This guide explains how to convert the Angular icon components to pure Web Components.

## Quick Start

Run the conversion script:

```bash
cd projects/icons
npm run convert
```

This will:

1. Read all existing Angular icon components
2. Convert them to Web Component classes
3. Generate TypeScript declarations for IntelliSense
4. Create the main entry point that registers all components

## What Gets Generated

### 1. Web Component Classes (`src/lib/webcomponents/`)

Each icon gets converted to a pure Web Component:

```typescript
export class HviIconAirplaneWebComponent extends HviIconBase {
  protected get path(): string {
    return 'M6.38832...'; // SVG path data
  }
}

customElements.define('hvi-icon-airplane', HviIconAirplaneWebComponent);
```

### 2. TypeScript Declarations (`src/lib/icons.d.ts`)

Provides IntelliSense for all frameworks:

```typescript
interface HTMLElementTagNameMap {
  'hvi-icon-airplane': HviIconAirplaneWebComponent;
  // ... all other icons
}
```

### 3. Main Entry Point (`src/index.ts`)

Imports and registers all components:

```typescript
import './lib/webcomponents/icon-Airplane.webcomponent';
// ... all other imports

export * from './lib/icons.d';
export { HviIconBase } from './lib/base-icon.webcomponent';
```

## Usage in Angular

### 1. Install the package

```bash
npm install @helsevestikt/hviktor-icons
```

### 2. Import in your app

```typescript
// app.config.ts or main.ts
import '@helsevestikt/hviktor-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... your providers
  ],
};
```

### 3. Add CUSTOM_ELEMENTS_SCHEMA

```typescript
// For standalone components in app.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
```

### 4. Use in templates with full IntelliSense

```html
<hvi-icon-airplane size="lg"></hvi-icon-airplane>
<hvi-icon-search size="md"></hvi-icon-search>
<hvi-icon-close size="sm"></hvi-icon-close>
```

## Usage in Other Frameworks

### React

```jsx
import '@helsevestikt/hviktor-icons';

function MyComponent() {
  return <hvi-icon-airplane size="lg"></hvi-icon-airplane>;
}
```

### Vue

```vue
<template>
  <hvi-icon-airplane size="lg"></hvi-icon-airplane>
</template>

<script>
import '@helsevestikt/hviktor-icons';
</script>
```

### Blazor

```html
<!-- In _Host.cshtml, _Layout.cshtml, or index.html -->
<script type="module">
  import '@helsevestikt/hviktor-icons';
</script>

<!-- Or using a CDN -->
<script type="module" src="https://unpkg.com/@helsevestikt/hviktor-icons"></script>

<!-- Then in your Razor components -->
<hvi-icon-airplane size="lg"></hvi-icon-airplane>
```

### Vanilla JavaScript

```html
<script type="module">
  import '@helsevestikt/hviktor-icons';
</script>

<hvi-icon-airplane size="lg"></hvi-icon-airplane>
```

## Benefits

✅ **No framework dependency** - Works everywhere
✅ **Smaller bundle size** - No Angular runtime needed
✅ **Full IntelliSense** - TypeScript declarations provide autocomplete
✅ **Type safety** - Catch errors at compile time
✅ **Better performance** - Native Web Components are fast
✅ **Future-proof** - Standard web platform APIs

## Advanced: Custom Icons

You can extend the base class to create custom icons:

```typescript
import { HviIconBase } from '@helsevestikt/hviktor-icons';

class MyCustomIcon extends HviIconBase {
  protected get path(): string {
    return 'M12 2L2 7v10l10 5 10-5V7L12 2z';
  }
}

customElements.define('my-custom-icon', MyCustomIcon);
```

## Building for Production

Build the library:

```bash
npm run build
```

Publish to npm:

```bash
cd dist/@helsevestikt/hviktor-icons
npm publish
```
