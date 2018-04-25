import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDashboardViewComponent } from './restaurant-dashboard-view.component';

describe('RestaurantView2Component', () => {
  let component: RestaurantDashboardViewComponent;
  let fixture: ComponentFixture<RestaurantDashboardViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantDashboardViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantDashboardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
