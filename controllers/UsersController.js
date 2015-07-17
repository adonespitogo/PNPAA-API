
var User = require('../models/User');
var util = require('util');
var jwToken = require('../services/jsonwebtoken');

module.exports = {
  create: function (req, res, next) {
    if (!req.params.password) {
      res.json(401, "Password is required!");
      return next();
    }
    if (req.params.password !== req.params.confirmPassword) {
      res.json(401, {err: 'Password doesn\'t match, What a shame!'});
      return next();
    }
    User.create(req.params).then(function (user) {
      // // If user created successfuly we return user and token as response
        // NOTE: payload is { id: user.id}
        console.log(util.inspect(user));
      res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      return next();

    })
    .catch(function (err) {
      res.json(422, err.errors);
      return next();
    });
  }
};