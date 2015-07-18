var restify = require('restify');
var Q = require('q');
var cors = require('./cors');

module.exports = function (server) {

  var deferred = Q.defer();

  server.use(restify.queryParser());
  server.use(restify.authorizationParser());
  server.use(restify.bodyParser());
  cors(server);

  deferred.resolve();

  return deferred.promise;

};