import { Action } from '@ngrx/store';

export enum SearchActionTypes {
    SET_LOCATION = '[Search] Set location',
    SET_RADIUS = '[Search] Set radius',
    ADD_RESULTS = '[Search] Set results',
    ADD_RESTAURANT = '[Search] Add Restaurant',
    SET_FILTER = '[Search] Set filter'
}

export class SetLocation implements Action {
    readonly type = SearchActionTypes.SET_LOCATION;
    constructor(public payload: {location: {lat: number, lng: number}}) {}
}

export class SetRadius implements Action {
    readonly type = SearchActionTypes.SET_RADIUS;
    constructor(public payload: {radius: number}) {}
}

export class SetResults implements Action {
    readonly type = SearchActionTypes.ADD_RESULTS;
    constructor(public payload: {results: string[]}) {}
}

export class AddRestaurant implements Action {
    readonly type = SearchActionTypes.ADD_RESTAURANT;
    constructor(public payload: {restaurantID: string, distance: number}) {}
}

export class SetFilter implements Action {
    readonly type = SearchActionTypes.SET_FILTER;
    constructor(public payload: {filter: string}) {}
}

export type SearchActions = SetLocation | SetRadius | SetResults | AddRestaurant | SetFilter;
