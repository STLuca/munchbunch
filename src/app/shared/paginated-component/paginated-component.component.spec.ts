import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedComponentComponent } from './paginated-component.component';

describe('PaginatedComponentComponent', () => {
  let component: PaginatedComponentComponent;
  let fixture: ComponentFixture<PaginatedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
