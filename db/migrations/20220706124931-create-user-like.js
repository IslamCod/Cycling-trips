module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserLikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // tableName
          key: 'id',
        },
      },
      trip_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trips', // tableName
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('UserLikes');
  },
};
