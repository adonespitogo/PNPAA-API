
module.exports = {
  index: function (req, res, next) {
    res.json({'hello': 'world'});
    return next();
  }
};