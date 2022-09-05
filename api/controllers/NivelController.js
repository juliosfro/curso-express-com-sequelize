const database = require('../models');

class NivelController {

    static async pegaTodosOsNiveis(_request, response) {
        try {
            const todosOsNiveis = await database.Niveis.findAll();

            response.status(200).json(todosOsNiveis);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    static async pegaUmNivel(request, response) {
        const { params } = request;
        const { id } = params;

        try {
            const nivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })

            response.status(200).json(nivel);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    static async criaNivel(request, response) {
        const { body } = request;
        const novoNivel = body;

        try {
            const novoNivelCriado = await database.Pessoas.create(novoNivel);

            response.status(200).json(novoNivelCriado);
        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    static async atualizaNivel(request, response) {
        const { params, body } = request;
        const { id } = params;
        const novaInfoNivel = body;

        try {
            await database.Pessoas.update(novaInfoNivel, { where: { id: Number(id) } });

            // O metodo update do sequelize retorna apenas zero ou um, fez ou nao fez.
            const nivelAtualizado = await database.Pessoas.findOne({ where: { id: Number(id) } });
            response.status(200).json(nivelAtualizado);

        } catch (error) {
            response.status(500).json(error.message);
        }
    }

    static async apagaNivel(request, response) {
        const { params } = request;
        const { id } = params;

        try {
            await database.Niveis.destroy({ where: { id: Number(id) } });

            response.status(200).json({ message: `Nivel id numero: ${id} apagado.` });
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;