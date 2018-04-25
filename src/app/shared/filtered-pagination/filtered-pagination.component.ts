import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { zip } from 'rxjs/observable/zip';
import { filter, map } from 'rxjs/operators';
import { Ordering, QueryFilter } from '../../../ngrx/util/BasicServer';


@Component({
  selector: 'app-filtered-pagination',
  templateUrl: './filtered-pagination.component.html',
  styleUrls: ['./filtered-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilteredPaginationComponent<T> {

  @Input() filterKeys: Array<keyof T>;

  @Output() filters = new EventEmitter<Array<QueryFilter<T>>>();

  form: FormGroup;
  createFilterForm: () => FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      filters: this.fb.array([])
    });
    this.createFilterForm = () => this.fb.group({
      selectedKey: ['', Validators.required],
      selectedComparison: ['', Validators.required],
      value: ['', Validators.required]
    });
    validChanges(this.form)
    .pipe(
      map(filters => filters['filters'].map(afilter => {return {
        field: afilter.selectedKey,
        comparison: afilter.selectedComparison,
        value: afilter.value
      }; }))
    ).subscribe(orderings => this.filters.emit(orderings));
   }

}

export function validChanges(form: FormGroup): Observable<any> {
  return zip(
    form.statusChanges,
    form.valueChanges
  ).pipe(
    filter(val => val[0] === 'VALID'),
    map(val => val[1]));
}
