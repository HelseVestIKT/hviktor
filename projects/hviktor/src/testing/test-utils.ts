import { provideZonelessChangeDetection, Type } from '@angular/core';

/**
 * Configures TestBed for zoneless component testing.
 * Call in `beforeEach` before creating component fixtures.
 */
export async function setupTestBed(config: {
  imports: Type<unknown>[];
  declarations?: Type<unknown>[];
}) {
  const { TestBed } = await import('@angular/core/testing');
  await TestBed.configureTestingModule({
    imports: config.imports,
    declarations: config.declarations,
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
}
