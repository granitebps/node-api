import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import hpp from 'hpp';
import compression from 'compression';
import { rateLimiter } from './middleware/rate-limit.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

const app: Express = express();

app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Node.js Express + Typescript API' });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
