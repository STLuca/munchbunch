import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AddOrder, Clear, PurchaseOrders, RemoveAll, RemoveOneOrder } from '../../../../store/clientState/orders/orders.action';
import { selectValidToPurchase } from '../../../../store/clientState/orders/orders.selectors';
import { Dish } from '../../../data/models/dish.model';
import { selectMyOrders, selectOrdersPrice } from '../../../data/store/index';
import { DishView } from '../../../data/view/dish.view';

@Component({
  selector: 'app-basket-orders-container',
  templateUrl: './basket-orders-container.component.html',
  styleUrls: ['./basket-orders-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOrdersContainerComponent implements OnInit {

  totalPrice: Observable<string>;
  orders: Observable<Array<{dish: Dish, quantity: number}>>;
  validToPurchase: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.totalPrice = this.store.select(selectOrdersPrice);
    this.orders = this.store.select(selectMyOrders);
    this.validToPurchase = this.store.select(selectValidToPurchase);
  }

  ngOnInit() {
  }

  clear() {
    this.store.dispatch(new Clear());
  }

  removeOne(dishID: string) {
    this.store.dispatch(new RemoveOneOrder({dishID}));
  }

  removeAll(dishID: string) {
    this.store.dispatch(new RemoveAll({dishID}));
  }

  addOne(dishID: string) {
    this.store.dispatch(new AddOrder({dishID}));
  }

  purchase() {
    this.store.dispatch(new PurchaseOrders());
  }

}
