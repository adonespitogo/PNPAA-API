var restify = require('restify');
var cors = require('./cors');

module.exports = function (server) {

  server.use(restify.queryParser());
  server.use(restify.authorizationParser());
  server.use(restify.bodyParser());
  cors(server);

};