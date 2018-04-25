import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { Create, Update } from '../../../../ngrx/reducers/Entity.reducer';
import { namedAction } from '../../../../ngrx/reducers/FilteredReducer';
import { NgrxServerWrapperImp } from '../../../../ngrx/util/NgrxDatastore';
import { SACreate } from '../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { decrementStatus, incrementStatus, Order } from '../../../domain/data/models/order.model';
import { selectCurrentOrder, selectOrderListAsOrders, selectRoutedRestaurantID } from '../../../domain/data/store';
import { uid as selectUid } from '../../../firebase-auth/store/auth.reducer';
import { Clear, NextOrderStatus, OrdersActionTypes, PreviousOrderStatus } from './orders.action';


@Injectable()
export class MyOrdersEffects {

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private afs: AngularFirestore,
        private serverAdapter: NgrxServerWrapperImp
    ) {}

    @Effect()
    purchaseOrders = this.actions$
        .ofType(OrdersActionTypes.PURCHASE)
        .pipe(
            switchMap( () =>
            concat(
                this.store.pipe(
                    select(selectOrderListAsOrders),
                    take(1),
                    mergeMap( orders => orders.map(order => {
                                const time = Date.now();
                                return {
                                    ...order,
                                    id: this.serverAdapter.createId(),
                                    timestamp: time
                                };
                            })),
                    map( order => new SACreate<Order>({resourceName: 'orders', id: order.id, entity: order}))),
                    Observable.of(new Clear())
                )
            )
        );

    @Effect()
    currentOrders = this.actions$
        .ofType(OrdersActionTypes.GET_MY_ORDERS)
        .pipe(
            switchMap( () => this.store.pipe(select(selectUid))),
            filter(uid => !!uid),
            switchMap( uid => this.afs.collection<Order>('orders', ref => ref.where('orderedBy', '==', uid)
                        .where('timestamp', '>', Date.now() - (3 * 3600 * 1000)))
                    .stateChanges(['added', 'modified'])
                    .pipe(
                        mergeMap(x => x),
                        map( action => {
                            if (action.type === 'added') {
                                return namedAction('orders', new Create<Order>({entity: action.payload.doc.data() as Order}));
                            } else if (action.type === 'modified') {
                                return namedAction('orders',
                                new Update<Order>({id: action.payload.doc.id, entity: action.payload.doc.data() as Order}));
                            }
                        }))
                    )
        );

    @Effect()
    restaurantOrders = this.actions$
        .ofType(OrdersActionTypes.GET_RESTAURANT_ORDERS)
        .pipe(
            switchMap( () => this.store.pipe(select(selectRoutedRestaurantID))),
            filter(restaurantID => !!restaurantID),
            switchMap( restaurantID => this.afs.collection<Order>('orders', ref => ref.where('restaurantID', '==', restaurantID)
                        .where('timestamp', '>', Date.now() - (3 * 3600 * 1000)))
                        .stateChanges(['added', 'modified'])
                        .pipe(
                            mergeMap(x => x),
                            map( action => {
                                if (action.type === 'added') {
                                    return namedAction('orders', new Create<Order>({entity: action.payload.doc.data() as Order}));
                                } else if (action.type === 'modified') {
                                    return namedAction('orders',
                                    new Update<Order>({id: action.payload.doc.id, entity: action.payload.doc.data() as Order}));
                                }
                            }))
                        )
        );
                    // .mergeMap(x => [x, new AddAlert({alert: 'Orders updated'})]))

    @Effect()
    nextStatus = this.actions$
        .ofType(OrdersActionTypes.NEXT_ORDER_STATUS)
        .pipe(
            map( (action: NextOrderStatus) => action.payload),
            switchMap(payload => this.serverAdapter.update<Order>('orders', payload.orderID, {status: incrementStatus(payload.status)}))
        );

    @Effect()
    previousStatus = this.actions$
        .ofType(OrdersActionTypes.PREVIOUS_ORDER_STATUS)
        .pipe(
            map( (action: PreviousOrderStatus) => action.payload),
            switchMap(payload => this.serverAdapter.update<Order>('orders', payload.orderID, {status: decrementStatus(payload.status)}))
        );


        /*
        @Effect()
    purchaseOrders = this.actions$
        .ofType(OrdersActionTypes.PURCHASE)
        .switchMap( () =>
            Observable.concat(
                this.store.select(selectOrderListAsOrders).take(1)
                            .mergeMap( orders => orders.map(order => {
                                const time = Date.now();
                                return {
                                    ...order,
                                    id: this.serverAdapter.createId(),
                                    timestamp: time
                                };
                            }))
                            .mergeMap( order => this.serverAdapter.create<Order>('orders', order.id, order)),
                            Observable.of(new Clear())));

    @Effect()
    currentOrders = this.actions$
        .ofType(OrdersActionTypes.GET_MY_ORDERS)
        .switchMap( () => this.store.select(selectUid))
        .filter(uid => !!uid)
        .switchMap( uid => this.afs.collection<Order>('orders', ref => ref.where('orderedBy', '==', uid)
                        .where('timestamp', '>', Date.now() - (3 * 3600 * 1000)))
                    .stateChanges(['added', 'modified'])
                    .mergeMap(x => x)
                    .map( action => {
                        if (action.type == 'added'){
                            return namedAction('orders', new Create<Order>({entity: action.payload.doc.data() as Order}));
                        } else if (action.type == 'modified'){
                            return namedAction('orders',
                            new Update<Order>({id: action.payload.doc.id, entity: action.payload.doc.data() as Order}));
                        }
                    }));

    @Effect()
    restaurantOrders = this.actions$
        .ofType(OrdersActionTypes.GET_RESTAURANT_ORDERS)
        .switchMap( () => this.store.select(selectRoutedRestaurantID))
        .filter(restaurantID => !!restaurantID)
        .switchMap( restaurantID => this.afs.collection<Order>('orders', ref => ref.where('restaurantID', '==', restaurantID)
                        .where('timestamp', '>', Date.now() - (3 * 3600 * 1000)))
                    .stateChanges(['added', 'modified'])
                    .mergeMap(x => x)
                    .map( action => {
                        if (action.type == 'added'){
                            return namedAction('orders', new Create<Order>({entity: action.payload.doc.data() as Order}));
                        } else if (action.type == 'modified'){
                            return namedAction('orders',
                            new Update<Order>({id: action.payload.doc.id, entity: action.payload.doc.data() as Order}));
                        }
                    }));
                    //.mergeMap(x => [x, new AddAlert({alert: 'Orders updated'})]))

    @Effect()
    nextStatus = this.actions$
        .ofType(OrdersActionTypes.NEXT_ORDER_STATUS)
        .map( (action: NextOrderStatus) => action.payload)
        .switchMap(payload => this.serverAdapter.update<Order>('orders', payload.orderID, {status: incrementStatus(payload.status)}));

    @Effect()
    previousStatus = this.actions$
        .ofType(OrdersActionTypes.PREVIOUS_ORDER_STATUS)
        .map( (action: PreviousOrderStatus) => action.payload)
        .switchMap(payload => this.serverAdapter.update<Order>('orders', payload.orderID, {status: decrementStatus(payload.status)}));
        */
}



