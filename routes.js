var restify = require('restify');
var reqDir = require('require-dir');
var controllers = reqDir('./controllers');
var middlewares = reqDir('./middlewares');
var jwt = require('restify-jwt');
var jwtSecret = require('./config/jwt_secret');

module.exports = function (server) {

  // serve static files
  server.get(/.*/, restify.serveStatic({
      'directory': 'public',
      'default': 'index.html'
   }));
  server.post('/users', controllers.UsersController.create);
  server.post('/auth', controllers.AuthController.index);
  server.post('/auth/verify', jwt({secret: jwtSecret}), controllers.AuthController.verify);

};