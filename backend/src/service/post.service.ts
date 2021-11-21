import axios from 'axios';

import { Comment } from '../model/comment';
import { Post, PostFromResponse } from '../model/post';
import { UserFromResponse } from '../model/user';
import { parseUser } from '../parser/post.parser';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
const COMMENT_URL = 'https://jsonplaceholder.typicode.com/comments';
const USER_URL = 'https://jsonplaceholder.typicode.com/users';

const getPosts = async () => {
  const postPromise = axios.get<PostFromResponse[]>(POST_URL);
  const commentsPromise = axios.get<Comment[]>(COMMENT_URL);
  const usersPromise = axios.get<UserFromResponse[]>(USER_URL);

  const [
    { data: postsFromResponse },
    { data: commentsFromResponse },
    { data: usersFromResponse },
  ] = await Promise.all([postPromise, commentsPromise, usersPromise]);

  return postsFromResponse.map((post: PostFromResponse) => {
    const user = parseUser(usersFromResponse.find((u) => u.id === post.id));
    const comments = commentsFromResponse.filter(
      (comment) => comment.postId === post.id,
    ) as Comment[];

    return {
      ...post,
      user,
      comments,
    } as Post;
  });
};

export default getPosts;
