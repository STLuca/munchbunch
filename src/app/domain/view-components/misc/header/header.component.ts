import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Go } from '../../../../store/router/router.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

  navigateHome() {
    this.store.dispatch(new Go({path: ['/']}));
  }

  goToHelp() {
    this.store.dispatch(new Go({path: ['/help']}));
  }
}
