import { firestore } from 'firebase/app';
import { Dish } from '../models/dish.model';
import { Menu } from '../models/menu.model';
import { Restaurant } from '../models/restaurant.model';
import { CommentView } from './comment.view';
import { menuModelToView, MenuView } from './menu.view';
import { UserView } from './user.view';

export interface RestaurantView {
    id: string;
    name: string;
    type: string;
    picture: string;
    description: string;
    location: firestore.GeoPoint; // {lat: number, lng: number},
    owner: string;
    menus: MenuView[];
    comments: CommentView[];
}

export const emptyRestaurant: RestaurantView = {
    id: '',
    name: 'undefined',
    type: '',
    picture: '',
    location: new firestore.GeoPoint(0, 0),
    description: '',
    owner: '',
    menus: [],
    comments: []
};

export function restaurantModelToView(restaurant: Restaurant, menus: Menu[], dishes: Dish[]): RestaurantView {
    if (restaurant == null) {return emptyRestaurant; }
    return {
        // ...restaurant,
        id: restaurant.id,
        name: restaurant.name,
        type: restaurant.type,
        picture: restaurant.picture,
        description: restaurant.description,
        location: restaurant.location,
        owner: restaurant.owner,
        menus: menus.filter(menu => menu.restaurantId === restaurant.id)
                    .map(menu => menuModelToView(menu, dishes)) || [],
        comments: [] // TODO
    };
}



/*
export class RestaurantView implements IRestaurantView {
    constructor(
        public name: string,
        public type: string,
        public picture: string,
        public description: string,
        public location: string,
        public owner: UserView,
        public menus: MenuView[]
    ) {}
}

export function restaurantModelToBasicView(restaurant: Restaurant): RestaurantView {
    return {
        id: restaurant.id,
        name: restaurant.name,
        type: restaurant.type,
        picture: restaurant.picture,
        description: restaurant.description,
        location: restaurant.location,
        menus: []
    }
}
*/
