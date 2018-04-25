import { Action, createSelector, MemoizedSelector } from '@ngrx/store';
import { Map } from 'immutable';
import { Ordering } from '../util/BasicServer';
import { PaginatedState, PaginationActions, paginationReducer } from './pagination.reducer';

export enum OrderedActionTypes {
    ADD_ORDERED_PAGINATION = '[ORDERED] add'
}

export class AddOrderedPagination<T> implements Action {
    readonly type = OrderedActionTypes.ADD_ORDERED_PAGINATION + ' ' + this.payload.paginationAction.type;
    constructor(public payload: {orderKeys: Array<Ordering<T>>, paginationAction: PaginationActions}) {}
}

export type OrderedActions<T> = AddOrderedPagination<T>;
export type OrderedPaginatedState<T> = Map<string, PaginatedState>;

export function orderedReducer<T>(state: OrderedPaginatedState<T> =  Map(), action: OrderedActions<T>): OrderedPaginatedState<T> {
    if (action.type.startsWith(OrderedActionTypes.ADD_ORDERED_PAGINATION)) {
        if (action.payload.orderKeys.length > 0) {
            const key: string[] = [JSON.stringify(action.payload.orderKeys)];
            return state.setIn(key,
                             paginationReducer(state.getIn(key), action.payload.paginationAction));
        }

    }

    return state;

}

export function createOrderedAction<T>(orderKeys: Array<Ordering<T>>, pagedAction: PaginationActions) {
    return new AddOrderedPagination({orderKeys, paginationAction: pagedAction});
}

// A selector creator
// args:
//  -A selector that returns a map
//  -A selector that returns an array of strings, these being the order keys e.g. name, age
//  -A selector that returns an Order ('asc', or 'desc')
// returns a PaginationState
export function createOrderSelector<T>( selectState: MemoizedSelector<object, OrderedPaginatedState<T>>,
                                selectOrderKeys: MemoizedSelector<object, Array<Ordering<T>>>
                            ): MemoizedSelector<object, PaginatedState> {

        return createSelector(selectState, selectOrderKeys, (state, orderKeys) => {
            return state.get(JSON.stringify(orderKeys)) || Map(); });

}
