import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSmallViewComponent } from './user-small-view.component';

describe('UserSmallViewComponent', () => {
  let component: UserSmallViewComponent;
  let fixture: ComponentFixture<UserSmallViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSmallViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSmallViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
