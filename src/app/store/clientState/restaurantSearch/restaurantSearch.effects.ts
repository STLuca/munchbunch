import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from 'geofire';
import { Observable } from 'rxjs/Observable';
import { delay, switchMap, take, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SARead } from '../../../../ngrx/util/NgrxServerAdapterStore/ngrxServerAdapter.actions';
import { Restaurant } from '../../../domain/data/models/restaurant.model';
import { AddRestaurant, SearchActionTypes } from './restaurantSearch.action';
import { selectSearchState } from './restaurantSearch.reducer';

@Injectable()
export class RestaurantSearchEffects {

    geoFire: GeoFire;
    geoFireQuery;

    constructor(
        private actions$: Actions,
        private store: Store<any>,
        private db: AngularFireDatabase
    ) {
        this.geoFire = new GeoFire(this.db.list('/restaurants').query.ref);
    }

    @Effect()
    purchaseOrders = this.actions$
        .ofType(SearchActionTypes.SET_LOCATION, SearchActionTypes.SET_RADIUS)
        .pipe(
            switchMap(() => this.store.pipe(select(selectSearchState), take(1))),
            switchMap(searchState => {
                if (this.geoFireQuery) { this.geoFireQuery.cancel(); }
                const subject = new Subject<Action>();
                setTimeout(() => this.geoFireQuery = this.geoFire.query({
                    center: [searchState.location.lat, searchState.location.lng],
                    radius: searchState.radius
                  }).on('key_entered', (key, location, distance) => {
                        subject.next(new AddRestaurant({restaurantID: key, distance}));
                        subject.next(new SARead<Restaurant>({resourceName: 'restaurants', id: key}));
                    }));
                return subject.asObservable();
            })
        );

}
