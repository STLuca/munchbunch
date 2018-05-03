import { InjectionToken } from '@angular/core';
import { ActionReducerMap, combineReducers, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';
import 'rxjs/add/operator/map';
import { restaurantModelToView, RestaurantView } from '../view/restaurant.view';
import { userModelToView, UserView } from '../view/user.view';

import { uid as selectUid } from '../../../firebase-auth/store/auth.reducer';
import { dishModelToView } from '../view/dish.view';

import { selectDiningAtRestaurantID, selectOrdersList, selectOrdersState } from '../../../store/clientState/orders/orders.selectors';


import { EntityState } from '@ngrx/entity';
import { firestore } from 'firebase/app';
import { createSelectorGetEntityList, createSelectorGetEntityMap } from '../../../../ngrx/reducers/Entity.reducer';
import { selectSearchState } from '../../../store/clientState/restaurantSearch/restaurantSearch.reducer';
import { getRouterState } from '../../../store/router/router';
import { Comment } from '../models/comment.model';
import { Dish } from '../models/dish.model';
import { Menu } from '../models/menu.model';
import { Order } from '../models/order.model';
import { Purchase } from '../models/purchase.model';
import { Restaurant } from '../models/restaurant.model';
import { User } from '../models/user.model';
import { orderModelToView } from '../view/order.view';

export interface DBState {
    users: EntityState<User>;
    restaurants: EntityState<Restaurant>;
    menus: EntityState<Menu>;
    dishes: EntityState<Dish>;
    orders: EntityState<Order>;
    dishComments: EntityState<Comment>;
    restaurantComments: EntityState<Comment>;
    purchases: EntityState<Purchase>;
}

export const getDBstate = createFeatureSelector<DBState>('database');

export const getUsers = createSelector(getDBstate, state => state['users']);
export const getRestaurants = createSelector(getDBstate, state => state['restaurants']);
export const getMenus = createSelector(getDBstate, state => state['menus']);
export const getDishes = createSelector(getDBstate, state => state['dishes']);
export const getOrders = createSelector(getDBstate, state => state['orders']);
export const getDishComments = createSelector(getDBstate, state => state['dishComments']);
export const getRestaurantComments = createSelector(getDBstate, state => state['restaurantComments']);
export const getPurchases = createSelector(getDBstate, state => state['purchases']);

export const getUserEntities = createSelectorGetEntityMap(getUsers);
export const getRestaurantEntities = createSelectorGetEntityMap(getRestaurants);
export const getMenuEntities = createSelectorGetEntityMap(getMenus);
export const getDishEntities = createSelectorGetEntityMap(getDishes);
export const getOrderEntities = createSelectorGetEntityMap(getOrders);
export const getDishCommentEntities = createSelectorGetEntityMap(getDishComments);
export const getRestaurantCommentEntities = createSelectorGetEntityMap(getRestaurantComments);
export const getPurchaseEntities = createSelectorGetEntityMap(getPurchases);

export const getAllUsers = createSelectorGetEntityList(getUsers);
export const getAllRestaurants = createSelectorGetEntityList(getRestaurants);
export const getAllMenus = createSelectorGetEntityList(getMenus);
export const getAllDishes = createSelectorGetEntityList(getDishes);
export const getAllOrders = createSelectorGetEntityList(getOrders);


export const getUserView = createSelector(getAllUsers, getAllRestaurants,
    (users, restaurants) => users.map( user => userModelToView(user, restaurants, [], [])
    )
);

export const getRestaurantIds = createSelector(getRestaurants, state => state.ids as string[] );

export const getUserddd = createSelector(getAllUsers, getAllRestaurants,
    (users, restaurants) => users
);

export const selectCurrentUser = createSelector(
        getUserEntities, selectUid, (users, uid) =>
            users[uid]

);

export const selectCurrentUserRestaurants = createSelector(
    getAllRestaurants, getAllMenus, getAllDishes, selectUid, (restaurants, menus, dishes, uid) =>
        restaurants.filter(restaurant => restaurant.owner === uid)
                    .map(restaurant => restaurantModelToView(restaurant, menus, dishes))


);

export const selectUniqueOrderedDishes = createSelector(
    selectOrdersList, orders => orders.filter((v, i, a) => a.indexOf(v) === i).sort( (a, b) => {
        if (a < b) {return -1; }
        if (a > b) {return 1; }
        return 0;
    })
);

export const selectMyOrders = createSelector(
    getDishEntities, selectOrdersList, selectUniqueOrderedDishes, (dishes, myOrders, uniqueOrders) =>
        uniqueOrders.map( dishID => {
                            return {
                            dish: dishes[dishID],
                            quantity: myOrders.filter(y => y === dishID).length
                            };
                    })
                );

export const selectOrdersPrice = createSelector(
    getDishEntities, selectOrdersList, (dishes, myOrders) =>
        '£' + myOrders.map(dishID => dishes[dishID].price).reduce( (curr, acc) => curr + acc, 0).toFixed(2)
);


export const getRestaurantsInArea = createSelector(
    getAllRestaurants, selectSearchState,  getAllMenus, getAllDishes, (restaurants, searchState, menus, dishes) =>
        restaurants.filter(restaurant => compareGeoPoint(
            {lat: searchState.location.lat, lng: searchState.location.lng},
            restaurant.location,
            searchState.radius
        ))
        .map( restaurant => restaurantModelToView(restaurant, menus, dishes))
);

export const getSelectStateSomething = createSelector(
    selectSearchState, state => state.location
);

function compareGeoPoint(me: {lat: number, lng: number}, restaurant: firestore.GeoPoint, radius: number): boolean {
    const x = 1 / 111;
    const lradius = radius * x;
    const latDistance = Math.abs(me.lat - restaurant.latitude);
    const lngDistance = Math.abs(me.lng - restaurant.longitude);
    return  latDistance < lradius && lngDistance < lradius;
}


export const getRoutedRestaurantOrders = createSelector(
    getRouterState, getAllOrders, getRestaurantEntities, getDishEntities, (route, orders, restaurants, dishes) =>
        orders
            .filter(order => order.restaurantID === route.state.params.restaurantID)
            .filter(order => order.timestamp > Date.now() - (3 * 3600 * 1000))
            .map(order => orderModelToView(order, restaurants, dishes))
);

export const getMyCurrentOrders = createSelector(
    getAllOrders, selectUid, getRestaurantEntities, getDishEntities, (orders, uid, restaurants, dishes) =>
        orders.filter(order => order.orderedBy === uid)
                .filter(order => order.timestamp > Date.now() - (3 * 3600 * 1000))
                .map(order => orderModelToView(order, restaurants, dishes))

);

export const selectRoutedUser = createSelector(
    getRouterState, getUserEntities, getAllRestaurants, getAllMenus, getAllDishes, (route, users, restaurants, menus, dishes) =>
        userModelToView(users[route.state.params.userID], restaurants, menus, dishes)
);

export const selectRoutedRestaurant = createSelector(
    getRouterState, getRestaurantEntities, getAllMenus, getAllDishes, (route, restaurants, menus, dishes) =>
        restaurantModelToView(restaurants[route.state.params.restaurantID], menus, dishes)
);

export const selectRoutedRestaurantID = createSelector(getRouterState, route => route.state.params.restaurantID);

export const selectRoutedUserID = createSelector(
    getRouterState, (route) => route.state.params.userID
);

export const selectCurentLocation = createSelector(selectSearchState, searchState => searchState.location);

export const selectRestaurantSearchResults = createSelector(
    selectSearchState, getRestaurantEntities, (searchState, restaurants) =>
        searchState.results.map(x => ({restaurant: restaurantModelToView(restaurants[x.restaurantID], [], []), distance: x.distance }))
        .filter(x => x.restaurant.type.includes(searchState.filter))
);

export const selectLoggedInUser = createSelector(
    selectUid, getUserEntities, (uid, users) => userModelToView(users[uid], [], [], []) || null
);

export const selectLoggedInUsersRestaurantsIds = createSelector(
    selectUid, getAllRestaurants, (uid, restaurants) => restaurants.filter(restaurant => restaurant.owner === uid)
                                                                .map(restaurant => restaurant.id)
);

export const selectCurrentOrder = createSelector(selectMyOrders , selectOrdersState, selectUid, (orders, clientState, uid) =>
    orders.map(order => {
        const aOrder: Order = {
            id: null,
            table: clientState.table,
            orderedBy: uid,
            dishID: order.dish.id,
            restaurantID: clientState.restaurantID,
            timestamp: Date.now(),
            status: 'Pending'
        };
        return aOrder;
    })

);

export const selectOrderListAsOrders = createSelector(selectOrdersList, selectOrdersState, selectUid,
    (orders, clientState, uid) =>
        orders.map(orderID => {
            const aOrder: Order = {
                id: null,
                table: clientState.table,
                orderedBy: uid,
                dishID: orderID,
                restaurantID: clientState.restaurantID,
                timestamp: 0,
                status: 'Pending'
            };
            return aOrder;
        })
);

export const selectDiningAtRestaurantView = createSelector(selectDiningAtRestaurantID, getRestaurantEntities,
     (restaurantID, restaurants) => restaurantModelToView(restaurants[restaurantID], [], []));

export const validDishes = createSelector(selectDiningAtRestaurantID, getAllMenus, getAllDishes,
(restaurantID, menus, dishes) => {
    const menuIDs = menus.filter(menu => menu.restaurantId === restaurantID).map(menu => menu.id);
    return dishes.filter(dish => menuIDs.includes(dish.menuID)).map(dish => dish.id);
});

export const selectDiningRestaurantMenus = createSelector(selectDiningAtRestaurantID, getAllMenus, (restID, menus) =>
    menus
    .filter(menu => menu.restaurantId === restID)
    .map(menu => menu.id));
