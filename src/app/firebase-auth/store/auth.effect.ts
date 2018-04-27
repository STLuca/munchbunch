
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { zip } from 'rxjs/observable/zip';
import { catchError, debounceTime, delay, filter, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { NgrxServerWrapperImp } from '../../../ngrx/util/NgrxDatastore';
import { SARead } from '../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { AddAlert } from '../../alerts/store/alerts/alerts.action';
import { Go } from '../../store/router/router.actions';
import { AuthActions, AuthActionTypes, Authenticated, GetUser, GoogleLogin, NotAuthenticated, SignUp} from './auth.action';


@Injectable()
export class AuthEffects {

    constructor(
        private afAuth: AngularFireAuth,
        private actions$: Actions,
        private serverAdapter: NgrxServerWrapperImp
    ) {}

    @Effect()
    getUser:  Observable<Action> = this.actions$.ofType(AuthActionTypes.GET_USER)
        .pipe(
            switchMap(() => zip(
                this.afAuth.authState.pipe(
                    map(state => ({dn: state.displayName, email: state.email, uid: state.uid})),
                    take(1)),
                this.afAuth.idToken.take(1)
            )),
            filter(authData => !!authData),
            mergeMap( authData =>
                [
                    new Authenticated({
                        displayName: authData[0].dn || this.emailToName(authData[0].email),
                        token: authData[1],
                        uid: authData[0].uid
                   }),
                   new Go({path: ['']})
                ])
        );


    @Effect()
    googleLoginEffect:  Observable<Action> = this.actions$.ofType(AuthActionTypes.GOOGLE_LOGIN)
        .pipe(
            switchMap(payload =>
                this.googleLogin().pipe(
                    delay(2000),
                    map(credentials => new GetUser()),
                    catchError(err => Observable.of(new AddAlert({alert: err.message}))
                )))
        );

    @Effect()
    signup: Observable<Action> = this.actions$.ofType(AuthActionTypes.SIGNUP)
        .pipe(
            map( (action: SignUp) => action.payload),
            switchMap( (authData: {email: string, password: string}) =>
                from(this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password))
                .pipe(
                    delay(2000),
                    map( () => new GetUser()),
                    catchError(err => Observable.of(new AddAlert({alert: err.message})))
                ))
        );

    @Effect()
    loginWithEmail: Observable<Action> = this.actions$.ofType(AuthActionTypes.SIGNIN)
        .pipe(
            map( (action: SignUp) => action.payload),
            switchMap( (authData: {email: string, password: string}) =>
                from(this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password))
                .pipe(
                    map( () => new GetUser()),
                    catchError(err => Observable.of(new AddAlert({alert: err.message})))
                ))
        );

    @Effect()
    logout: Observable<Action> = this.actions$.ofType(AuthActionTypes.LOGOUT)
        .pipe(
            tap( () => fromPromise(this.afAuth.auth.signOut())),
            mergeMap( () => [new NotAuthenticated(),
                new Go({path: ['/login']})])
        );

    @Effect()
    userAuthenticated:  Observable<Action> =
        this.actions$.ofType(AuthActionTypes.AUTHENTICATED)
            .pipe(
                debounceTime(500),
                map( (action: Authenticated) => action.payload.uid),
                map( uid => new SARead({resourceName: 'users', id: uid}))
            );

    private googleLogin(): Observable<any> {
        const provider = new auth.GoogleAuthProvider();
        return fromPromise(this.afAuth.auth.signInWithPopup(provider));
    }

    private emailToName(email: string): string {
        return email.split('@')[0];
    }
}
