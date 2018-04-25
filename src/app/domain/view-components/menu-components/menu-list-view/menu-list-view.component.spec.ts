import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListViewComponent } from './menu-list-view.component';

describe('MenuListViewComponent', () => {
  let component: MenuListViewComponent;
  let fixture: ComponentFixture<MenuListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
