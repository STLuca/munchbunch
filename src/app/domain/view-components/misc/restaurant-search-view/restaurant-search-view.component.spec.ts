import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchViewComponent } from './restaurant-search-view.component';

describe('RestaurantSearchViewComponent', () => {
  let component: RestaurantSearchViewComponent;
  let fixture: ComponentFixture<RestaurantSearchViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSearchViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
