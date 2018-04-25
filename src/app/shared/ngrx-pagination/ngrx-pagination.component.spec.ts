import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxPaginationComponent } from './ngrx-pagination.component';

describe('NgrxPaginationComponent', () => {
  let component: NgrxPaginationComponent;
  let fixture: ComponentFixture<NgrxPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
