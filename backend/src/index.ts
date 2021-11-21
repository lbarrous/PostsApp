import * as http from 'http';

import app from './app';
import log from './logger';

const port = 3000;

const server = http.createServer(app);

server.listen(port, () => {
  /* eslint-disable no-console */
  log.info(`Server listing at http://localhost:${port}`);
  /* eslint-enable no-console */
});
