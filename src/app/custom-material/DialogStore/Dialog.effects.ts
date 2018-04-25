import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { RouterActionTypes } from '../../store/router/router.actions';
import { DialogActionTypes, DialogOpen } from './Dialog.actions';

@Injectable()
export class DialogEffects {

    constructor(
        private action$: Actions,
        private dialog: MatDialog
    ) {}

    @Effect()
    openDialog = this.action$
        .ofType(DialogActionTypes.OPEN)
        .pipe(
            map((action: DialogOpen) => action.payload),
            switchMap(payload => {
                const ref = this.dialog.open(payload.template, payload.config ? payload.config : {});
                return payload.afterClosed ? ref.afterClosed().pipe(mergeMap(x => payload.afterClosed(x))) :
                Observable.of();
            })
        );

    @Effect()
    closeDialog = this.action$
        .ofType(DialogActionTypes.CLOSE)
        .pipe(
            tap(x => this.dialog.closeAll()),
            filter(x => false)
        );

    @Effect()
        closeDialogOnNavigation = this.action$
            .ofType(RouterActionTypes.GO)
            .pipe(
                tap(x => this.dialog.closeAll()),
                filter(x => false)
            );
}
