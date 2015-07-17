
module.exports = function (req, res, next) {
  var users;

  users = {
      foo: {
          id: 1,
          password: 'bar'
      }
  };

  // Ensure that user is not anonymous; and
  // That user exists; and
  // That user password matches the record in the database.
  if (req.username == 'anonymous' || !users[req.username] || req.authorization.basic.password !== users[req.username].password) {
      // Respond with { code: 'NotAuthorized', message: '' }
      next(new restify.NotAuthorizedError());
  } else {
      next();
  }

  next();
};
