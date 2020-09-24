import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyPressComponent } from './key-press.component';

describe('KeyPressComponent', () => {
  let component: KeyPressComponent;
  let fixture: ComponentFixture<KeyPressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyPressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyPressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
