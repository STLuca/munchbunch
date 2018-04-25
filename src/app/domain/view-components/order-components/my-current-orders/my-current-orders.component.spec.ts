import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCurrentOrdersComponent } from './my-current-orders.component';

describe('MyCurrentOrdersComponent', () => {
  let component: MyCurrentOrdersComponent;
  let fixture: ComponentFixture<MyCurrentOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCurrentOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCurrentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
