import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnagramamComponent } from './anagrama.component';

describe('AnagramamComponent', () => {
  let component: AnagramamComponent;
  let fixture: ComponentFixture<AnagramamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnagramamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnagramamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
