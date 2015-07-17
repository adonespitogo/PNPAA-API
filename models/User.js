var db = require('../config/database');
var Sequelize = db.Sequelize;
var sequelize = db.sequelize;
var bcrypt = require('bcrypt');
var Q = require('q');

var User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true      }
    },
    encryptedPassword: {
      type: Sequelize.STRING
    }
  }, {
    classMethods: {},
    instanceMethods: {
      setPassword: function (password) {
        var user = this;
        var deferred = Q.defer();
        bcrypt.genSalt(10, function (err, salt) {
          if(err) return deferred.reject(err);
          bcrypt.hash(password, salt, function (err, hash) {
            if(err) return deferred.reject(err);
            user.setDataValue('encryptedPassword', hash);
            deferred.resolve(user);
          })
        });
        return deferred.promise;
      },
      comparePassword: function (password) {
        var deferred = Q.defer();
        bcrypt.compare(password, this.encryptedPassword, function (err, match) {
          if(err || !match) deferred.reject(err);
          else{
            deferred.resolve(null, true);
          }
        });
        return deferred.promise;
      },
      toJSON: function () {
        var val = this.get({plain:true});
        delete val.encryptedPassword;
        return val;
      }
    }
  }
);

module.exports = User;