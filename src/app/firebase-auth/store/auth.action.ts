import { Action } from '@ngrx/store';

export const SIGNUP = '[AUTH] SIGNUP';
export const SIGNIN = '[AUTH] SIGNIN';
export const LOGOUT = '[AUTH] LOGOUT';
export const SET_TOKEN = '[AUTH] SET_TOKEN';

export enum AuthActionTypes {
    GET_USER = '[Auth] Get User',
    SIGNUP = '[AUTH] SIGNUP',
    SIGNIN = '[AUTH] SIGNIN',
    GOOGLE_LOGIN = '[Auth] Google login attempt',
    LOGOUT = '[AUTH] LOGOUT',
    AUTHENTICATED = '[AUTH] Authenticated',
    NOT_AUTHENTICATED = '[Auth] Not Authenticated'

}

export class GetUser implements Action {
    readonly type = AuthActionTypes.GET_USER;
}

export class SignUp implements Action {
    readonly type = AuthActionTypes.SIGNUP;
    constructor(public payload: {email: string, password: string}) {}
}

export class SignIn implements Action {
    readonly type = AuthActionTypes.SIGNIN;
    constructor(public payload: {email: string, password: string}) {}
}

export class GoogleLogin implements Action {
    readonly type = AuthActionTypes.GOOGLE_LOGIN;

}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class Authenticated implements Action {
    readonly type = AuthActionTypes.AUTHENTICATED;
    constructor(public payload: {displayName: string, uid: string, token: string}) {}
}

export class NotAuthenticated implements Action {
    readonly type = AuthActionTypes.NOT_AUTHENTICATED;
}

export type AuthActions =  Authenticated | NotAuthenticated; // | SignUp | SignIn | GoogleLogin | Logout
