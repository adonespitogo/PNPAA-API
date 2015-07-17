module.exports = {
  up: function (migration, DataTypes) {
    migration.createTable(
      'Users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      },
      {
        engine: 'MYISAM', // default: 'InnoDB'
        charset: 'latin1' // default: null
      }
    );

  },
  down: function (migration, DataTypes) {
    migration.dropTable('Users');
  }
}