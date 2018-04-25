import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SAUpdate } from '../../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { DialogClose } from '../../../../custom-material/DialogStore/Dialog.actions';
import { Dish } from '../../../data/models/dish.model';
import { DishView } from '../../../data/view/dish.view';
import { createDishFormGroup, dishFormToModel } from '../utilMethods';

@Component({
  selector: 'app-update-dish-form',
  templateUrl: './update-dish-form.component.html',
  styleUrls: ['./update-dish-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateDishFormComponent implements OnInit {

  @Input() menuId: string;
  @Input() dish: DishView;

  dishForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>
  ) { }

  ngOnInit() {
    this.dishForm = createDishFormGroup(this.fb, this.dish);
  }

  submit(val: any) {
    const dish: Dish = dishFormToModel(val, this.dish.id, this.menuId);
    this.store.dispatch(new SAUpdate<Dish>({resourceName: 'dishes', id: dish.id, updatedEntity: dish}));
    this.store.dispatch(new DialogClose());
  }

}
