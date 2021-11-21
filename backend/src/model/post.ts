import { Comment } from './comment';
import { User } from './user';

export type PostFromResponse = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Post = Omit<PostFromResponse, 'userId'> & {
  user: User;
  comments: Comment[];
};
