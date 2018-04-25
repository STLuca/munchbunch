import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from '../../../data/models/dish.model';

@Component({
  selector: 'app-basket-orders-view',
  templateUrl: './basket-orders-view.component.html',
  styleUrls: ['./basket-orders-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOrdersViewComponent {

  @Input() totalPrice: number;
  @Input() orders: Array<{dish: Dish, quantity: number}>;
  @Input() validToPurchase: boolean;

  @Output() clear = new EventEmitter<any>();
  @Output() removeOne = new EventEmitter<string>();
  @Output() addOne = new EventEmitter<string>();
  @Output() purchase = new EventEmitter<any>();

}
