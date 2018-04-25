import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersGuideComponent } from './orders-guide.component';

describe('OrdersGuideComponent', () => {
  let component: OrdersGuideComponent;
  let fixture: ComponentFixture<OrdersGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
