import { Action, ActionReducer } from '@ngrx/store';

export class NamedAction<T extends Action> implements Action {
    readonly type = '[NAMED: ' + this.payload.name + '] ' + this.payload.action.type;
    constructor(public payload: {name: string, action: T}) {}
}

export function namedReducer<T>(name: string) {
    const newAction: Action = {type: ''};
    return (reducer: ActionReducer<T, Action>) => (state: T = reducer(undefined, newAction ), action: NamedAction<Action>): T => {
        if (action.type.startsWith('[NAMED: ' + name + ']')) {
            return reducer(state, action.payload.action);
        } else {
            return state;
        }
    };
}

export function namedAction(name: string, action: Action) {
    return new NamedAction({name, action});
}


