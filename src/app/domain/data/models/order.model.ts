export interface Order {
    id: string;
    table: string;
    orderedBy: string;
    dishID: string;
    restaurantID: string;
    timestamp: number;
    status: OrderStatus;
}

export type OrderStatus = 'Pending' | 'Cooking' | 'Cooked';

export function incrementStatus(status: OrderStatus): OrderStatus {
    switch (status) {
        case 'Pending':
            return 'Cooking';
        case 'Cooking':
            return 'Cooked';
        case 'Cooked':
            return 'Cooked';
    }
}

export function decrementStatus(status: OrderStatus): OrderStatus {
    switch (status) {
        case 'Pending':
            return 'Pending';
        case 'Cooking':
            return 'Pending';
        case 'Cooked':
            return 'Cooking';
    }
}

