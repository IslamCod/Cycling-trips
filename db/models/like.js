const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Trip }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
      this.belongsTo(Trip, { foreignKey: 'trip_id' });
      // define association here
    }
  }
  Like.init({
    user_id: DataTypes.INTEGER,
    trip_id: DataTypes.INTEGER,
    like: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
