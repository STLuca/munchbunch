import * as fromRouter from '@ngrx/router-store';
import { combineReducers, createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ActionReducer, ActionReducerMap } from '@ngrx/store/src/models';
import { ordersReducer } from './clientState/orders/orders.reducer';
import { MyOrderState } from './clientState/orders/orders.state';
import { searchReducer } from './clientState/restaurantSearch/restaurantSearch.reducer';
import { RestaurantSearchState } from './clientState/restaurantSearch/restaurantSearch.state';
import { RouterStateUrl } from './router/router';

import { EntityState } from '@ngrx/entity';
import {
    createFilteredOrderingSelector,
    filteredOrderingReducer,
    FilteredOrderingState } from '../../ngrx/reducers/FilteredOrderingReducer';
import { namedReducer } from '../../ngrx/reducers/FilteredReducer';
import { createOrderSelector } from '../../ngrx/reducers/OrderedPaginationReducer';
import { Purchase } from '../domain/data/models/purchase.model';
import { User } from '../domain/data/models/user.model';
import {
    getAllUsers,
    getDishCommentEntities,
    getDishEntities,
    getOrderEntities,
    getPurchaseEntities,
    getRestaurantCommentEntities,
    getRestaurantEntities,
    getUserEntities } from '../domain/data/store';
import { commentModelToView } from '../domain/data/view/comment.view';
import { orderModelToView } from '../domain/data/view/order.view';
import { authReducer } from '../firebase-auth/store/auth.reducer';
import { AuthState } from '../firebase-auth/store/auth.state';
import { QueryState, queryStateReducer } from './clientState/QueryState/queryState.reducer';

export interface ClientState {
    queryState: QueryState<any>;
    orders: MyOrderState;
    search: RestaurantSearchState;
    router: fromRouter.RouterReducerState<RouterStateUrl>;
    auth: AuthState;
    queryPagination: FilteredOrderingState<any>;
}

export interface PaginationQueryState {
    dishComments: QueryState<any>;
    restaurantComments: QueryState<any>;
    purchases: QueryState<any>;
}

export const dishCommentsReducer = namedReducer('dishComments')(queryStateReducer);

export const paginationStateReducer: ActionReducerMap<any> = {
    // namedReducer(name)(entityReducer(createEntityAdapter<T>()))
    dishComments: dishCommentsReducer,
    restaurantComments: namedReducer('restaurantComments')(queryStateReducer),
    purchases: namedReducer('purchases')(queryStateReducer)
};

export const reducers: ActionReducerMap<ClientState> = {
    queryState: queryStateReducer,
    orders: ordersReducer,
    search: searchReducer,
    router: fromRouter.routerReducer,
    auth: authReducer,
    queryPagination: filteredOrderingReducer


};

export const selectQueryState = createFeatureSelector<QueryState<any>>('queryState');
export const selectFilters = createSelector(selectQueryState, state => state.data.filters);
export const selectOrderings = createSelector(selectQueryState, state => state.data.orders);

export const selectPagination = createFeatureSelector<FilteredOrderingState<any>>('queryPagination');


export const selectCurrentFilteredState = createFilteredOrderingSelector(selectPagination, selectFilters);
export const selectCurrentOrderedState = createOrderSelector(selectCurrentFilteredState, selectOrderings);
export const selectPagedIDs = createSelector(selectQueryState, selectCurrentOrderedState, (qs, os) => {
    return Array(qs.data.page.pageSize).fill(1)
        .map( (x, i) => (qs.data.page.pageSize * (qs.data.page.pageIndex - 1) + i))
        .map(x => os.get(x) || null)
        .filter(x => x != null);
}
    );


export const selectLastIDInPreviousPage = createSelector(selectQueryState, selectCurrentOrderedState, (qs, os) => {
        return os.get((qs.data.page.pageSize * (qs.data.page.pageIndex - 1) - 1));
    }

);

export const selectPaginationQueryState = createFeatureSelector('paginationQueryState');
function createQueryStateSelector(name: string): MemoizedSelector<object, QueryState<any>> {
    return createSelector(selectPaginationQueryState, state => state[name]);
}

function createQueriedIDsSelector(
    selectQueryState: MemoizedSelector<object, QueryState<any>>,
    selectPaginationState: MemoizedSelector<object, FilteredOrderingState<any>>):
         { queriedIDsSelector: MemoizedSelector<object, string[]>,
            lastIDSelector: MemoizedSelector<object, string>
         } {
        const selectFilters = createSelector(selectQueryState, state => state.data.filters);
        const selectOrderings = createSelector(selectQueryState, state => state.data.orders);
        const selectCurrentFilteredState = createFilteredOrderingSelector(selectPaginationState, selectFilters);
        const selectCurrentOrderedState = createOrderSelector(selectCurrentFilteredState, selectOrderings);
        return {
            queriedIDsSelector: createSelector(selectQueryState, selectCurrentOrderedState, (qs, os) =>
                Array(qs.data.page.pageSize).fill(1)
                    .map( (x, i) => (qs.data.page.pageSize * (qs.data.page.pageIndex - 1) + i))
                    .map( x => os.get(x) || null)
                    .filter(x => x != null)
                ),
            lastIDSelector: createSelector(selectQueryState, selectCurrentOrderedState, (qs, os) => {
                return os.get((qs.data.page.pageSize * (qs.data.page.pageIndex - 1) - 1));
            }

            )
        };
}


export const {
    queriedIDsSelector: selectCurrentDishCommentIDs,
    lastIDSelector: selectLastIDDishComments
} = createQueriedIDsSelector(createQueryStateSelector('dishComments'), selectPagination);
export const selectCurrentDishCommentViews = createSelector(selectCurrentDishCommentIDs, getDishCommentEntities, getAllUsers,
        (ids, dishComments, users) =>
            ids.map(id => dishComments[id] || null)
                .filter(comment => !!comment)
                .map(comment => commentModelToView(comment, users))
);

export const {
    queriedIDsSelector: selectCurrentRestaurantCommentIDs,
    lastIDSelector: selectLastIDRestaurantComments
} = createQueriedIDsSelector(createQueryStateSelector('restaurantComments'), selectPagination);

export const selectCurrentRestaurantCommentViews =
    createSelector(selectCurrentRestaurantCommentIDs, getRestaurantCommentEntities, getAllUsers,
        (ids, restaurantComments, users) =>
            ids.map(id => restaurantComments[id] || null)
                .filter(comment => !!comment)
                .map(comment => commentModelToView(comment, users))
);

export const {
    queriedIDsSelector: selectCurrentPurchaseIDs,
    lastIDSelector: selectLastIDPurchase
} = createQueriedIDsSelector(createQueryStateSelector('purchases'), selectPagination);
export const selectCurrentPurchaseViews = createSelector(selectCurrentPurchaseIDs, getPurchaseEntities,
        (ids, purchases) => ids.map(id => purchases[id])
                                .map(purchase => {
                                        return {
                                            ...purchase,
                                            orders: purchase.orders.sort((prev, next) => prev.dishName > next.dishName ? 1 : -1)
                                        };
                                    }
                                )
);
