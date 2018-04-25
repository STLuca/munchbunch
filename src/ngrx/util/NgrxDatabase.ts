import { ActionReducerMap } from '@ngrx/store';
import { namedEntityReducer } from '../reducers/Entity.reducer';


export interface Table<T> {
    tableName: string;
}

export function createDatabase(tables: Array<Table<any>>): ActionReducerMap<any> {

    return tables  .map(table => ({[table.tableName]: namedEntityReducer(table.tableName)}))
            .reduce( (pv, cv) => ({...cv, ...pv}), {});

}


