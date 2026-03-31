// projects/hviktor/src/testing/test-utils.ts
import { provideZonelessChangeDetection } from "@angular/core";
import { TestBed } from "@angular/core/testing";
async function setupTestBed(config) {
  await TestBed.configureTestingModule({
    imports: config.imports,
    declarations: config.declarations,
    providers: [provideZonelessChangeDetection()]
  }).compileComponents();
}

export {
  setupTestBed
};
//# sourceMappingURL=chunk-PQZSX3Z2.js.map
