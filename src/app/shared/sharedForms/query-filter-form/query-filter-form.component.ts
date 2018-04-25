import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Comparison, comparisonsArray, QueryFilter } from '../../../../ngrx/util/BasicServer';

@Component({
  selector: 'app-query-filter-form',
  templateUrl: './query-filter-form.component.html',
  styleUrls: ['./query-filter-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryFilterFormComponent<T> implements OnInit {

  @Input() form: FormGroup;
  @Input() filterKeys: Array<keyof T>;
  comparisons = comparisonsArray;

  constructor() { }

  ngOnInit() {}

}
