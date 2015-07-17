var restify = require('restify');
var routes = require('./routes');
var config = require('./config');

var server = restify.createServer({
  name: "PNPAA Restify Server"
});

config(server);
routes(server);

server.listen('8080', function () {
  console.log('Restify server listening at ', server.url);
});