const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Like }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.hasMany(Like, { foreignKey: 'trip_id' });
      this.belongsToMany(User, { through: 'UserLikes', foreignKey: 'user_id' });
    }
  }
  Trip.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    length: DataTypes.STRING,
    start: DataTypes.TEXT,
    finish: DataTypes.TEXT,
    map: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};
