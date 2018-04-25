import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { boolToDirection, Ordering } from '../../../ngrx/util/BasicServer';
import { validChanges } from '../filtered-pagination/filtered-pagination.component';


@Component({
  selector: 'app-ordered-pagination',
  templateUrl: './ordered-pagination.component.html',
  styleUrls: ['./ordered-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderedPaginationComponent<T> implements OnInit {

  @Input() orderKeys: Array<keyof T>;
  @Input() startOrdering: Ordering<T>;
  @Output() orders = new EventEmitter<Array<Ordering<T>>>();

  // pagination = new Subject<PageEvent>();
  // orders = new Subject<Ordering<T>[]>();


  form: FormGroup;
  createOrderForm: () => FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.form = this.fb.group({
      orders: this.fb.array([
        this.fb.group(
        {selectedKey: [this.startOrdering.field],
        selectedDirection: [this.startOrdering.direction === 'asc' ? true : false]})
      ])
    });
    this.createOrderForm = () => this.fb.group({
      selectedKey: ['', Validators.required],
      selectedDirection: [true]
    });

    validChanges(this.form)
      .map(x => x['orders'].map(order => ({field: order.selectedKey, direction: boolToDirection(order.selectedDirection)})))
      .subscribe(orderings => this.orders.emit(orderings));
  }


}

/*
export interface Ordering<T> {
    field: keyof T;
    direction: OrderDirection;
}
*/
