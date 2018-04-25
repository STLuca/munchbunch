import { Comment } from '../models/comment.model';
import { Dish } from '../models/dish.model';
import { commentModelToView, CommentView } from './comment.view';

export interface DishView {
    id: string;
    name: string;
    price: number;
    picture: string;
    description: string;
    comments: CommentView[];
}

export function dishModelToView(dish: Dish, comments: Comment[]): DishView {
    return {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        picture: dish.picture,
        description: dish.description,
        comments: comments.filter(comment => comment.commenteeID === dish.id)
                        .map(comment => commentModelToView(comment, []))
    };
}
