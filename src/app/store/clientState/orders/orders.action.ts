import { Action } from '@ngrx/store';
import { Order, OrderStatus } from '../../../domain/data/models/order.model';



export enum OrdersActionTypes {
    ADD = '[Orders] Add',
    REMOVE_ONE = '[Orders] Remove one',
    REMOVE_ALL = '[Orders] Remove all',
    CLEAR = '[Orders] Clear',
    SET_TABLE = '[Orders] Set table',
    SET_RESTAURANT = '[Orders] Set restaurant',
    PURCHASE = '[Orders] Purchase',
    GET_MY_ORDERS = '[Orders] Get my orders',
    GET_RESTAURANT_ORDERS = '[Orders] Get restaurant orders',
    NEXT_ORDER_STATUS = '[Orders] Next order status',
    PREVIOUS_ORDER_STATUS = '[Orders] Previous order status'
}

export class AddOrder implements Action {
    readonly type = OrdersActionTypes.ADD;
    constructor(public payload: {dishID: string}) {}
}

// what should this input, an order, an id, an index?
export class RemoveOneOrder implements Action {
    readonly type = OrdersActionTypes.REMOVE_ONE;
    constructor(public payload: {dishID: string}) {}
}

export class RemoveAll implements Action {
    readonly type = OrdersActionTypes.REMOVE_ALL;
    constructor(public payload: {dishID: string}) {}
}

export class Clear implements Action {
    readonly type = OrdersActionTypes.CLEAR;
}

export class PurchaseOrders implements Action {
    readonly type = OrdersActionTypes.PURCHASE;
    // constructor(public payload: {order: Order}) {}
}

export class SetTable implements Action {
    readonly type = OrdersActionTypes.SET_TABLE;
    constructor(public payload: {table: string}) {}
}

export class SetRestaurant implements Action {
    readonly type = OrdersActionTypes.SET_RESTAURANT;
    constructor(public payload: {restaurantID: string}) {}
}

export class GetMyOrders implements Action {
    readonly type = OrdersActionTypes.GET_MY_ORDERS;
}

export class GetRestaurantOrders implements Action {
    readonly type = OrdersActionTypes.GET_RESTAURANT_ORDERS;
}

export class NextOrderStatus implements Action {
    readonly type = OrdersActionTypes.NEXT_ORDER_STATUS;
    constructor(public payload: {orderID: string, status: OrderStatus}) {}
}

export class PreviousOrderStatus implements Action {
    readonly type = OrdersActionTypes.PREVIOUS_ORDER_STATUS;
    constructor(public payload: {orderID: string, status: OrderStatus}) {}
}

export type OrdersActions = AddOrder | RemoveOneOrder | RemoveAll | Clear |
                            PurchaseOrders | SetTable | SetRestaurant |
                            GetMyOrders | GetRestaurantOrders | NextOrderStatus | PreviousOrderStatus;
