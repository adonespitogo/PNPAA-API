var models = require('require-dir')('../models');
var Discussion = models.Discussion;
var User = models.User;
var responses = require('require-dir')('../responses');

module.exports.index = function (req, res, next) {
  var query = {
    where: {isPublic: true},
    include: [
      {model: User}
    ]
  };
  if (req.params.offset) {
    query.offset = req.params.offset;
  }
  if (req.params.limit) {
    query.limit = req.params.limit;
  }
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

    var successCB = function (discussion) {
      res.json(discussion);
      return next();
    };

    var errorCB = function (err) {
      err = err.errors || err
      res.json(422, err);
      return next();
    };

    responses.DiscussionResponse(dbDiscussion, successCB, errorCB);
  })
  .catch(function (err) {
    err = err.errors || err;
    res.json(422, err);
    return next();
  });
};

module.exports.show = function  (req, res, next) {
  Discussion.findOne({
    where: {
      id: req.params.discussionId
    },
    include: [
      {model: User}
    ]
  })
  .then(function (dbDiscussion) {

    var successCB = function (discussion) {
      res.json(discussion);
      return next();
    };

    var errorCB = function (err) {
      err = err.errors || err
      res.json(422, err);
      return next();
    };

    responses.DiscussionResponse(dbDiscussion, successCB, errorCB);
  })
  .catch(function (err) {
    err = err.errors || err
    res.json(405, err);
    return next();
  });
};

module.exports.update = function (req, res, next) {
  var newAttrs = req.params;
  var discussion = req.discussion;

  discussion.updateAttributes(newAttrs, {fields: ['content']})
  .then(function (dbDiscussion) {

    var successCB = function (discussion) {
      res.json(discussion);
      return next();
    };

    var errorCB = function (err) {
      err = err.errors || err
      res.json(422, err);
      return next();
    };

    responses.DiscussionResponse(dbDiscussion, successCB, errorCB);
  })
  .catch(function (err) {
    res.json(422, err);
    return next();
  });
};

module.exports.delete = function (req, res, next) {
  var discussion = req.discussion;

  discussion.destroy()
  .then(function () {
    res.json(200);
    return next();
  })
  .catch(function (err) {
    res.json(400, err);
  });
};