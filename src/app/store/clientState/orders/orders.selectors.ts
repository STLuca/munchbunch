import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Order } from '../../../domain/data/models/order.model';
import { uid as selectUid } from '../../../firebase-auth/store/auth.reducer';
import { MyOrderState } from './orders.state';




export const selectOrdersState = createFeatureSelector<MyOrderState>('orders');
export const selectOrdersList = createSelector(selectOrdersState, state => state.dishesToOrder);

// export const selectPurchasingFlag = createSelector(selectOrdersState, state => state.purchasing)
export const selectDiningAtRestaurantID = createSelector(selectOrdersState, state => state.restaurantID);
export const selectDiningAtTable = createSelector(selectOrdersState, state => state.table);
// export const selectCurrentlyDining = createSelector(selectOrdersState, state => !!state.restaurantID && !!state.table)
export const selectValidToPurchase = createSelector(selectOrdersState, selectUid, (state, uid) =>
    !state.purchasing && state.restaurantID !== '' && state.table !== '' && state.dishesToOrder.length > 0 && !!uid
);

