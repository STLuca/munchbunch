import { Action, createSelector, MemoizedSelector } from '@ngrx/store';
import { Map } from 'immutable';
import { FirestorePagination } from '../util/BasicServer';

export interface Pagination {
    page: number;
    count: number;
}

export enum PaginationActionTypes {
    ADD_ITEM = '[Pagination] Add Item',
    ADD_ITEMS = '[Pagination] Add Items',
    ADD_NEXT_PAGE = '[Pagination] Add next page',
    ADD_PAGE = '[Pagination] Add page'
}

export class AddItem implements Action {
    readonly type = PaginationActionTypes.ADD_ITEM;
    constructor(public payload: {itemPosition: number, itemID: string }) {}
}

export class AddItems implements Action {
    readonly type = PaginationActionTypes.ADD_ITEMS;
    constructor(public payload: {items: Map<number, string>}) {}
}

export class AddPage implements Action {
    readonly type = PaginationActionTypes.ADD_PAGE;
    constructor(public payload: {itemIDs: string[], pageData: FirestorePagination}) {}
}

export class AddNextPage implements Action {
    readonly type = PaginationActionTypes.ADD_NEXT_PAGE;
    constructor(public payload: {itemsIDs: string[]}) {}
}

export type PaginationActions = AddItem | AddItems | AddNextPage | AddPage;
export type PaginatedState = Map<number, string>;
const initialState = Map<number, string>();

export function paginationReducer(state: PaginatedState = initialState, action: PaginationActions): PaginatedState {
    switch (action.type) {
        case PaginationActionTypes.ADD_ITEM:
            return state.set(action.payload.itemPosition, action.payload.itemID);
        case PaginationActionTypes.ADD_ITEMS:
            return state.merge(action.payload.items);
        case PaginationActionTypes.ADD_NEXT_PAGE:
            // let startCount: number = state.findLastKey(x => true)
            const startCount = getMaxKey(state);
            const map: PaginatedState = action.payload.itemsIDs.reduce( (pv: PaginatedState, cv, i) =>
                                                                                pv.set(i + startCount + 1, cv), initialState);
            return state.merge( map );
        case PaginationActionTypes.ADD_PAGE:
            const pageData = action.payload.pageData;
            const start = pageData.start ? state.keyOf(pageData.start.id) + 1 : 0;
            const startIndex = start * pageData.count;
            return state.merge(action.payload.itemIDs.reduce((pv: PaginatedState, cv, i) => pv.set( startIndex + i , cv), initialState));
        default:
            return state;
    }
}

// A selector creator
// @args:
//  -A selector that returns a Pagination (page: number, count: number)
//  -A selector that returns a PaginatedState which is just a map<number, string>
// returns the list of strings which are in the correct page
export function createPageAndCountSelector( getPagination: MemoizedSelector<object, Pagination>,
                                            getPagedData: MemoizedSelector<object, PaginatedState>): MemoizedSelector<object, string[]> {
    return createSelector(getPagedData , getPagination,
        (data, pagination) => data  .mapKeys(key => key - (pagination.count * (pagination.page - 1)))
                                    .filter((val, key) => key > 0 && key <= pagination.count)
                                    .toArray()
        );
    }

export function selectLastItemID(getPagedData: MemoizedSelector<object, PaginatedState>): MemoizedSelector<object, string> {
    return createSelector(getPagedData, data => data.get(getMaxKey(data)));
}

function getMaxKey(map: Map<number, string>): number {
    return map.keySeq().reduce((a, b) => b > a ? b : a, 0); // change 0 to -1 for an start index of 0 in the map
}
