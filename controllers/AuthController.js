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
      user.comparePassword(password)
      .then(function () {
        res.json({
          user: user,
          token: jwToken.issue({id : user.id })
        });
        return next();
      })
      .catch(function () {
        res.json(401, "Incorrect password");
        return next();
      });
    })
    .catch(function (err) {
      res.json(404, 'User with email ' + email + 'does not exist');
      return next();
    });
  }
};

// function (err, user) {
//       if (!user) {
//         res.json(401, {err: 'Invalid email or password.'});
//         return next();
//       }

//       Users.comparePassword(password, user, function (err, valid) {
//         if (err) {
//           res.json(403, {err: 'forbidden'});
//           return next();
//         }

//         if (!valid) {
//           res.json(401, {err: 'invalid email or password'});
//           return next();
//         } else {
//           res.json({
//             user: user,
//             token: jwToken.issue({id : user.id })
//           });
//           return next();
//         }
//       });
//     }