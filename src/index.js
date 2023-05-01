const container = require('./infrastructure/container');

const server = container.resolve('server');

server.start();