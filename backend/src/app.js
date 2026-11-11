import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import routes from './routes/index.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const nodeEnv = process.env.NODE_ENV || 'development';
const clientOrigins = (process.env.CLIENT_ORIGIN || 'https://mm-builders-seven.vercel.app')
  .split(',')
  .map((value) => {
    const origin = value.trim();
    if (!origin) return '';

    try {
      const url = new URL(/^[a-z][a-z\d+.-]*:\/\//i.test(origin) ? origin : `https://${origin}`);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error('Unsupported origin protocol');
      }
      return url.origin;
    } catch {
      throw new Error(`Invalid CLIENT_ORIGIN value: "${origin}"`);
    }
  })
  .filter(Boolean);

if (clientOrigins.length === 0) {
  throw new Error('CLIENT_ORIGIN must contain at least one valid frontend origin');
}

app.use(
  helmet({
    // The 3D blueprint pages and intro video need inline scripts/styles and are shown in an iframe
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    frameguard: false,
  })
);
const allowedOrigins = new Set(clientOrigins);
app.use(
  cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.has(origin));
    },
  })
);
app.use(compression());
app.use(express.json({ limit: '50kb' }));
if (nodeEnv !== 'test') app.use(morgan(nodeEnv === 'production' ? 'combined' : 'dev'));

app.use('/api', routes);
app.use('/api', notFound);

// In production the same server also serves the built React app (frontend/dist)
const distPath = path.resolve(__dirname, '../../frontend/dist');
if (nodeEnv === 'production' && fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => res.sendFile(path.join(distPath, 'index.html')));
} else {
  app.use(notFound);
}

app.use(errorHandler);

export default app;
