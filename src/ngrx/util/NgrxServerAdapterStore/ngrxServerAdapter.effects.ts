import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { NgrxServerWrapperImp } from '../NgrxDatastore';
import { SACreate, SADelete, SAQuery, SAQueryWithRelations,
        SARead, SAReadAllChildren, SAUpdate, ServerAdapterActionTypes } from './ngrxServerAdapter.actions';

@Injectable()
export class ServerAdapterEffects {

    constructor(
        private action$: Actions,
        private serverAdapter: NgrxServerWrapperImp
    ) {}

    @Effect()
    create = this.action$
        .ofType(ServerAdapterActionTypes.CREATE)
        .pipe(
            map((action: SACreate<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.create(payload.resourceName, payload.id, payload.entity))
        );

    @Effect()
    update = this.action$
        .ofType(ServerAdapterActionTypes.UPDATE)
        .pipe(
            map((action: SAUpdate<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.update(payload.resourceName, payload.id, payload.updatedEntity))
        );

    @Effect()
    delete = this.action$
        .ofType(ServerAdapterActionTypes.DELETE)
        .pipe(
            map((action: SADelete<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.delete(payload.resourceName, payload.id))
        );

    @Effect()
    read = this.action$
        .ofType(ServerAdapterActionTypes.READ)
        .pipe(
            map((action: SARead<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.read(payload.resourceName, payload.id))
        );

    @Effect()
    query = this.action$
        .ofType(ServerAdapterActionTypes.QUERY)
        .pipe(
            map((action: SAQuery<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.query(payload.resourceName, payload.filters, payload.order, payload.page))
        );

    @Effect()
    queryWithRelations = this.action$
        .ofType(ServerAdapterActionTypes.QUERY_WITH_RELATIONS)
        .pipe(
            map((action: SAQueryWithRelations<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.queryWithRelations(
                payload.resourceName, payload.filters, payload.order, payload.page, payload.children, payload.schema))
        );

    @Effect()
    readAllChildren = this.action$
        .ofType(ServerAdapterActionTypes.READ_ALL_CHILDREN)
        .pipe(
            map((action: SAReadAllChildren<any>) => action.payload),
            mergeMap(payload => this.serverAdapter.readAllChildren(payload.resourceName, payload.id, payload.schema))
        );

}
