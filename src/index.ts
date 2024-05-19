import app from './server';

const server = app.listen(3000, async () => {
  console.log(`Server running on port ${3000}`);
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
