var Discussion = require('../models/Discussion');


module.exports.isOwner = function (req, res, next) {

  Discussion.findById(req.params.discussionId)
  .then(function (dbDiscussion) {
    if(dbDiscussion.UserId !== req.user.id) {
      res.json(401);
    }
    else {
      req.discussion = dbDiscussion;
      return next();
    }
  })
  .catch(function (err) {
    res.json(500, err);
  });

};