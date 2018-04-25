import { Component, Input, OnInit } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Go } from '../../store/router/router.actions';
import { Logout } from '../store/auth.action';
import { authenticated } from '../store/auth.reducer';


@Component({
  selector: 'app-firebase-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  public authenticated: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.authenticated = store.select(authenticated);
   }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

  goToLogin() {
    this.store.dispatch(new Go({path: ['/login']}));
  }
}
