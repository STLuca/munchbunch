import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { MenuView } from '../../../data/view/menu.view';

@Component({
  selector: 'app-menu-view',
  templateUrl: './menu-view.component.html',
  styleUrls: ['./menu-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuViewComponent {

  @Input() menuView: MenuView;
  @Input() restaurantID: string;
  @Input() owner: boolean;

  @Output() editMenu = new EventEmitter<TemplateRef<any>>();
  @Output() deleteMenu = new EventEmitter<TemplateRef<any>>();

  @Output() addDish = new EventEmitter<TemplateRef<any>>();
  @Output() deleteDish = new EventEmitter<TemplateRef<any>>();
  @Output() editDish = new EventEmitter<TemplateRef<any>>();

}
