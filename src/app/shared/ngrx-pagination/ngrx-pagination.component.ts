import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Ordering, QueryFilter } from '../../../ngrx/util/BasicServer';
import { SetData } from '../../store/clientState/QueryState/queryState.reducer';

@Component({
  selector: 'app-ngrx-pagination',
  templateUrl: './ngrx-pagination.component.html',
  styleUrls: ['./ngrx-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgrxPaginationComponent<T> implements OnInit {

  @Input() resourceName: string;
  @Input() filterKeys: Array<keyof T>;
  @Input() orderKeys: Array<keyof T>;
  @Input() startOrder: Ordering<T>;
  @Input() constantFilter: QueryFilter<T>;
  @Output() queryData = new EventEmitter<{resourcename: string, data: QueryData<any>}> ();


  constructor() {}

  ngOnInit() {
  }

  newQuery(pagination: QueryData<any>) {
    this.queryData.emit({resourcename: this.resourceName, data: pagination});
  }

}

export interface QueryData<T> {
  page: PageEvent;
  orders: Array<Ordering<T>>;
  filters: Array<QueryFilter<T>>;
}
