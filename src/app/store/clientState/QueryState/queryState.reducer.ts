import { PageEvent } from '@angular/material';
import { Action } from '@ngrx/store';
import { Ordering, QueryFilter } from '../../../../ngrx/util/BasicServer';
import { TableName } from '../../../../ngrx/util/schema';


export interface QueryState<T> {
    data: QueryData<T>;
    resource: TableName;
}

export const initialQueryState: QueryState<any> = {
    data: {
        page: {
            pageIndex: 1,
            pageSize: 10,
            length: 100
        },
        orders: [],
        filters: []
    },
    resource: null
};

export interface QueryData<T> {
    page: PageEvent;
    orders: Array<Ordering<T>>;
    filters: Array<QueryFilter<T>>;
  }

export enum QueryStateActionTypes {
    QUERY = '[Query]',
    SET_QUERY_DATA = '[Query] Set data'
}

export class Query<T> implements Action {
    readonly type = QueryStateActionTypes.QUERY;
    constructor(public payload: {data: QueryData<T>, resourcename: TableName}) {}
}

export class SetData<T> implements Action {
    readonly type = QueryStateActionTypes.SET_QUERY_DATA;
    constructor(public payload: {data: QueryData<T>, resourcename: TableName}) {}
}

export type QueryActions<T> = Query<T> | SetData<T>;

export function queryStateReducer<T>(state: QueryState<T> = initialQueryState, action: QueryActions<T>): QueryState<T> {
    switch ( action.type ) {
        case QueryStateActionTypes.SET_QUERY_DATA:
            return {
                data: {...action.payload.data, page: {...action.payload.data.page, pageIndex: action.payload.data.page.pageIndex + 1}},
                resource: action.payload.resourcename
            };
        default:
            return state;
    }
}
