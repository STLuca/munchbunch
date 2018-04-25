import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgrxServerWrapperImp } from '../../../../../ngrx/util/NgrxDatastore';
import { SACreate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { Dish } from '../../../data/models/dish.model';
import { createDishFormGroup, dishFormToModel } from '../utilMethods';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDishFormComponent implements OnInit {

  @Input() menuId: string;

  dishForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public serverAdapter: NgrxServerWrapperImp,
    public store: Store<any>
  ) {
    this.dishForm = createDishFormGroup(fb);
  }

  ngOnInit() {
  }

  submit(form: any) {
    const dish: Dish = dishFormToModel(form, this.serverAdapter.createId(), this.menuId);
    this.store.dispatch(new SACreate<Dish>({resourceName: 'dishes', id: dish.id, entity: dish}));
    this.store.dispatch(new DialogClose());
  }

}
