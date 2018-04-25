import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { firestore } from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { of } from 'rxjs/observable/of';
import { zip } from 'rxjs/observable/zip';
import { concat, filter, map, mergeMap, take } from 'rxjs/operators';
import { BasicServer, FirestorePagination, Ordering, QueryFilter } from './BasicServer';
import { getChildrenRelations, getParentRelations, Schema, TableName } from './schema';

@Injectable()
export class FirestoreServer implements BasicServer {

    constructor(
       private afs: AngularFirestore
    ) {}

    create<T>(resourceName: string, id: string, entity: T): Observable<T> {
        return of(this.afs.collection(resourceName).doc<T>(id).set(entity))
                .pipe(map( () => entity));
    }

    update<T>(resourceName: string, id: string, updatedEntity: Partial<T>): Observable<Partial<T>> {
        return of(this.afs.collection(resourceName).doc<T>(id).update(updatedEntity))
                    .pipe(map( () => updatedEntity));
    }

    delete<T>(resourceName: string, id: string): Observable<string> {
        return of(this.afs.collection(resourceName).doc<T>(id).delete())
                .pipe(map( () => id));
    }

    read<T>(resourceName: string, id: string): Observable<T> {
        return this.afs.collection(resourceName).doc<T>(id).valueChanges()
                .pipe(take(1));
    }

    readDirectChildren (resourceName: TableName, id: string, schema: Schema): Observable<{table: TableName, entities: any[]}> {
        return Observable.of(resourceName)
            .pipe(
                mergeMap(resource => getChildrenRelations(resourceName, schema)),
                mergeMap(relation => zip(
                    Observable.of(relation.foreignTable),
                    this.query(
                        relation.foreignTable,
                        [{field: relation.linkId, comparison: '==', value: id }] as Array<QueryFilter<any>>, [], null))
                .filter(x => x['1'].length !== 0)
                .map(x => ({table: x['0'], entities: x['1']}))
            ));

    }

    readAllChildren (resourceName: TableName, id: string, schema: Schema): Observable<{table: TableName, entities: any[]}> {
        return this.readDirectChildren(resourceName, id, schema)
            .pipe(
                mergeMap(entity =>
                    of(entity).pipe(
                        concat(
                        from(entity.entities).pipe(
                            mergeMap(parentEntity => this.readAllChildren(entity.table, parentEntity['id'], schema)
                        )
                    )
                ))
            ));
    }

    readDirectParents(resourceName: TableName, entity: any, schema: Schema): Observable<{table: TableName, entity: any}> {
        return Observable.of(resourceName)
            .pipe(
                mergeMap(resource => getParentRelations(resourceName, schema)),
                mergeMap(relation => zip(
                    of(relation.foreignTable),
                    this.query(
                        relation.foreignTable,
                        [{field: 'id', comparison: '==', value: entity[relation.linkId] }] as Array<QueryFilter<any>>, [], null))),
                filter(x => x['1'].length !== 0),
                map(x => ({table: x['0'], entity: x['1'][0]}))
            );
    }

    query<T>(resourceName: string, filters: Array<QueryFilter<T>>, orders: Array<Ordering<T>>, page: FirestorePagination): Observable<T[]> {
        return this.afs.collection<T>(
            resourceName, ref => this.addPagination(this.addOrders(this.addFilters(ref, filters), orders), page, resourceName))
            .valueChanges().pipe(take(1));
    }

    createId(): string {
        return this.afs.createId();
    }

    private addFilters<T>(ref: firestore.CollectionReference, filters: Array<QueryFilter<T>>): firestore.Query {
        return filters.reduce( (pv: firestore.CollectionReference , cv) => pv.where(cv.field, cv.comparison, cv.value), ref);
    }

    private addOrders<T>(ref: firestore.Query, orders: Array<Ordering<T>>): firestore.Query {
        return orders.reduce( (pv: firestore.Query, cv) => pv.orderBy(cv.field, cv.direction), ref);
    }

    private addPagination<T>(ref: firestore.Query, pagination: FirestorePagination, resourceName: string): firestore.Query {
        if (pagination) {
            if (pagination.start) {
                return ref.startAfter(pagination.start).limit(pagination.count);
            } else {
                return ref.limit(pagination.count);
            }

        } else {
            return ref;
        }

    }
}
