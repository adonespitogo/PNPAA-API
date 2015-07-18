
module.exports = {
  index: function (req, res, next) {
    res.json(req.user);
    return next();
  }
};