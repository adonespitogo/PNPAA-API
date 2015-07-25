var restify = require('restify');
var reqDir = require('require-dir');
var controllers = reqDir('./api/controllers');
var middlewares = reqDir('./api/middlewares');
var jwt = require('restify-jwt');
var jwtSecret = require('./config/jwt_secret');
var authMiddleware = jwt({secret: jwtSecret});

module.exports = function (server) {

  server.post('/users', controllers.UsersController.create);
  server.post('/auth', controllers.AuthController.index);
  server.post('/auth/verify', authMiddleware, controllers.AuthController.verify);

  server.get('/discussions', authMiddleware, controllers.DiscussionsController.index);
  server.post('/discussions', authMiddleware, controllers.DiscussionsController.create);

  // serve static files
  server.get(/.*/, restify.serveStatic({
      'directory': 'public',
      'default': 'index.html'
   }));

};