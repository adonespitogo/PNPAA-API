var db = require('../../config/sequelize');
var Sequelize = db.Sequelize;
var sequelize = db.sequelize;
var User = require('./User');

var Discussion = sequelize.define('Discussion', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true
    }
  },
  isPublic: {
    type: Sequelize.BOOLEAN
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
}, {
  classMethods: {},
  instanceMethods: {}
});

Discussion.belongsTo(User);

module.exports = Discussion;