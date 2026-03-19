import { provideZonelessChangeDetection, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

/**
 * Configures TestBed for zoneless component testing.
 * Call in `beforeEach` before creating component fixtures.
 */
export async function setupTestBed(config: {
  imports: Type<unknown>[];
  declarations?: Type<unknown>[];
}) {
  await TestBed.configureTestingModule({
    imports: config.imports,
    declarations: config.declarations,
    providers: [provideZonelessChangeDetection()],
  }).compileComponents();
}
