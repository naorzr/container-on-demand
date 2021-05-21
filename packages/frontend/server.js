const { GANDALF_EXEC_ENV_CONFIGS } = require('@gandalf/shared');
const path = require('path');
const fastify = require('fastify');
const fastifyStatic = require('fastify-static');
const { pageGen, pageGenAlt } = GANDALF_EXEC_ENV_CONFIGS;
const fastApp = fastify();
const fastApp2 = fastify();

fastApp.register(fastifyStatic, {
  root: path.join(__dirname, 'build'),
});
fastApp2.register(fastifyStatic, {
  root: path.join(__dirname, 'build'),
});

fastApp.get('*', function (req, reply) {
  return reply.sendFile('index.html', path.join(__dirname, 'build')); // serving a file from a different root location
});

// This is a workaround in case we will ever want to use react-router-dom
fastApp.setNotFoundHandler(function (req, reply) {
  return reply.sendFile('index.html', path.join(__dirname, 'build')); // serving a file from a different root location
});

fastApp2.get('*', function (req, reply) {
  return reply.sendFile('index.html', path.join(__dirname, 'build')); // serving a file from a different root location
});

fastApp2.setNotFoundHandler(function (req, reply) {
  return reply.sendFile('index.html', path.join(__dirname, 'build')); // serving a file from a different root location
});

fastApp.listen(pageGen.port, '0.0.0.0', (err, port) => {
  console.log(err);
  console.log('page-gen listening on ', port);
});
