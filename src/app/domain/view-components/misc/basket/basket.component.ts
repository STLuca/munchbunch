import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectOrdersList } from '../../../../store/clientState/orders/orders.selectors';
import { Go } from '../../../../store/router/router.actions';
import { selectOrdersPrice } from '../../../data/store';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketComponent implements OnInit {

  numberOfOrderedItems: Observable<number>;
  totalPrice: Observable<string>;

  constructor(
    private store: Store<any>
  ) {
    this.numberOfOrderedItems = this.store.select(selectOrdersList).map( list => list.length);
    this.totalPrice = this.store.select(selectOrdersPrice);
  }

  ngOnInit() {
  }

  goToBasket() {
    this.store.dispatch(new Go({path: ['basket']}));
  }

}
