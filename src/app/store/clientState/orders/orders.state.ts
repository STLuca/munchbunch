import { Order } from '../../../domain/data/models/order.model';

export interface MyOrderState {
    dishesToOrder: string[];
    table: string;
    restaurantID: string;
    purchasing: boolean;
}

export const initialOrdersState: MyOrderState = {
    dishesToOrder: [],
    table: '',
    restaurantID: '',
    purchasing: false
};
