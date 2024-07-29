'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StarsPlanets', {
      StarId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stars',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Planets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StarsPlanets');
  }
};
