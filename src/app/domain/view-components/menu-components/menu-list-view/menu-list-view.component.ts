import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MenuView } from '../../../data/view/menu.view';

@Component({
  selector: 'app-menu-list-view',
  templateUrl: './menu-list-view.component.html',
  styleUrls: ['./menu-list-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListViewComponent {

  @Input() menuViews: MenuView[];
  @Input() restaurantId: string;

}
