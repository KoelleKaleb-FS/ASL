'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('StarsPlanets', {
      StarId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Stars',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      PlanetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Planets',
          key: 'id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('StarsPlanets');
  },
};
