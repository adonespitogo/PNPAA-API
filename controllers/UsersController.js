
var User = require('../models/User');
var jwToken = require('../services/jsonwebtoken');

module.exports = {
  create: function (req, res, next) {
    if (!req.params.password) {
      res.json(401, "Password is required!");
      return next();
    }
    if (req.params.password !== req.params.confirmPassword) {
      res.json(401, {err: 'Password doesn\'t match.'});
      return next();
    }
    var user = User.build(req.params);
    user.setPassword(req.params.password)
    .then(function (user) {

      user.save()
      .then(function (user) {
        // // If user created successfuly we return user and token as response
          // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
        return next();

      })
      .catch(function (err) {
        var err = err.errors || err
        res.json(422, err);
        return next();
      });
    })
    .catch(function (err) {
      return next(err);
    });
  }
};