import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPressCounterComponent } from './key-press-counter.component';

describe('KeyPressCounterComponent', () => {
  let component: KeyPressCounterComponent;
  let fixture: ComponentFixture<KeyPressCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPressCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPressCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
