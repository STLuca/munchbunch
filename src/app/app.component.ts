import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SignIn } from './firebase-auth/store/auth.action';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    private store: Store<any>
  ) {
    // this.store.dispatch(new SignIn({email: 'hi@email.com', password: 'password123'}));
  }

}
