import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketOrdersViewComponent } from './basket-orders-view.component';

describe('BasketOrdersViewComponent', () => {
  let component: BasketOrdersViewComponent;
  let fixture: ComponentFixture<BasketOrdersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketOrdersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketOrdersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
