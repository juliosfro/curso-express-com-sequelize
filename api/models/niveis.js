'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Niveis = Sequelize.define('Niveis', {
    descr_nivel: DataTypes.STRING
  }, {});

  Niveis.associate = function (models) {
    // define association here
    // Niveis tem uma relacao de um para varios (1:n) com Turmas.
    Niveis.hasMany(models.Turmas, {
      foreignKey: 'nivel_id'
    });
  };
  return Niveis;
}
