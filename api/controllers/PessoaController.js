const Sequelize = require('sequelize')
const database = require('../models');

class PessoaController {

  // Funcao para ler e trazer todos os registros de pessoas que estao na base de dados.
  static async readAll(request, response) {
    try {
      const pessoas = await database.Pessoas.findAll();
      return response.status(200).json(pessoas);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  // Funcao para buscar um registro de pessoa por id.
  static async readById(request, response) {
    const { id } = request.params;
    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      })
      return response.status(200).json(pessoa);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  // Funcao para inserir um novo registro de pessoa na base de dados.
  static async create(request, response) {
    const novaPessoa = request.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
      return response.status(200).json(novaPessoaCriada);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  // Funcao para atualizar um registro por id.
  static async updateById(request, response) {
    const { id } = request.params;
    const novasInfosPessoa = request.body;

    try {
      // Para inserir as novas informacoes de registro de pessoa.
      await database.Pessoas.update(novasInfosPessoa, { where: { id: Number(id) } });

      // O metodo update do sequelize retorna apenas zero ou um, fez ou nao fez.
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } });
      return response.status(200).json(pessoaAtualizada);

    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  // Funcao para deletar um registro por id.
  static async deleteById(request, response) {
    const { id } = request.params;

    try {
      // O nome da funcao do sequelize para apagar registros eh destroy.
      await database.Pessoas.destroy({ where: { id: Number(id) } });
      return response.status(200).json({ message: `Pessoa id numero: ${id} apagada.` });
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

  // Funcao para buscar um registro de matricula por id.
  // select * from Matriculas where Matriculas.estudante_id = 1 and Matriculas.id = 5;
  // Esta fazendo uma consulta dentro da tabela de Matriculas passando dois parametros.
  static async pegaUmaMatricula(request, response) {
    const { estudanteId, matriculaId } = request.params;
    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })
      return response.status(200).json(matricula);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }

}

module.exports = PessoaController;