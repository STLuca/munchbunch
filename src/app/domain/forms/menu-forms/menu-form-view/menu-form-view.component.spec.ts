import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFormViewComponent } from './menu-form-view.component';

describe('MenuFormViewComponent', () => {
  let component: MenuFormViewComponent;
  let fixture: ComponentFixture<MenuFormViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFormViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
