import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketGuideComponent } from './basket-guide.component';

describe('BasketGuideComponent', () => {
  let component: BasketGuideComponent;
  let fixture: ComponentFixture<BasketGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
