const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

// Declaracao de todas as rotas presentes na aplicacao.
router.get('/pessoas', PessoaController.readAll);
router.get('/pessoas/:id', PessoaController.readById);
router.post('/pessoas', PessoaController.create);
router.put('/pessoas/:id', PessoaController.updateById);
router.delete('/pessoas/:id', PessoaController.deleteById);

// Vamos criar rota para buscar uma nova matricula.
// select * from Matriculas where Matriculas.estudante_id = 1 and Matriculas.id = 5;
// Esta fazendo uma consulta dentro da tabela de Matriculas passando dois parametros.
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);

module.exports = router;