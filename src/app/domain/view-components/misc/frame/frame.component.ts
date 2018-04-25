import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Go } from '../../../../store/router/router.actions';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrameComponent {

  constructor(
    private store: Store<any>
  ) { }

  navigateHome() {
    this.store.dispatch(new Go({path: ['']}));
  }

  navigateMyOrders() {
    this.store.dispatch(new Go({path: ['/myOrders']}));
  }
}
