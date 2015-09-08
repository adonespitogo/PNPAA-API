
var jwt = require('restify-jwt');
var jwtSecret = require('../../config/jwt_secret');
var authMiddleware = jwt({secret: jwtSecret});

module.exports = authMiddleware;