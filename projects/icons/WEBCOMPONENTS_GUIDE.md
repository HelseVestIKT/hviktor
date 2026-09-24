# Icons Guide

This file is kept for backward compatibility with old links.

The icons package now exposes standalone Angular icon components.

## Recommended usage

Import specific icons from the package root:

```ts
import { Component } from '@angular/core';
import { HviIconAirplane, HviIconPerson } from '@helsevestikt/hviktor-icons';

@Component({
  standalone: true,
  imports: [HviIconAirplane, HviIconPerson],
  template: `
    <hvi-icon-airplane size="lg"></hvi-icon-airplane>
    <hvi-icon-person size="md"></hvi-icon-person>
  `,
})
export class AppComponent {}
```

## Optional: all-icons convenience entrypoint

For demo/playground usage and fast IntelliSense, import all icons at once:

```ts
import { Component } from '@angular/core';
import { HVI_ALL_ICONS } from '@helsevestikt/hviktor-icons/all-icons';

@Component({
  standalone: true,
  imports: [...HVI_ALL_ICONS],
  template: `<hvi-icon-person />`,
})
export class AppComponent {}
```

For production apps where bundle size matters, prefer per-icon imports.

## Sizes

Supported `size` values:

- `sm` (16px)
- `md` (24px, default)
- `lg` (32px)
