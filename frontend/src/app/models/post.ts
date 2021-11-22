import { Comment } from "./comment";
import { User } from "./user";

export type Post = {
    id: number;
    user: User;
    title: string;
    body: string;
    comments: Comment[];
}