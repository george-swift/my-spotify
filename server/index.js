/**
 * SPOTIFY WEB API AUTHORIZATION CODE FLOW
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 * https://github.com/spotify/web-api-auth-examples
 */

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';
import cluster from 'cluster';
import { cpus } from 'os';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from './config.js';
import router from './routes.js';

// Load .env variables
dotenv.config();

// Take advantage of all the computing power available in the system using cluster mode
if (cluster.isPrimary) {
  console.warn(`Node cluster master ${process.pid} is running`);
  const availableCpus = cpus();
  console.log(`Clustering to ${availableCpus.length} processes`);
  availableCpus.forEach(() => cluster.fork());
  cluster.on('exit', (worker, code) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} crashed.\nStarting a new worker`);
      cluster.fork();
    }
  });
} else {
  const app = express();

  // Build absolute path in ESM
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const staticFilesHandler = express.static(path.resolve(__dirname, '../client/build'));

  // Priority serve any static files
  app.use(staticFilesHandler);
  app
    .use(staticFilesHandler)
    .use(cors())
    .use(cookieParser())
    .use(
      history({
        verbose: true,
        rewrites: [
          { from: /\/login/, to: '/login' },
          { from: /\/callback/, to: '/callback' },
          { from: /\/refresh_token/, to: '/refresh_token' }
        ]
      })
    )
    .use(staticFilesHandler);

  app.use(router);

  app.listen(config.PORT, () => {
    console.warn(`Node cluster worker ${process.pid}: listening on port ${config.PORT}`);
  });
}
