const routes = (handler) => ([
  {
    method: 'POST',
    path: '/shortenLink',
    handler: handler.postShortenLink,
  },
  {
    method: 'POST',
    path: '/customShortenLink',
    handler: handler.postCustomShortenLink,
  },
  {
    method: 'GET',
    path: '/expandLink',
    handler: handler.getExpandLink,
  },
]);

module.exports = routes;
