import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Purchase } from '../../../data/models/purchase.model';

@Component({
  selector: 'app-purchase-container',
  templateUrl: './purchase-container.component.html',
  styleUrls: ['./purchase-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseContainerComponent implements OnInit {

  @Input() purchase: Purchase;

  constructor() { }

  ngOnInit() {
  }

}
