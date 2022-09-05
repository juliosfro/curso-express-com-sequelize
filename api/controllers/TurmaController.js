const database = require('../models');

class TurmaController {

    static async pegaTodasAsTurmas(_request, response) {
        try {
            const todasAsTurmas = await database.Turmas.findAll();

            response.status(200).json(todasAsTurmas);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    // Funcao para buscar um registro de turma por id.
    static async pegaUmaTurma(request, response) {
        const { params } = request;
        const { id } = params;

        try {
            const nivel = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).json(nivel);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    // Funcao para inserir um novo registro de turma na base de dados.
    static async criaTurma(request, response) {
        const { body } = request;
        const novaTurma = body;

        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma);

            response.status(200).json(novaTurmaCriada);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    // Funcao para atualizar um registro por id.
    static async atualizaTurma(request, response) {
        const { params, body } = request;
        const { id } = params;
        const novasInfosTurma = body;

        try {
            // Para inserir as novas informacoes de registro do nivel.
            await database.Turmas.update(novasInfosTurma, { where: { id: Number(id) } });

            // O metodo update do sequelize retorna apenas zero ou um, fez ou nao fez.
            const nivelAtualizado = await database.Turmas.findOne({ where: { id: Number(id) } });
            response.status(200).json(nivelAtualizado);

        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    // Funcao para deletar um registro por id.
    static async apagaTurma(request, response) {
        const { params } = request;
        const { id } = params;

        try {
            // O nome da funcao do sequelize para apagar registros eh destroy.
            await database.Niveis.destroy({ where: { id: Number(id) } });

            response.status(200).json({ message: `Turma id numero: ${id} apagada.` });
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController;