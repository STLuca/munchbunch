import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SAUpdate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { Menu } from '../../../data/models/menu.model';
import { MenuView } from '../../../data/view/menu.view';
import { createMenuFormGroup, menuFormToModel } from '../utilMethods';

@Component({
  selector: 'app-update-menu-form',
  templateUrl: './update-menu-form.component.html',
  styleUrls: ['./update-menu-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateMenuFormComponent implements OnInit {

  @Input() restaurantOwner: string;
  @Input() menu: MenuView;

  menuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.menuForm = createMenuFormGroup(this.fb, this.menu);
  }

  submit(val: any) {
    const menu: Menu = menuFormToModel(val, this.menu.id, this.restaurantOwner);
    this.store.dispatch(new SAUpdate<Menu>({resourceName: 'menus', id: menu.id, updatedEntity: menu}));
    this.store.dispatch(new DialogClose());
  }

}
