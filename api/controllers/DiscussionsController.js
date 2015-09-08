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
    dbDiscussion.getUser().then(function (dbUser) {
      discussion = dbDiscussion.dataValues;
      discussion.User = dbUser.toJSON();
      res.json(discussion);
      return next();
    });
  })
  .catch(function (err) {
    err = err.errors || err
    res.json(422, err);
    return next();
  });
};

module.exports.update = function (req, res, next) {
  var newAttrs = req.params;
  var discussion = req.discussion;

  discussion.updateAttributes(newAttrs, {fields: ['content']})
  .then(function (dbDiscussion) {
    res.json(200, dbDiscussion);
    return next();
  })
  .catch(function (err) {
    res.json(422, err);
    return next();
  });
};