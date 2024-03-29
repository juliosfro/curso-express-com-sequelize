'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Turmas', 'deletedAt', {
      allowNull: false,
      type: Sequelize.DATE
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Turmas', 'deletedAt');
  }
};