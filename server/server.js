const { networkInterfaces } = require('os');
const express = require('express');

const ip = networkInterfaces().en0[0].address;
const port = 3000;

const middleware = (request, response, next) => {
  console.info('Incoming request:');
  console.info('- Method:', request.method);
  console.info('- URL:', request.url);
  console.info('- Body:', JSON.stringify(request.body));
  next();
};

const server = express();
server.use(middleware);
server.listen(port, () => {
  console.info(`Server started at http://${ip}:${port}`);
});
