'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Dados do tipo e-mail inválido',
        }
      }
    },
    role: DataTypes.STRING
  }, {
    /* Irá preencher a coluna deletedAt mas não excluíra o registro do banco de dados. */
    paranoid: true,
    /* Irá trazer somente as pessoas ativas */
    defaultScope: {
      where: {
        ativo: true
      }
    },
    /* Podemos usar escopos personalizados. */
    scopes: {
      todos: { where: {} }
    }
  });
  Pessoas.associate = function (models) {
    // associations can be defined here
    // A.hasMany(B);
    // Pessoas tem relacao de um para muitos (1:n) com Turmas e Matriculas.
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    });
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id',
      scope: {
        status: 'confirmado',
        as: 'aulasMatriculadas'
      }
    });
  };
  return Pessoas;
};