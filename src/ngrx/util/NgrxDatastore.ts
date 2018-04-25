import { Action } from '@ngrx/store';
import { BasicServer, FirestorePagination, Ordering, QueryFilter, RelationOptions } from './BasicServer';

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Map } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { Create, CreateMany, Delete, Update } from '../reducers/Entity.reducer';
import { createFilteredOrderingAction } from '../reducers/FilteredOrderingReducer';
import { namedAction } from '../reducers/FilteredReducer';
import { createOrderedAction } from '../reducers/OrderedPaginationReducer';
import { AddItems, AddNextPage, AddPage } from '../reducers/pagination.reducer';
import { FirestoreServer } from './FirestoreServer';
import { Schema, TableName } from './schema';

export interface NgrxServerWrapper {

    create: <T>(resourceName: string, id: string, entity: T) => Observable<Action>;
    update: <T>(resourceName: string, id: string, updatedEntity: Partial<T>) => Observable<Action>;
    delete: <T>(resourceName: string, id: string) => Observable<Action>;

    read: <T>(resourceName: string, id: string) => Observable<Action>;
    query: <T>(
        resourceName: string, filters: Array<QueryFilter<T>>, order: Array<Ordering<T>>, page: FirestorePagination) => Observable<Action>;
    queryWithRelations: <T>(
        resourceName: string, filters: Array<QueryFilter<T>>, order: Array<Ordering<T>>,
        page: FirestorePagination, children: RelationOptions, schema: Schema) => Observable<Action>;
}

@Injectable()
export class NgrxServerWrapperImp implements NgrxServerWrapper {

    private server: BasicServer = new FirestoreServer(this.afs);

    constructor(
        private afs: AngularFirestore,
    ) {}

    create<T>(resourceName: string, id: string, entity: T): Observable<Action> {
        return this.server.create(resourceName, id, entity)
            .pipe(
                filter(newEntity => !!newEntity),
                map(newEntity => namedAction(resourceName, new Create<T>({entity})))
            );
    }

    update<T>(resourceName: string, id: string, updatedEntity: Partial<T>): Observable<Action> {
        return this.server.update(resourceName, id, updatedEntity)
            .pipe(
                map( entity => namedAction(resourceName, new Update<T>({id, entity})))
            );
    }

    delete<T>(resourceName: string, id: string): Observable<Action> {
        return this.server.delete(resourceName, id)
            .pipe(
                map( deleteId => namedAction(resourceName, new Delete({id: deleteId})))
            );
    }

    read<T>(resourceName: string, id: string): Observable<Action> {
        return this.server.read<T>(resourceName, id)
            .filter(entity => !!entity)
            .map(entity => namedAction(resourceName, new Create<T>({entity})));
    }

    // TODO: Change from add next page to add items
    // need to create a map (immutablejs map) mapping item index to the item, probably using the pagination
    query<T>(
        resourceName: string, filters: Array<QueryFilter<T>>, orders: Array<Ordering<T>>,
        pagination: FirestorePagination): Observable<Action> {
        return this.server.query(resourceName, filters, orders, pagination)
            .pipe(
                mergeMap(entities =>
                    [namedAction(resourceName, new CreateMany<T>({entities})),
                    createFilteredOrderingAction<T>(
                        filters, createOrderedAction(orders, new AddPage({itemIDs: entities.map(entity => entity['id']),
                                                                                                      pageData: pagination})))
                    ])
            );

    }

    queryWithRelations<T>(
        resourceName: TableName, filters: Array<QueryFilter<T>>, orders: Array<Ordering<T>>,
        pagination: FirestorePagination, relations: RelationOptions, schema: Schema): Observable<Action> {
        return this.server.query(resourceName, filters, orders, pagination)
        .pipe( mergeMap(entities =>
            [
                of(namedAction(resourceName, new CreateMany<T>({entities}))),
                of(createFilteredOrderingAction<T>(
                    filters, createOrderedAction(orders, new AddPage({itemIDs: entities.map(entity => entity['id']),
                                                                                              pageData: pagination})))),
                from(entities).pipe( mergeMap(entity => {
                    if (relations === 'none') {
                    } else if (relations === 'directC') {
                        return this.readDirectChildren(resourceName, entity['id'], schema);
                    } else if (relations === 'allC') {
                        return this.readAllChildren(resourceName, entity['id'], schema);
                    } else if (relations === 'directP') {
                        return this.readDirectParents(resourceName, entity, schema);
                    }
                }))
            ]
        ),
        mergeMap(x => x));
    }

    readAllChildren (resourceName: TableName, id: string, schema: Schema): Observable<Action> {
        return this.server.readAllChildren(resourceName, id, schema)
                .map(x => namedAction(x.table, new CreateMany({entities: x.entities})));
    }

    readDirectChildren(resourceName: TableName, id: string, schema: Schema): Observable<Action> {
        return this.server.readDirectChildren(resourceName, id, schema)
                .map(x => namedAction(x.table, new CreateMany({entities: x.entities})));
    }

    readDirectParents(resourceName: TableName, entity: any, schema: Schema): Observable<Action> {
        return this.server.readDirectParents(resourceName, entity, schema)
            .map(x => namedAction(x.table, new Create({entity: x.entity})));
    }

    createId(): string {
        return this.server.createId();
    }
}
