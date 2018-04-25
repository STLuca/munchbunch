import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuFormComponent } from './update-menu-form.component';

describe('UpdateMenuFormComponent', () => {
  let component: UpdateMenuFormComponent;
  let fixture: ComponentFixture<UpdateMenuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMenuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
