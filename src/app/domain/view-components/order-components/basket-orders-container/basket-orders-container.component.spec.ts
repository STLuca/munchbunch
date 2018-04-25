import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketOrdersContainerComponent } from './basket-orders-container.component';

describe('MyOrdersComponent', () => {
  let component: BasketOrdersContainerComponent;
  let fixture: ComponentFixture<BasketOrdersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketOrdersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketOrdersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
