var restify = require('restify');
var reqDir = require('require-dir');
var controllers = reqDir('./controllers');
var middlewares = reqDir('./middlewares');

module.exports = function (server) {

  server.get('/', middlewares.Auth, controllers.HomeController.index);

  server.post('/users', controllers.UsersController.create);

  server.post('/auth', controllers.AuthController.index);

};