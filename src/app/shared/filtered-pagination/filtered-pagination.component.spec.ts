import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredPaginationComponent } from './filtered-pagination.component';

describe('FilteredPaginationComponent', () => {
  let component: FilteredPaginationComponent;
  let fixture: ComponentFixture<FilteredPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
