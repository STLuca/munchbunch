import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { OrderDirection, Ordering } from '../../../../ngrx/util/BasicServer';

@Component({
  selector: 'app-ordering-form',
  templateUrl: './ordering-form.component.html',
  styleUrls: ['./ordering-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderingFormComponent<T> implements OnInit {

  @Input() form: FormGroup;
  @Input() orderKeys: Array<keyof T>;

  constructor() { }

  ngOnInit() {}


}
