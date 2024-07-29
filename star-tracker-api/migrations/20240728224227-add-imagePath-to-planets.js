'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if column exists before adding
    const tableDescription = await queryInterface.describeTable('Planets');
    if (!tableDescription.imagePath) {
      await queryInterface.addColumn('Planets', 'imagePath', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Check if column exists before removing
    const tableDescription = await queryInterface.describeTable('Planets');
    if (tableDescription.imagePath) {
      await queryInterface.removeColumn('Planets', 'imagePath');
    }
  }
};


