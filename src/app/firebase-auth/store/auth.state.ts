export interface AuthState {
    displayName: string;
    uid: string;
    token: string;
    authenticated: boolean;
}

export const authInitalState: AuthState = {
    displayName: 'Guest',
    uid: null,
    token: null,
    authenticated: false
};
