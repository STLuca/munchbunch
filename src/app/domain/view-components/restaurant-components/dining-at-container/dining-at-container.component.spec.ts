import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningAtContainerComponent } from './dining-at-container.component';

describe('DiningAtContainerComponent', () => {
  let component: DiningAtContainerComponent;
  let fixture: ComponentFixture<DiningAtContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiningAtContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningAtContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
