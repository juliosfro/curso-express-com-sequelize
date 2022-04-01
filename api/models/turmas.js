'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Turmas = sequelize.define('Turmas', {
    data_inicio: DataTypes.DATEONLY
  }, {});

  Turmas.associate = function (models) {
    // define association here

    // Turmas tem uma relacao de um para varios (1:n) com Matriculas.
    Turmas.hasMany(models.Matriculas, {
      foreignKey: 'turma_id'
    });

    // A segunda parte eh dizer a quem pertence, sendo que a primeira eh a cardinalidade hasMany por exemplo.
    Turmas.belongsTo(models.Pessoas, {
      foreignKey: 'docente_id'
    });

    // Turma se associa com Niveis.
    Turmas.belongsTo(models.Niveis, {
      foreignKey: 'nivel_id'
    });
  };
  return Turmas;
};