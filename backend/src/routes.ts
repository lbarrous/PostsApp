import { Express, Request, Response } from 'express';

import getPostsHandler from './controller/post.controller';

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.get('/api/posts', getPostsHandler);
}
