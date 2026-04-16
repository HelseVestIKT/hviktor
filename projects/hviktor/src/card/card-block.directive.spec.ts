import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { setupTestBed } from '../testing/test-utils';
import { HviCardBlock } from './card-block.directive';

@Component({
  standalone: true,
  imports: [HviCardBlock],
  template: '<div hviCardBlock>Single block</div>',
})
class SingleBlockComponent {}

describe('HviCardBlock', () => {
  beforeEach(async () => {
    await setupTestBed({ imports: [SingleBlockComponent] });
  });

  it('should add ds-card__block class to its host element', () => {
    const f = TestBed.createComponent(SingleBlockComponent);
    f.detectChanges();
    expect(f.nativeElement.querySelector('div').classList.contains('ds-card__block')).toBe(true);
  });
});
