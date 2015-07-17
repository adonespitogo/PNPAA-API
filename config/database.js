var Sequelize = require('sequelize');
var sequelize = null;
var config = require('./config.json');

// production
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL);
}
else {
  sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
      host: config.development.host,
      dialect: config.development.dialect,

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    }
  );
}

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;