const database = require('../models');

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
        try {
            const todosOsNiveis = await database.Niveis.findAll();
            return res.status(200).json(todosOsNiveis);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    // Funcao para buscar um registro de nivel por id.
    static async pegaUmNivel(request, response) {
        const { id } = request.params;
        try {
            const nivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return response.status(200).json(nivel);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    // Funcao para inserir um novo registro de nivel na base de dados.
    static async criaNivel(request, response) {
        const novoNivel = request.body;
        try {
            const novoNivelCriado = await database.Pessoas.create(novoNivel);
            return response.status(200).json(novoNivelCriado);
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    // Funcao para atualizar um registro por id.
    static async atualizaNivel(request, response) {
        const { id } = request.params;
        const novaInfoNivel = request.body;

        try {
            // Para inserir as novas informacoes de registro do nivel.
            await database.Pessoas.update(novaInfoNivel, { where: { id: Number(id) } });

            // O metodo update do sequelize retorna apenas zero ou um, fez ou nao fez.
            const nivelAtualizado = await database.Pessoas.findOne({ where: { id: Number(id) } });
            return response.status(200).json(nivelAtualizado);

        } catch (error) {
            return response.status(500).json(error.message);
        }
    }

    // Funcao para deletar um registro por id.
    static async apagaNivel(request, response) {
        const { id } = request.params;

        try {
            // O nome da funcao do sequelize para apagar registros eh destroy.
            await database.Niveis.destroy({ where: { id: Number(id) } });
            return response.status(200).json({ message: `Nivel id numero: ${id} apagado.` });
        } catch (error) {
            return response.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;