var db = require('../config/database');
var Sequelize = db.Sequelize;
var sequelize = db.sequelize;

var User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      scopes: false
    }
  }, {
    classMethods: {},
    instanceMethods: {
      toJSON: function () {
        var val = this.get({plain:true});
        delete val.password;
        return val;
      }
    }
  }
);

module.exports = User;