import { Action, createSelector, MemoizedSelector } from '@ngrx/store';
import { Map } from 'immutable';
import { QueryFilter } from '../util/BasicServer';
import { OrderedActions, OrderedPaginatedState, orderedReducer } from './OrderedPaginationReducer';


export enum FilteredOrderingActions {
    ADD_FILTERED_ORDERING = '[FILTERED] add'
}

export class AddFilteredOrdering<T> implements Action {
    readonly type = FilteredOrderingActions.ADD_FILTERED_ORDERING;
    constructor(public payload: {filters: Array<QueryFilter<T>>, orderAction: OrderedActions<T>}) {}
}

export type FilteredActions<T> = AddFilteredOrdering<T>;
export type FilteredOrderingState<T> = Map<string, OrderedPaginatedState<T>>;

export function filteredOrderingReducer<T>(state: FilteredOrderingState<T> = Map(), action: FilteredActions<T>): FilteredOrderingState<T> {

    if (action.type.startsWith(FilteredOrderingActions.ADD_FILTERED_ORDERING)) {
        const key: string[] = [JSON.stringify(action.payload.filters)];
        return state.setIn(key, orderedReducer(state.getIn(key), action.payload.orderAction));
    }
    return state;
}

export function createFilteredOrderingAction<T>(filters: Array<QueryFilter<T>>, orderedAction: OrderedActions<T>): FilteredActions<T> {
    return new AddFilteredOrdering<T>({filters, orderAction: orderedAction});
}

export function createFilteredOrderingSelector<T>(
    selectState: MemoizedSelector<object, FilteredOrderingState<T>>,
    selectFilters: MemoizedSelector<object, Array<QueryFilter<T>>>
): MemoizedSelector<object, OrderedPaginatedState<T>> {
    return createSelector(selectState, selectFilters, (state, filters) => state.get(JSON.stringify(filters)) || Map());
}
