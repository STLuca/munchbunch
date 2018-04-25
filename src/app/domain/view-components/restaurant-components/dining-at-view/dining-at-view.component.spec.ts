import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningAtViewComponent } from './dining-at-view.component';

describe('DiningAtViewComponent', () => {
  let component: DiningAtViewComponent;
  let fixture: ComponentFixture<DiningAtViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiningAtViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningAtViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
