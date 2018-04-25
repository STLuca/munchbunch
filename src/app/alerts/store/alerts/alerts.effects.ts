import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class AlertEffects {

    constructor(
        private actions$: Actions,
        private store: Store<any>
    ) {
        // this.ordersRef = afs.collection('orders');
    }


    /*

    @Effect()
    purchaseOrders = this.actions$
        .ofType(OrdersActionTypes.PURCHASE)
        .switchMap( () => this.store.select(selectOrdersList).take(1))
        .switchMap( orders =>
            fromPromise(this.afs.firestore.runTransaction(transaction =>
                transaction.set(this.ordersRef, {...orders})))
            )
    */

}
