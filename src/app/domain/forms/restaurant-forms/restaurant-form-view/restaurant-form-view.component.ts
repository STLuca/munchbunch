import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurant-form-view',
  templateUrl: './restaurant-form-view.component.html',
  styleUrls: ['./restaurant-form-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantFormViewComponent {

  @Input() restaurantForm: FormGroup;
  @Output() submitValue = new EventEmitter<any>();

  updatePictureInput(url) {
    this.restaurantForm.get('picture').setValue(url);
  }

  submitForm() {
    this.submitValue.emit(this.restaurantForm.value);
  }
}
