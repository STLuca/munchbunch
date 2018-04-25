
export interface RestaurantSearchState {
    radius: number;
    location: {lat: number, lng: number};
    results: Array<{restaurantID: string, distance: number}>;
    filter: string;
}

export const restaurantSearchInitialState: RestaurantSearchState = {
    radius: 3,
    location: {lat: 51.50361379162682, lng: -0.1318359375},
    results: [],
    filter: ''
};
