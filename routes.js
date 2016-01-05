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

  server.get(
    '/discussions/:discussionId',
    middlewares.Auth,
    controllers.DiscussionsController.show
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
  server.del(
    '/discussions/:discussionId',
    middlewares.Auth,
    middlewares.Discussion.isOwner,
    controllers.DiscussionsController.delete
  );

  // serve static files
  server.get(/.*/, restify.serveStatic({
      'directory': 'public',
      'default': 'index.html'
   }));

};