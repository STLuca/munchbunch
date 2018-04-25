import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSidenavComponent } from './help-sidenav.component';

describe('HelpSidenavComponent', () => {
  let component: HelpSidenavComponent;
  let fixture: ComponentFixture<HelpSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
