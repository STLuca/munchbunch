import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { GetMyOrders } from '../../../../store/clientState/orders/orders.action';
import { getMyCurrentOrders } from '../../../data/store';
import { OrderView } from '../../../data/view/order.view';

@Component({
  selector: 'app-my-current-orders',
  templateUrl: './my-current-orders.component.html',
  styleUrls: ['./my-current-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyCurrentOrdersComponent {

  pending: Observable<OrderView[]>;
  cooking: Observable<OrderView[]>;
  cooked: Observable<OrderView[]>;

  constructor(
    private store: Store<any>
  ) {
    this.store.dispatch(new GetMyOrders());
    const myOrders = this.store.select(getMyCurrentOrders);
    this.pending = myOrders.map(orders => orders.filter(order => order.status === 'Pending'));
    this.cooking = myOrders.map(orders => orders.filter(order => order.status === 'Cooking'));
    this.cooked = myOrders.map(orders => orders.filter(order => order.status === 'Cooked'));
   }

}
