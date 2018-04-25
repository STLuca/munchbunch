import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishView2Component } from './dish-view2.component';

describe('DishView2Component', () => {
  let component: DishView2Component;
  let fixture: ComponentFixture<DishView2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishView2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishView2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
