import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Ordering, QueryFilter } from '../../../ngrx/util/BasicServer';

@Component({
  selector: 'app-custom-query',
  templateUrl: './custom-query.component.html',
  styleUrls: ['./custom-query.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomQueryComponent<T> implements OnInit {

  @Input() filterKeys: Array<keyof T>;
  @Input() orderKeys: Array<keyof T>;
  @Input() startOrder: Ordering<T>;
  @Input() constantFilter: QueryFilter<T>;
  @Output() paginationQuery = new EventEmitter<{
    page: PageEvent,
    orders: Array<Ordering<T>>,
    filters: Array<QueryFilter<T>>
  }>();

  pageData = new Subject<PageEvent>();
  orders = new Subject<Array<Ordering<T>>>();
  filters = new Subject<Array<QueryFilter<T>>>();

  constructor() {

   }


  ngOnInit() {
    combineLatest(
      this.pageData.pipe(startWith({pageIndex: 0, pageSize: 10, length: 100})),
      this.orders.pipe(startWith([this.startOrder])),
      this.filters.pipe(startWith([]))
    ).pipe(
      map(data => { return {
        page: data[0],
        orders: data[1],
        filters: [this.constantFilter, ...data[2]]
      }; }),
      debounceTime(1000)
    ).subscribe(x => this.paginationQuery.emit(x));
  }

}
