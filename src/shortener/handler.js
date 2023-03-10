const {customAlphabet} = require('nanoid');

/**
 * Handler class for Shortener
 */
class Handler {
  /**
   * Construct a new Handler
   * @param {service} service for Shortener
   */
  constructor(service) {
    this.service = service;
    this.nanoid = customAlphabet(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');

    this.postShortenLink = this.postShortenLink.bind(this);
    this.postCustomShortenLink = this.postCustomShortenLink.bind(this);
    this.getExpandLink = this.getExpandLink.bind(this);
  }

  /**
   * POST /shortenLink handler
   * @param {request} request data
   * @param {hapi} h object
   * @return {Promise<*>} response
   */
  async postShortenLink(request, h) {
    const {site} = request.payload;
    const newId = this.nanoid(8);

    const id = await this.service.addShortenedLink(newId, site);
    return h.response({
      status: 'success',
      data: {id},
    });
  }

  /**
   * POST /customShortenLink handler
   * @param {request} request
   * @param {hapi} h
   * @return {Promise<*>} created id
   */
  async postCustomShortenLink(request, h) {
    const {linkId, site} = request.payload;

    if (linkId.length > 30) {
      return h.response({
        status: 'error',
        message: 'id too long!',
      }).code(400); // bad request
    }

    const re = /^[a-zA-Z0-9]+$/;
    if (!re.test(linkId)) {
      return h.response({
        status: 'error',
        message: 'Custom Link ID should be alphanumeric!',
      }).code(400); // bad request
    }

    const linkIdExists = await this.service.idExists(linkId);
    if (linkIdExists) {
      return h.response({
        status: 'error',
        message: 'linkId already exists!',
      }).code(409); // conflict
    }


    const id = await this.service.addShortenedLink(linkId, site);
    return h.response({
      status: 'success',
      data: {id},
    });
  }

  /**
   * GET /expandLink handler
   * @param {request} request data
   * @param {hapi} h object
   * @return {Promise<*>} response
   */
  async getExpandLink(request, h) {
    const {linkId} = request.query;

    try {
      const site = await this.service.getShortenedLink(linkId);
      return h.response({
        status: 'success',
        data: {site},
      });
    } catch (e) {
      return h.response({
        status: 'error',
        message: 'Not Found',
      }).code(404);
    }
  }
}

module.exports = Handler;
