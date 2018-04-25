import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Order } from '../../../domain/data/models/order.model';
import { uid } from '../../../firebase-auth/store/auth.reducer';
import { OrdersActions, OrdersActionTypes } from './orders.action';
import { initialOrdersState, MyOrderState } from './orders.state';


export function ordersReducer(state: MyOrderState = initialOrdersState, action: OrdersActions): MyOrderState {
    switch (action.type) {
        case OrdersActionTypes.ADD:
            return {
                ...state,
                dishesToOrder: [...state.dishesToOrder, action.payload.dishID]
            };
        case OrdersActionTypes.REMOVE_ONE:
            const index = state.dishesToOrder.findIndex(x => x === action.payload.dishID);
            return {
                ...state,
                dishesToOrder: [
                    ...state.dishesToOrder.slice(0, index),
                    ...state.dishesToOrder.slice(index + 1)
                ]
            };
        case OrdersActionTypes.REMOVE_ALL:
            return {
                ...state,
                dishesToOrder: state.dishesToOrder.filter(id => id !== action.payload.dishID)
            };
        case OrdersActionTypes.CLEAR:
            return {
                ...state,
                dishesToOrder: [],
                purchasing: false
            };
        case OrdersActionTypes.SET_TABLE:
            return {
                ...state,
                table: action.payload.table
            };
        case OrdersActionTypes.SET_RESTAURANT:
            return {
                ...state,
                restaurantID: action.payload.restaurantID,
                dishesToOrder: []
            };
        case OrdersActionTypes.PURCHASE:
            return {
                ...state,
                purchasing: true
            };
        default:
            return state;
    }
}


