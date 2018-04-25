import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-dining-at-view',
  templateUrl: './dining-at-view.component.html',
  styleUrls: ['./dining-at-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiningAtViewComponent {

  @Input() restaurant: RestaurantView;
  @Input() table: string;
  @Output() navigate = new EventEmitter<string>();

}
