import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { SADelete } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { Dish } from '../../../data/models/dish.model';
import { Menu } from '../../../data/models/menu.model';
import { selectLoggedInUsersRestaurantsIds } from '../../../data/store';
import { MenuView } from '../../../data/view/menu.view';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuContainerComponent implements OnInit {

  @Input() restaurantID: string;
  @Input() menuView: MenuView;
  owner: Observable<boolean>;

  constructor(
    private store: Store<any>,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.owner = this.store.select(selectLoggedInUsersRestaurantsIds).map(ids => ids.includes(this.restaurantID));
  }

  editMenu(template: TemplateRef<any>) {
    this.dialog.open(template);
  }

  deleteMenu(template: TemplateRef<any>) {
    const ref = this.dialog.open(template);
    ref.afterClosed()
      .pipe(
        filter(menuID => menuID != null),
        map(menuID => new SADelete<Menu>({resourceName: 'menus', id: menuID}))
      ).subscribe(action => this.store.dispatch(action));
  }

  addDish(template: TemplateRef<any>) {
    this.dialog.open(template);
  }



}
