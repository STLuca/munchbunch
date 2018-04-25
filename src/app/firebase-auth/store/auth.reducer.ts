import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from './auth.action';
import { authInitalState, AuthState } from './auth.state';




export function authReducer(state: AuthState = authInitalState, action: AuthActions): AuthState {
    switch (action.type) {
        case (AuthActionTypes.AUTHENTICATED): {
            return {
                ...state,
                displayName: action.payload.displayName,
                uid: action.payload.uid,
                token: action.payload.token,
                authenticated: true
            };
        }
        case (AuthActionTypes.NOT_AUTHENTICATED): {
            return {
                ...state,
                displayName: 'Guest',
                uid: null,
                token: null,
                authenticated: false
            };
        }
        default: {
            return state;
        }
    }

}

export const selectAuth = createFeatureSelector<AuthState>('auth');
export const displayName = createSelector(selectAuth, state => state.displayName);
export const authenticated = createSelector(selectAuth, state => state.authenticated);
export const uid = createSelector(selectAuth, state => state.uid);
