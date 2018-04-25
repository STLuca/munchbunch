import { Action } from '@ngrx/store';



export enum AlertActionTypes {
    ADD = '[Alerts] Add',
    REMOVE = '[Alerts] Remove'
}

export class AddAlert implements Action {
    readonly type = AlertActionTypes.ADD;
    constructor(public payload: {alert: string}) {}
}


export class RemoveAlert implements Action {
    readonly type = AlertActionTypes.REMOVE;
    constructor(public payload: {index: number}) {}
}



export type AlertActions = AddAlert | RemoveAlert;
