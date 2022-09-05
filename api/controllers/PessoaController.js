import database from '../models';
class PessoaController {

  /* Essa função utilizara o escopo default */
  static async readAllActivePerson(_request, response) {
    try {
      const pessoasAtivas = await database.Pessoas.findAll();

      response.status(200).json(pessoasAtivas);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  /* Essa função utilizara o escopo personalizado todos */
  static async readAll(_request, response) {
    try {
      const pessoas = await database.Pessoas.scope('todos').findAll();

      response.status(200).json(pessoas);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  static async readById(request, response) {
    const { params } = request;
    const { id } = params;

    try {
      const pessoa = await database.Pessoas.findOne({
        where: {
          id: Number(id)
        }
      });

      response.status(200).json(pessoa);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  static async create(request, response) {
    const { body } = request;
    const novaPessoa = body;

    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa);

      response.status(200).json(novaPessoaCriada);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  static async updateById(request, response) {
    const { params, body } = request;
    const { id } = params;
    const novasInfosPessoa = body;

    try {
      await database.Pessoas.update(novasInfosPessoa, { where: { id: Number(id) } });

      // O metodo update do sequelize retorna apenas zero ou um, fez ou nao fez.
      const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } });
      response.status(200).json(pessoaAtualizada);

    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  static async deleteById(request, response) {
    const { params } = request;
    const { id } = params;

    try {
      // O nome da funcao do sequelize para apagar registros eh destroy.
      await database.Pessoas.destroy({ where: { id: Number(id) } });

      response.status(200).json({ message: `Pessoa id numero: ${id} apagada.` });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  /* Para desfazer a ação do soft delete com o paranoid e deletedAt */
  static async restauraPessoa(request, response) {
    const { params } = request;
    const { id } = params;

    try {
      await database.Pessoas.restore({ where: { id: Number(id) } });
      response.status(200).json({ mensagem: `id: ${id} restaurado.` })
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  // Funcao para buscar um registro de matricula por id.
  // select * from Matriculas where Matriculas.estudante_id = 1 and Matriculas.id = 5;
  // Esta fazendo uma consulta dentro da tabela de Matriculas passando dois parametros.
  static async pegaUmaMatricula(request, response) {

    const { params } = request;
    const { estudanteId, matriculaId } = params;

    try {
      const matricula = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      })

      response.status(200).json(matricula);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  static async novaMatricula(request, response) {
    const { params, body } = request;
    const { estudanteId } = params;
    const novaMatricula = { ...body, estudante_id: Number(estudanteId) }

    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);

      response.status(200).json(novaMatriculaCriada);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  // Funcao para atualizar um registro de Matricula.
  // http://localhost:3000/pessoas/1/matricula/5

  static async atualizaMatricula(request, response) {
    const { params, body } = request;
    const { estudanteId, matriculaId } = params;
    const novasInfosMatricula = body;

    try {
      await database.Matriculas.update(novasInfosMatricula, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      });

      // O metodo update do sequelize retorna apenas zero ou um, fez ou nao fez.
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: { id: Number(matriculaId) }
      });

      response.status(200).json(matriculaAtualizada);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  static async apagaMatricula(request, response) {
    const { params } = request;
    const { estudanteId, matriculaId } = params;

    try {
      // O nome da funcao do sequelize para apagar registros eh destroy.
      await database.Matriculas.destroy({
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        }
      });

      response.status(200).json({ message: `Matricula id numero: ${matriculaId} apagada.` });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

}

module.exports = PessoaController;