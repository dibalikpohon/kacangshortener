// eslint-disable-next-line no-unused-vars
const {Pool} = require('pg');
/**
 * A Service related to table 'links'
 */
class Service {
  // eslint-disable-next-line valid-jsdoc
  /**
   * Construct a new Service.
   * A service that communicate with the database.
   * @param {pgPool:Pool} pgPool Connection pool to PostgreSQL database.
   */
  constructor(pgPool) {
    // pgPool is expected to be Pool type 'pg'
    this.pgPool = pgPool;

    this.addShortenedLink = this.addShortenedLink.bind(this);
    this.getShortenedLink = this.getShortenedLink.bind(this);
    this.idExists = this.idExists.bind(this);
  }

  /**
   * Add shortened link to database
   * @param {linkId} linkId generated
   * @param {site} website it points to
   * @return {Promise<*>} the id
   */
  async addShortenedLink(linkId, website) {
    const query = {
      text: `INSERT INTO links(link_id,website) 
             VALUES($1,$2) RETURNING link_id`,
      values: [linkId, website],
    };

    const result = await this.pgPool.query(query);

    if (!result.rows[0].link_id) {
      throw new Error('Cannot create new id. The linkId may already existed.');
    }

    return result.rows[0].link_id;
  }

  /**
   * Retrieve the shortened link from database
   * @param {linkId} linkId requested
   * @return {Promise<{notNull: boolean, type: string}>} the site it points to
   */
  async getShortenedLink(linkId) {
    const query = {
      text: 'SELECT website FROM links WHERE link_id=$1',
      values: [linkId],
    };

    const result = await this.pgPool.query(query);

    if (!result.rows[0].website) {
      throw new Error('Cannot get the website from linkId. ' +
          'The data may not exist.');
    }

    return result.rows[0].website;
  }

  /**
   * Checks if a link_id exists in database.
   * Returns true if link_id exists. False otherwise
   * @param {linkId} linkId requested linkId
   * @return {Promise<boolean>}
   */
  async idExists(linkId) {
    const query = {
      text: 'SELECT link_id FROM links WHERE link_id=$1',
      values: [linkId],
    };

    const result = await this.pgPool.query(query);
    return result.rows.length > 0;
  }
}

module.exports = Service;
