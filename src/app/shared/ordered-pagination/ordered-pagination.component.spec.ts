import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedPaginationComponent } from './ordered-pagination.component';

describe('OrderedPaginationComponent', () => {
  let component: OrderedPaginationComponent;
  let fixture: ComponentFixture<OrderedPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
