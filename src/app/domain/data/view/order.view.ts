import { Dictionary } from '@ngrx/entity/src/models';
import { Dish } from '../models/dish.model';
import { Order, OrderStatus } from '../models/order.model';
import { Restaurant } from '../models/restaurant.model';
import { dishModelToView, DishView } from './dish.view';
import { restaurantModelToView, RestaurantView } from './restaurant.view';

export interface OrderView {
    id: string;
    table: string;
    restaurant: RestaurantView;
    dish: DishView;
    status: OrderStatus;
    timestamp: number;
}

export function orderModelToView(order: Order, restaurants: Dictionary<Restaurant>, dishes: Dictionary<Dish>): OrderView {
    return {
        id: order.id,
        table: order.table,
        restaurant: restaurantModelToView(restaurants[order.restaurantID], [], []),
        dish: dishModelToView(dishes[order.dishID], []),
        status: order.status,
        timestamp: order.timestamp
    };
}
