import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form-view',
  templateUrl: './user-form-view.component.html',
  styleUrls: ['./user-form-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormViewComponent {

  @Input() userForm: FormGroup;
  @Output() submitValue = new EventEmitter<any>();

  updatePictureInput(url) {
    this.userForm.get('pictureUrl').setValue(url);
  }

}
