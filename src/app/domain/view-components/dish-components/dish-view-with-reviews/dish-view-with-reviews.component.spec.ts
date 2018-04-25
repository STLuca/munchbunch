import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishViewWithReviewsComponent } from './dish-view-with-reviews.component';

describe('DishViewWithReviewsComponent', () => {
  let component: DishViewWithReviewsComponent;
  let fixture: ComponentFixture<DishViewWithReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishViewWithReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishViewWithReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
