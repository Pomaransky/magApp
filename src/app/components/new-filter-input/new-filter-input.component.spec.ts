import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilterInputComponent } from './new-filter-input.component';

describe('NewFilterInputComponent', () => {
  let component: NewFilterInputComponent;
  let fixture: ComponentFixture<NewFilterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFilterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFilterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
