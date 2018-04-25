import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantFormViewComponent } from './restaurant-form-view.component';

describe('RestaurantFormViewComponent', () => {
  let component: RestaurantFormViewComponent;
  let fixture: ComponentFixture<RestaurantFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
