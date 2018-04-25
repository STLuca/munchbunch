import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { DishView } from '../../../data/view/dish.view';

@Component({
  selector: 'app-dish-view',
  templateUrl: './dish-view.component.html',
  styleUrls: ['./dish-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishViewComponent {

  @Input() dishView: DishView;
  @Input() menuID: string;
  @Input() orderable: boolean;
  @Output() addOrder = new EventEmitter();
  @Output() showReviews = new EventEmitter();
  @Output() deleteDish = new EventEmitter<TemplateRef<any>>();
  @Output() editDish = new EventEmitter<TemplateRef<any>>();

}
