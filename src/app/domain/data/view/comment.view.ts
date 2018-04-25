import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';
import { UserView } from './user.view';

export interface CommentView {
    id: string;
    user: User;
    comment: string;
    timestamp: number;
}

export function commentModelToView(comment: Comment, users: User[]): CommentView {
    const commentUser = users.find(user => user.id === comment.userID) ||
                {id: '', name: 'unknown', pictureUrl: 'https://www.gatewaychamber.com/Content/Uploads/ProfilePictures/default-user.png'};
    return {
        id: comment.id,
        user: commentUser,
        comment: comment.comment,
        timestamp: comment.timestamp
    };
}
