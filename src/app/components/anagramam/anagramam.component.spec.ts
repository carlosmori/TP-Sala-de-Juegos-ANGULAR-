import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramamComponent } from './anagramam.component';

describe('AnagramamComponent', () => {
  let component: AnagramamComponent;
  let fixture: ComponentFixture<AnagramamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AnagramamComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagramamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
