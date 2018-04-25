import { Map } from 'immutable';
import { Comment } from '../../app/domain/data/models/comment.model';
import { Dish } from '../../app/domain/data/models/dish.model';
import { Menu } from '../../app/domain/data/models/menu.model';
import { Order } from '../../app/domain/data/models/order.model';
import { Purchase } from '../../app/domain/data/models/purchase.model';
import { Restaurant } from '../../app/domain/data/models/restaurant.model';
import { User } from '../../app/domain/data/models/user.model';

export interface Relation<V> {
    foreignTable: TableName;
    linkId: keyof V;
}

export type TableName = 'users' | 'restaurants' | 'menus' | 'dishes' | 'orders' | 'restaurantComments' | 'dishComments' | 'purchases';

export interface Entity<T> {
    tableName: TableName;
    id: keyof T;
    foreignKeys: Array<Relation<T>>;
}

export const userEntity: Entity<User> = {
    tableName: 'users',
    id: 'id',
    foreignKeys: []
};

export const restaurantEntity: Entity<Restaurant> = {
    tableName: 'restaurants',
    id: 'id',
    foreignKeys: [
        {foreignTable: 'users', linkId: 'owner' }
    ]
};

export const menuEntity: Entity<Menu> = {
    tableName: 'menus',
    id: 'id',
    foreignKeys: [
        {foreignTable: 'restaurants', linkId: 'restaurantId'}
    ]
};

export const dishEntity: Entity<Dish> = {
    tableName: 'dishes',
    id: 'id',
    foreignKeys: [
        {foreignTable: 'menus', linkId: 'menuID'}
    ]
};

export const restaurantCommentsEntity: Entity<Comment> = {
    tableName: 'restaurantComments',
    id: 'id',
    foreignKeys: [
        {foreignTable: 'users', linkId: 'userID'}
    ]
};

export const dishCommentsEntity: Entity<Comment> = {
    tableName: 'dishComments',
    id: 'id',
    foreignKeys: [
        {foreignTable: 'users', linkId: 'userID'}
    ]
};

export const orderEntity: Entity<Order> = {
    tableName: 'orders',
    id: 'id',
    foreignKeys: [
        // {foreignTable: 'dishes', linkId: 'dishID'},
        // {foreignTable: 'restaurants', linkId: 'restaurantID'}
    ]
};

export const purchaseEntity: Entity<Purchase> = {
    tableName: 'purchases',
    id: 'id',
    foreignKeys: []
};

export type Schema = Array<Entity<any>>;
export const mySchema: Schema = [
    userEntity,
    restaurantEntity,
    menuEntity,
    dishEntity,
    restaurantCommentsEntity,
    dishCommentsEntity,
    orderEntity,
    purchaseEntity
];

export function getChildrenRelations(tableName: TableName, schema: Schema): Array<Relation<any>> {
    return schema.filter(entity => entity.foreignKeys.find(key => key.foreignTable === tableName))
        .map(entity => ({foreignTable: entity.tableName, linkId: entity.foreignKeys.find(key => key.foreignTable === tableName).linkId}));

}

export function getParentRelations(tableName: TableName, schema: Schema): Array<Relation<any>> {
    return schema.find(entity => entity.tableName === tableName).foreignKeys;
}

/*
export function morphModelToView<M, V>(table: string, schema: Schema) : (model: M) => V {

    let removeFields: string[] = getRemoveFields(table, schema);

    return function(model: M): V {
        removeFields.forEach(field => delete model[field]);

        return null
    }

}

function getRemoveFields(table: string, schema: Schema) : string[] {
    return schema.find(entity => entity.tableName == table)
          .foreignKeys.map(key => key.linkId)
}
*/
