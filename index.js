const express = require('express');
const logger = require('./utils/logger.js');

const app = express();
const port = 3000;

const handler = (func) => (req, res) => {
  try {
    logger.info('server.handler start');
  } catch (e) {
    logger.info('server.handler failed');
    res.send('something wrong with it');
  }
};

app.get(
  '/success',
  handler((req, res) => {
    res.send('okay');
  })
);

app.get(
  '/error',
  handler((req, res) => {
    throw new Error('failed');
  })
);

app.use((req, res, done) => {
  logger.info(req.originalUrl);
  done();
});

app.listen(port, () => console.log(`listening port ${port}!`));

console.log(`Hello Node.js v${process.versions.node}!`);
