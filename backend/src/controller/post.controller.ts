import { Request, Response } from 'express';

import getPosts from '../service/post.service';

const getPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await getPosts();
    if (!posts) {
      return res.status(404).send('Error');
    }
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send('Error');
  }
};

export default getPostsHandler;
