import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { UserView } from '../../../data/view/user.view';

@Component({
  selector: 'app-user-small-view',
  templateUrl: './user-small-view.component.html',
  styleUrls: ['./user-small-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSmallViewComponent {

  @Input() user: UserView;
  @Input() uid: string;

  @Output() navigateToUser = new EventEmitter<string>();
  @Output() logout = new EventEmitter();
  @Output() login = new EventEmitter();
  @Output() editAccount = new EventEmitter<TemplateRef<any>>();
  @Output() deleteAccount = new EventEmitter<TemplateRef<any>>();

}
