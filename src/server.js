require('dotenv').config();

const Hapi = require('@hapi/hapi');
const {Pool} = require('pg');
const Shortener = require('./shortener');

const init = async () => {
  const pool = new Pool();
  const shortener = new Shortener(pool);

  const server = Hapi.server({
    port: process.env.SVPORT,
    host: process.env.SVHOST,
    debug: {request: ['*']},
  });

  server.route(shortener.routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
