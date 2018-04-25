import { firestore } from 'firebase/app';

export interface Restaurant {
    id: string;
    name: string;
    type: string;
    description: string;
    picture: string;
    location: firestore.GeoPoint;
    owner: string;
}

