import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-form-view',
  templateUrl: './menu-form-view.component.html',
  styleUrls: ['./menu-form-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuFormViewComponent {

  @Input() menuForm: FormGroup;
  @Output() submitValue = new EventEmitter<any>();

}
