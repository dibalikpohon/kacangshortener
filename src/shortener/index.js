const Handler = require('./handler');
const routes = require('./routes');
const Service = require('./service');

/**
 * A Shortener
 */
class Shortener {
  /**
   * Construct a Shortener class
   * @param {Pool} pgPool Pool class from Postgres.
   */
  constructor(pgPool) {
    this.service = new Service(pgPool);
    this.handler = new Handler(this.service);
    this.routes = routes(this.handler);
  }
}

module.exports = Shortener;
