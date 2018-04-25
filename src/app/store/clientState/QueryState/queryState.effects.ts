import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { selectLastIDDishComments, selectLastIDInPreviousPage, selectLastIDPurchase, selectLastIDRestaurantComments } from '../..';
import { NamedAction } from '../../../../ngrx/reducers/FilteredReducer';
import { SAQueryWithRelations } from '../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { mySchema, TableName } from '../../../../ngrx/util/schema';
import { Query, QueryStateActionTypes } from './queryState.reducer';


@Injectable()
export class QueryStateEffects {

    constructor(
        private store: Store<any>,
        private actions$: Actions,
        private afs: AngularFirestore
    ) {}

    lastIDSelectors = {
        dishComments: selectLastIDDishComments,
        restaurantComments: selectLastIDRestaurantComments,
        purchases: selectLastIDPurchase
    };

    @Effect()
    getRestaurantComments: Observable<Action> = this.actions$
        .pipe(
            filter(action => action.type.startsWith('[NAMED: ')),
            map( (action: NamedAction<Action>) => action.payload.action),
            filter( action => action.type === QueryStateActionTypes.SET_QUERY_DATA),
            map( (action: Query<any>) => action.payload),
            switchMap( data => this.store.pipe(
                select(this.lastIDSelectors[data.resourcename]),
                take(1),
                mergeMap(id => id ? this.afs.collection(data.resourcename).doc(id as string).snapshotChanges() : of(null)),
                map(x => new SAQueryWithRelations({
                        resourceName: data.resourcename,
                        filters: data.data.filters,
                        order: data.data.orders,
                        page: {count: data.data.page.pageSize, start: x ? x.payload : null},
                        children: 'directP',
                        schema: mySchema
                    })
                )
        )));

}

/*
this.serverAdapter.queryWithRelations(data.resourcename,
                                                        data.data.filters,
                                                        data.data.orders,
                                                        {count: data.data.page.pageSize, start: x ? x.payload : null},
                                                        'directP',
                                                        mySchema)))
*/
