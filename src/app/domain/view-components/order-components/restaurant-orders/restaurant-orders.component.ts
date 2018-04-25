import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NextOrderStatus, PreviousOrderStatus } from '../../../../store/clientState/orders/orders.action';
import { incrementStatus, OrderStatus } from '../../../data/models/order.model';
import { getRoutedRestaurantOrders } from '../../../data/store';
import { OrderView } from '../../../data/view/order.view';
@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantOrdersComponent {

  pending: Observable<OrderView[]>;
  cooking: Observable<OrderView[]>;
  cooked: Observable<OrderView[]>;

  constructor(
    private store: Store<any>
  ) {
    const myOrders = this.store.select(getRoutedRestaurantOrders);
    this.pending = myOrders.map(orders => orders.filter(order => order.status === 'Pending'));
    this.cooking = myOrders.map(orders => orders.filter(order => order.status === 'Cooking'));
    this.cooked = myOrders.map(orders => orders.filter(order => order.status === 'Cooked'));
   }

  updateOrderStatus(event: {orderID: string, status: OrderStatus}) {
    this.store.dispatch(new NextOrderStatus({orderID: event.orderID, status: event.status}));
  }

  decrementOrderStatus(event: {orderID: string, status: OrderStatus}) {
    this.store.dispatch(new PreviousOrderStatus({orderID: event.orderID, status: event.status}));
  }
}
