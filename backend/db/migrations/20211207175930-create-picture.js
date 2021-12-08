'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pictures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      picture: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      userId: {
        onDelete: 'CASCADE',
        references: { model: 'Users' },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      albumId: {
        onDelete: 'CASCADE',
        references: { model: 'Albums' },
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('pictures');
  }
};
