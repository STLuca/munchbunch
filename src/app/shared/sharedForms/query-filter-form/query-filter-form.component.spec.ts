import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryFilterFormComponent } from './query-filter-form.component';

describe('QueryFilterFormComponent', () => {
  let component: QueryFilterFormComponent;
  let fixture: ComponentFixture<QueryFilterFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryFilterFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
