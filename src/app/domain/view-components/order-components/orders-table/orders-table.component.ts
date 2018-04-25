import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OrderStatus } from '../../../data/models/order.model';
import { OrderView } from '../../../data/view/order.view';


@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTableComponent {

  @Input() orders: OrderView[];
  @Input() actionsEnable: boolean;
  @Output() next = new EventEmitter<{orderID: string, status: OrderStatus}>();
  @Output() previous = new EventEmitter<{orderID: string, status: OrderStatus}>();

}
