var restify = require('restify');
var reqDir = require('require-dir');
var controllers = reqDir('./api/controllers');
var middlewares = reqDir('./api/middlewares');

module.exports = function (server) {

  server.post('/users', controllers.UsersController.create);
  server.post('/auth', controllers.AuthController.index);
  server.post(
    '/auth/verify',
    middlewares.Auth,
    controllers.AuthController.verify
  );

  server.get(
    '/discussions',
    middlewares.Auth,
    controllers.DiscussionsController.index
  );
  server.post(
    '/discussions',
    middlewares.Auth,
    controllers.DiscussionsController.create
  );
  server.put(
    '/discussions/:discussionId',
    middlewares.Auth,
    middlewares.Discussion.isOwner,
    controllers.DiscussionsController.update
  );

  // serve static files
  server.get(/.*/, restify.serveStatic({
      'directory': 'public',
      'default': 'index.html'
   }));

};