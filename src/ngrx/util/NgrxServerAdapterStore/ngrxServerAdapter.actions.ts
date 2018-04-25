import { Action } from '@ngrx/store';
import { FirestorePagination, Ordering, QueryFilter, RelationOptions } from '../BasicServer';
import { Schema, TableName } from '../schema';

export enum ServerAdapterActionTypes {
    CREATE = '[SA] Create',
    UPDATE = '[SA] Update',
    DELETE = '[SA] Delete',
    READ = '[SA] READ',
    QUERY = '[SA] Query',
    QUERY_WITH_RELATIONS = '[SA] Query with relations',
    READ_ALL_CHILDREN = '[SA] Read all children'
}

export class SACreate<T> implements Action {
    readonly type = ServerAdapterActionTypes.CREATE;
    constructor(public payload: {resourceName: string, id: string, entity: T}) {}
}

export class SAUpdate<T> implements Action {
    readonly type = ServerAdapterActionTypes.UPDATE;
    constructor(public payload: {resourceName: string, id: string, updatedEntity: Partial<T>}) {}
}

export class SADelete<T> implements Action {
    readonly type = ServerAdapterActionTypes.DELETE;
    constructor(public payload: {resourceName: string, id: string}) {}
}

export class SARead<T> implements Action {
    readonly type = ServerAdapterActionTypes.READ;
    constructor(public payload: {resourceName: string, id: string}) {}
}

export class SAQuery<T> implements Action {
    readonly type = ServerAdapterActionTypes.QUERY;
    constructor(public payload:
        {resourceName: string, filters: Array<QueryFilter<T>>, order: Array<Ordering<T>>, page: FirestorePagination}) {}
}

export class SAQueryWithRelations<T> implements Action {
    readonly type = ServerAdapterActionTypes.QUERY_WITH_RELATIONS;
    constructor(public payload:
        {resourceName: TableName, filters: Array<QueryFilter<T>>, order: Array<Ordering<T>>,
            page: FirestorePagination, children: RelationOptions, schema: Schema}) {}
}

export class SAReadAllChildren<T> implements Action {
    readonly type = ServerAdapterActionTypes.READ_ALL_CHILDREN;
    constructor(public payload: {resourceName: TableName, id: string, schema: Schema}) {}
}
