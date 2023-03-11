const { app: server } = require('./src/app');

const port = process.env.APP_PORT || 3000;

// Server running
server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
