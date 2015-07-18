var restify = require('restify');
var routes = require('./routes');
var config = require('./config/app');
var port = process.env.PORT || '8080';

var server = restify.createServer({
  name: "PNPAA Restify Server"
});

config(server).then(function () {

  routes(server);

  server.listen( port, function () {
    console.log('Restify server listening at', 'http://localhost:'+port);
  });

});
