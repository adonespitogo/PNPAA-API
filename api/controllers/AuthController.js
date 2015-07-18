var jwToken = require('../services/jsonwebtoken');
var Users = require('../models/User');

module.exports = {
  index: function (req, res, next) {
    var email = req.params['email'];
    var password = req.params['password'];

    if (!email || !password) {
      res.json(401, {err: 'Email and password required'});
      return next();
    }

    Users.findOne({where: {email: email}})
    .then(function (user) {

      user.comparePassword(password, function (err, match) {
        if (!match) {
          res.send(401, "Invalid password");
          return next();
        }
        if (err) {
          return next(err);
        }
        res.json({
          user: user,
          token: jwToken.issue({id: user.id})
        });
        return next();
      });
    })
    .catch(function (err) {
      res.json(404, 'User with email ' + email + ' does not exist');
      return next();
    });
  },
  verify: function (req, res, next) {
    res.send(200);
    return next();
  }
};
