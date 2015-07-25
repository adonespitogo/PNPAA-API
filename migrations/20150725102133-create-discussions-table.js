'use strict';

module.exports = {
  up: function (migration, DataTypes) {

    migration.createTable('Discussions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: DataTypes.TEXT,
        length: 'long',
        allowNull: false
      },
      isPublic: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });


  },

  down: function (migration, DataTypes) {
    migration.dropTable('Discussions');
  }
};
