import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchContainerComponent } from './restaurant-search-container.component';

describe('RestaurantSearchContainerComponent', () => {
  let component: RestaurantSearchContainerComponent;
  let fixture: ComponentFixture<RestaurantSearchContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantSearchContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantSearchContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
