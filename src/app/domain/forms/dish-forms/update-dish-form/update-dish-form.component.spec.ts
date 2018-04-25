import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDishFormComponent } from './update-dish-form.component';

describe('UpdateDishFormComponent', () => {
  let component: UpdateDishFormComponent;
  let fixture: ComponentFixture<UpdateDishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDishFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
