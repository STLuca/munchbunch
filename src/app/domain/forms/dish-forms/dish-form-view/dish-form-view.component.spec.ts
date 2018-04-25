import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormViewComponent } from './dish-form-view.component';

describe('DishFormViewComponent', () => {
  let component: DishFormViewComponent;
  let fixture: ComponentFixture<DishFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
