import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertActions, AlertActionTypes } from './alerts.action';
import { AlertState, initialAlertState } from './alerts.state';




export function alertReducer(state: AlertState = initialAlertState, action: AlertActions): AlertState {
    switch (action.type) {
        case AlertActionTypes.ADD:
            return {
                alerts: [action.payload.alert, ...state.alerts]
            };
        case AlertActionTypes.REMOVE:
            return {
                alerts: [...state.alerts.slice(0, action.payload.index),
                        ...state.alerts.slice(action.payload.index + 1)]
            };
        default:
            return state;
    }
}

export const selectAlertState = createFeatureSelector<AlertState>('alertsState');
export const selectAlerts = createSelector(selectAlertState, state => state.alerts);
