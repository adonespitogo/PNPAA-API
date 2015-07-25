var models = require('require-dir')('../models');
var Discussion = models.Discussion;
var User = models.User;

module.exports.index = function (req, res, next) {
  var query = {
    where: {isPublic: true},
    include: [
      {model: User}
    ]
  };
  Discussion.findAll(query).then(function (discussions) {
    res.json(discussions);
    return next();
  })
  .catch(function (err) {
    return next(err);
  });
};

module.exports.create = function (req, res, next) {
  var discussion = req.params;
  discussion.UserId = req.user.id;
  Discussion.create(discussion)
  .then(function (dbDiscussion) {
    res.json(dbDiscussion);
    return next();
  })
  .catch(function (err) {
    err = err.errors || err
    res.json(422, err);
    return next();
  });
};