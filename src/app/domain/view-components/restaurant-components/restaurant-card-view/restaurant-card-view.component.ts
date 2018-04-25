import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { RestaurantView } from '../../../data/view/restaurant.view';

@Component({
  selector: 'app-restaurant-card-view',
  templateUrl: './restaurant-card-view.component.html',
  styleUrls: ['./restaurant-card-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantCardViewComponent {

  @Input() restaurant: RestaurantView;
  @Input() uid: string;
  @Input() distance ?: number;
  @Output() navigateToRestaurant: EventEmitter<string> = new EventEmitter<string>();
  @Output() navigateToRestaurantOrders = new EventEmitter<string>();
  @Output() editRestaurant = new EventEmitter<TemplateRef<any>>();
  @Output() deleteRestaurant = new EventEmitter<TemplateRef<any>>();

}
