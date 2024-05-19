import { env, loadEnv } from './config/env';
import app from './server';

loadEnv();

const server = app.listen(env.PORT, async () => {
  console.log(`Server running on port ${env.PORT}`);
});

const onCloseSignal = async () => {
  console.log('sigint received, shutting down');

  server.close(() => {
    console.log('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
