var restify = require('restify');

module.exports = function (server) {

  server.pre(restify.CORS({
    origins: ['*'],  // defaults to ['*']
    credentials: true,
    headers: ['X-Requested-With', 'Authorization']
  }));

  server.pre(restify.fullResponse());

  function unknownMethodHandler(req, res) {
      if (req.method.toLowerCase() === 'options') {
        var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version', 'Origin', 'X-Requested-With', 'Authorization']; // added Origin & X-Requested-With & **Authorization**

        if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');

        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
        res.header('Access-Control-Allow-Methods', res.methods.join(', '));
        res.header('Access-Control-Allow-Origin', req.headers.origin);

        return res.send(200);
     }
     else {
        return res.send(new restify.MethodNotAllowedError());
     }
  }

  server.on('MethodNotAllowed', unknownMethodHandler);

};