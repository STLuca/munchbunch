import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OrderView } from '../../../data/view/order.view';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css', './order-view.component.scss-theme.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderViewComponent {

  @Input() order: OrderView;

}
