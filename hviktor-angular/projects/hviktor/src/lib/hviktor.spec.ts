import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hviktor } from './hviktor';

describe('Hviktor', () => {
  let component: Hviktor;
  let fixture: ComponentFixture<Hviktor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hviktor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hviktor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
