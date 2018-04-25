import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSmallContainerComponent } from './user-small-container.component';

describe('UserSmallContainerComponent', () => {
  let component: UserSmallContainerComponent;
  let fixture: ComponentFixture<UserSmallContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSmallContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSmallContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
