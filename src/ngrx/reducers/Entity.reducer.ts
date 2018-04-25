import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Dictionary } from '@ngrx/entity/src/models';
import { Action, ActionReducer, createSelector, MemoizedSelector } from '@ngrx/store';
import { NamedAction, namedReducer } from './FilteredReducer';

export enum TableActionTypes {
    CREATE = '[Entity] Create',
    CREATE_MANY = '[Entity] Create Many',
    UPDATE = '[Entity] Update',
    DELETE = '[Entity] Delete'
}

export class Create<T> implements Action {
    readonly type = TableActionTypes.CREATE;
    constructor(public payload: {entity: T}) {}
}

export class CreateMany<T> implements Action {
    readonly type = TableActionTypes.CREATE_MANY;
    constructor(public payload: {entities: T[]}) {}
}

export class Update<T> implements Action {
    readonly type = TableActionTypes.UPDATE;
    constructor(public payload: {id: string, entity: Partial<T>}) {}
}

export class Delete implements Action {
    readonly type = TableActionTypes.DELETE;
    constructor(public payload: {id: string}) {}
}

export type EntityActionTypes<T> = Create<T> | CreateMany<T> | Update<T> | Delete;

export function entityReducer<T>(adapter: EntityAdapter<T>) {

    return (state: EntityState<T> = adapter.getInitialState(), action: EntityActionTypes<T>): EntityState<T> => {
        switch (action.type) {
            case TableActionTypes.CREATE:
                return adapter.addOne(action.payload.entity, state);
            case TableActionTypes.CREATE_MANY:
                return adapter.addMany(action.payload.entities, state);
            case TableActionTypes.UPDATE:
                return adapter.updateOne({
                    id: action.payload.id,
                    changes: action.payload.entity
                }, state);
            case TableActionTypes.DELETE:
                return adapter.removeOne(action.payload.id, state);
            default:
                return state;
        }
    };
}

export function namedEntityReducer<T>(name: string) {
    return namedReducer(name)(entityReducer(createEntityAdapter<T>()));
}

export function createSelectorGetIDs<T>(getEntityState: MemoizedSelector<object, EntityState<T>>)
    : MemoizedSelector<object, string[] | number[]> {
    return createSelector(getEntityState, entities => entities.ids);
}

export function createSelectorGetEntityMap<T>(getEntityState: MemoizedSelector<object, EntityState<T>>)
    : MemoizedSelector<object, Dictionary<T>> {
    return createSelector(getEntityState, entities => entities.entities);
}

export function createSelectorGetEntityList<T>(getEntityState: MemoizedSelector<object, EntityState<T>>): MemoizedSelector<object, T[]> {
    return createSelector(getEntityState, entities => ((entities.ids || []) as string[]).map(id => entities.entities[id]));
}
