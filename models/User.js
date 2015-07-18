var db = require('../config/sequelize');
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
      type: Sequelize.STRING,
      notEmpty: true
    },
    salt: {
      type: Sequelize.STRING,
      notEmpty: true
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
            user.setDataValue('salt', salt);
            user.setDataValue('encryptedPassword', hash);
            deferred.resolve(user);
          })
        });
        return deferred.promise;
      },
      comparePassword: function (password, cb) {
        var user = this;
        bcrypt.compare(password, user.encryptedPassword, function (err, match) {
          if(err) cb(err);
          if (match) {
            return cb(null);
          }else{
            cb(err);
          }
        });
      },
      toJSON: function () {
        var val = this.get({plain:true});
        delete val.encryptedPassword;
        delete val.salt;
        return val;
      }
    }
  }
);

module.exports = User;