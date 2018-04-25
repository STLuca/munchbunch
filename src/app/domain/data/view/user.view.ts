import { Dish } from '../models/dish.model';
import { Menu } from '../models/menu.model';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';
import { OrderView } from './order.view';
import { restaurantModelToView, RestaurantView } from './restaurant.view';

export interface UserView {
    id: string;
    name: string;
    pictureUrl: string;
    restaurants: RestaurantView[];
    orders: OrderView[];
}

export function userModelToView(user: User, restaurants: Restaurant[],  menus: Menu[], dishes: Dish[]): UserView {
    if (user == null) {
        return null;
    }
    return {
        id: user.id,
        name: user.name,
        pictureUrl: user.pictureUrl,
        restaurants: restaurants.filter(restaurant => restaurant.owner === user.id)
                                .map(restaurant => restaurantModelToView(restaurant, menus, dishes)),
        orders: [] // TODO:
    };
}
