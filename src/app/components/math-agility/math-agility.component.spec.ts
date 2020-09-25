import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MathAgilityComponent } from './math-agility.component';

describe('MathAgilityComponent', () => {
  let component: MathAgilityComponent;
  let fixture: ComponentFixture<MathAgilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MathAgilityComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathAgilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
