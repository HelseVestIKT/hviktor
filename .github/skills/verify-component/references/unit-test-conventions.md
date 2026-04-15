# Unit Test Conventions

## Setup

Use `setupTestBed()` from `../testing/test-utils`. It configures TestBed with `provideZonelessChangeDetection()`.

```typescript
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
```

## Critical: Zoneless Change Detection

This app uses **zoneless** change detection. Direct mutation of `@Input` properties after initial `detectChanges()` causes `ExpressionChangedAfterItHasBeenCheckedError`.

### Pattern: Dedicated Host Components

Create a **separate host component per variant/configuration**. Set input values in the template, not programmatically:

```typescript
// ✅ Correct — value set in template before first CD
@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton variant="primary">Click</button>',
})
class PrimaryHost {}

// ✅ Correct — binding with host property set BEFORE first detectChanges()
@Component({
  standalone: true,
  imports: [HviButton],
  template: '<button hviButton [variant]="variant">Btn</button>',
})
class VariantHost {
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';
}

// Then in test:
const f = TestBed.createComponent(VariantHost);
f.componentInstance.variant = 'secondary'; // set BEFORE first detectChanges
f.detectChanges();
```

```typescript
// ❌ WRONG — mutating after initial CD
fixture.detectChanges();
fixture.componentInstance.removable = false; // ExpressionChangedAfterItHasBeenCheckedError!
fixture.detectChanges();
```

### Pattern: Components (not directives)

For components that can be created directly:

```typescript
beforeEach(async () => {
  await setupTestBed({ imports: [HviAlert] });
  fixture = TestBed.createComponent(HviAlert);
  element = fixture.nativeElement;
  fixture.detectChanges();
});
```

Use `fixture.componentRef.setInput('name', value)` to change inputs safely:

```typescript
fixture.componentRef.setInput('color', 'danger');
fixture.detectChanges();
```

## What to Test

| Test Case                      | What to Assert                                       |
| ------------------------------ | ---------------------------------------------------- |
| Host class                     | `element.classList.contains('ds-component')`         |
| Default attributes             | `getAttribute('data-*')` is `null` when no input set |
| Each input → attribute         | Set input → verify `data-*` attribute value          |
| Boolean inputs (true)          | `getAttribute('data-flag')` is `''` (empty string)   |
| Boolean inputs (false/default) | `getAttribute('data-flag')` is `null`                |
| ARIA attributes                | `getAttribute('aria-busy')` is `'true'` or `null`    |
| Content projection             | Host with child content → `textContent`              |
| Role (if set)                  | `getAttribute('role')`                               |
| Combined attributes            | All inputs set together → all attributes correct     |

## Naming

- One `describe()` block per concern (e.g. `HviButton variant`, `HviButton size`)
- `it()` descriptions: `should set data-variant to primary`, `should not set data-size by default`

## Running

```bash
npm test
```
