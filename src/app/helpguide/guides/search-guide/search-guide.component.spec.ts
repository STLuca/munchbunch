import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGuideComponent } from './search-guide.component';

describe('SearchGuideComponent', () => {
  let component: SearchGuideComponent;
  let fixture: ComponentFixture<SearchGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
