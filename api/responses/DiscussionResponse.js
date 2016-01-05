
module.exports = function (dbDiscussion, successCB, errorCB) {

  dbDiscussion.getUser()
  .then(function (dbUser) {
    var discussion = dbDiscussion.dataValues;
    discussion.User = dbUser.toJSON();
    successCB(discussion);
  })
  .catch(function (err) {
    errorCB(err);
  });

};