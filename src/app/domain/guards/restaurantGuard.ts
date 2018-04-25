import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/interfaces';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { NgrxServerWrapperImp } from '../../../ngrx/util/NgrxDatastore';
import { AddAlert } from '../../alerts/store/alerts/alerts.action';
import { Go } from '../../store/router/router.actions';
import { getRestaurantIds, selectRoutedRestaurant } from '../data/store/index';
import { emptyRestaurant, RestaurantView } from '../data/view/restaurant.view';

@Injectable()
export class RestaurantGuard implements CanActivate {

    constructor(
        private store: Store<any>,
        private serverAdapter: NgrxServerWrapperImp
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot
    ) {
        const id = route.paramMap.get('restaurantID');
        return this.getFromStoreOrApi(id)
            .pipe(
                switchMap( () => of(true)),
                catchError(() => of(false))
            );
    }

    getFromStoreOrApi(id: string): Observable<boolean> {
        return Observable.merge(
            this.store
            .select(selectRoutedRestaurant)
            .pipe(
                tap((restaurant: RestaurantView) => {
                    if (restaurant === emptyRestaurant) {
                        this.serverAdapter.read('restaurants', id)
                        .subscribe(action => this.store.dispatch(action));
                    }
                }),
                filter( (restaurant: RestaurantView) => restaurant !== emptyRestaurant),
                map( restaurant => true)

            ),
            Observable.of(false).pipe(
                delay(5000),
                tap(() => this.store.dispatch(new Go({path: ['']}))),
                tap(() => this.store.dispatch(new AddAlert({alert: 'Restaurant not found or took too long to load'}))))
        ).pipe(take(1));
    }

}
