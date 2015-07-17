var restify = require('restify');

module.exports = function (server) {

  server.use(restify.authorizationParser());

};