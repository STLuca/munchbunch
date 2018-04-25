import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Purchase } from '../../../data/models/purchase.model';

@Component({
  selector: 'app-purchase-view',
  templateUrl: './purchase-view.component.html',
  styleUrls: ['./purchase-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseViewComponent {

  @Input() purchase: Purchase;

}
