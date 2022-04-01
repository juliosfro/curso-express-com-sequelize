'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Matriculas = Sequelize.define('Matriculas', {
    status: DataTypes.STRING
  }, {});

  Matriculas.associate = function (models) {
    // Matriculas pertence a Pessoas.
    Matriculas.belongsTo(models.Pessoas, {
      foreignKey: 'estudante_id'
    });

    // Matricula se relaciona com Turma.
    Matriculas.belongsTo(models.Turmas, {
      foreignKey: 'turma_id'
    });
  };

  /*
  Matriculas.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matriculas',
  });

  */
  return Matriculas;

};