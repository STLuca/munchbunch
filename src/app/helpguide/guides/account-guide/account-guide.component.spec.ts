import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountGuideComponent } from './account-guide.component';

describe('AccountGuideComponent', () => {
  let component: AccountGuideComponent;
  let fixture: ComponentFixture<AccountGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
