import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dish-form-view',
  templateUrl: './dish-form-view.component.html',
  styleUrls: ['./dish-form-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishFormViewComponent implements OnInit {

  @Input() dishForm: FormGroup;
  @Output() submitValue = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  updatePictureInput(url) {
    this.dishForm.get('picture').setValue(url);
  }

}
