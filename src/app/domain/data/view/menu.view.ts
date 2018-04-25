import { Dish } from '../models/dish.model';
import { Menu } from '../models/menu.model';
import { dishModelToView, DishView } from './dish.view';

export interface MenuView {
    id: string;
    name: string;
    dishes: DishView[];
    description: string;
}

export function menuModelToView(menu: Menu, dishes: Dish[]): MenuView {
    return {

        id: menu.id,
        name: menu.name,
        description: menu.description,
        dishes: dishes.filter(dish => dish.menuID === menu.id)
                      .map( dish => dishModelToView(dish, [])) || []
    };
}
