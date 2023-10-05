"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Courses", "time", {
      type: Sequelize.TIME,
      allowNull: true,
    });

    await queryInterface.addColumn("Courses", "date", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Courses", "time");
    await queryInterface.removeColumn("Courses", "date");
  },
};
