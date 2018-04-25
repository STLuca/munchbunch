import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgrxServerWrapperImp } from '../../../../../ngrx/util/NgrxDatastore';
import { SACreate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { Menu } from '../../../data/models/menu.model';
import { createMenuFormGroup, menuFormToModel } from '../utilMethods';

@Component({
  selector: 'app-add-menu-form',
  templateUrl: './add-menu-form.component.html',
  styleUrls: ['./add-menu-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddMenuFormComponent implements OnInit {

  @Input() restaurantId: string;

  menuForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serverAdapter: NgrxServerWrapperImp,
    private store: Store<any>
  ) {
    this.menuForm = createMenuFormGroup(fb);
  }

  ngOnInit() {
  }

  submit(val: any) {
    const menu: Menu = menuFormToModel(val, this.serverAdapter.createId(), this.restaurantId);
    this.store.dispatch(new SACreate<Menu>({resourceName: 'menus', id: menu.id, entity: menu}));
    this.store.dispatch(new DialogClose());
  }

}
