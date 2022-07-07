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
    name: DataTypes.STRING,
    place: DataTypes.STRING,//? начало и конец
    length: DataTypes.STRING,
    link: DataTypes.TEXT,//?
    map: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};
