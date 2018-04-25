import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Schema, TableName } from './schema';

export interface QueryObject<T> {
    filters: Array<QueryFilter<T>>;
    order: Array<Ordering<T>>;
    page: FirestorePagination;
}

export interface BasicServer {

    create: <T>(resourceName: string, id: string, entity: T) => Observable<T>;
    update: <T>(resourceName: string, id: string, updatedEntity: Partial<T>) => Observable<Partial<T>>;
    delete: <T>(resourceName: string, id: string) => Observable<string>;

    // reads a single entity
    read: <T>(resourceName: string, id: string) => Observable<T>;

    // reads a single entity and all entities that reference it from the schema
    readDirectChildren: (resourceName: TableName, id: string, schema: Schema) => Observable<{table: TableName, entities: any[]}>;
    readAllChildren: (resourceName: TableName, id: string, schema: Schema) => Observable<{table: TableName, entities: any[]}>;
    readDirectParents: (resourceName: TableName, id: string, schema: Schema) => Observable<{table: TableName, entity: any}>;
    query: <T>(
        resourceName: string, filters: Array<QueryFilter<T>>, order: Array<Ordering<T>>, page: FirestorePagination ) => Observable<T[]>;
    createId(): string;
}

export type Comparison = '==' | '<' | '<=' | '>' | '>=';
export const comparisonsArray = ['==', '<', '<=', '>', '>=' ];
export type OrderDirection = 'asc' | 'desc';
export type RelationOptions = 'none' | 'directC' | 'allC' | 'directP';

export function boolToDirection(bool: boolean): OrderDirection {
    return bool ? 'asc' : 'desc';
}

export interface QueryFilter<T> {
    field: keyof T;
    comparison: Comparison;
    value: string;
}

export interface Ordering<T> {
    field: keyof T;
    direction: OrderDirection;
}



export interface FirestorePagination {
    start?: firestore.DocumentSnapshot;
    count: number;
}

