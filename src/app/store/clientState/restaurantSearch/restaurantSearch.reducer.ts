import { createFeatureSelector } from '@ngrx/store';
import { SearchActions, SearchActionTypes } from './restaurantSearch.action';
import { restaurantSearchInitialState, RestaurantSearchState } from './restaurantSearch.state';



export function searchReducer(state: RestaurantSearchState = restaurantSearchInitialState, action: SearchActions): RestaurantSearchState {
    switch (action.type) {
        case SearchActionTypes.SET_LOCATION:
            return {
                ...state,
                location: {lat: action.payload.location.lat, lng: action.payload.location.lng},
                results: []
            };
        case SearchActionTypes.SET_RADIUS:
            return {
                ...state,
                radius: action.payload.radius / 1,
                results: []
            };
        case SearchActionTypes.SET_FILTER:
            return {
                ...state,
                filter: action.payload.filter
            };
        /*case SearchActionTypes.ADD_RESULTS:
            return {
                ...state,
                results: action.payload.results
            }
        */
       case SearchActionTypes.ADD_RESTAURANT:
            return {
                ...state,
                results: [...state.results, {restaurantID: action.payload.restaurantID, distance: action.payload.distance}]
            };
        default:
            return state;
    }
}

export const selectSearchState = createFeatureSelector<RestaurantSearchState>('search');

