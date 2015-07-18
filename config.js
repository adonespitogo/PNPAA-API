var restify = require('restify');

module.exports = function (server) {

  server.use(restify.queryParser());
  server.use(restify.authorizationParser());
  server.use(restify.bodyParser());

};