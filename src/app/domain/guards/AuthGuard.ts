import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { authenticated } from '../../firebase-auth/store/auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<any>) {}

    canActivate() {
        return this.store.select(authenticated).pipe(take(1));
    }

}
