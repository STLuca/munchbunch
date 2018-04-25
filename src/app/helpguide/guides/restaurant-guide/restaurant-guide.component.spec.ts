import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantGuideComponent } from './restaurant-guide.component';

describe('RestaurantGuideComponent', () => {
  let component: RestaurantGuideComponent;
  let fixture: ComponentFixture<RestaurantGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
