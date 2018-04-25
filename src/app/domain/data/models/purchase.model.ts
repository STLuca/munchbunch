export interface Purchase {
    id: string;
    username: string;
    restaurantName: string;
    userID: string;
    restaurantID: string;
    start: number;
    finish: number;
    price: number;
    orders: Array<{dishName: string, price: number}>;
}
