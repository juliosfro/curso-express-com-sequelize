const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

// Declaracao de todas as rotas presentes na aplicacao.
router.get('/pessoas', PessoaController.readAll);
router.get('/pessoas/:id', PessoaController.readById);
router.post('/pessoas', PessoaController.create);
router.put('/pessoas/:id', PessoaController.updateById);
router.delete('/pessoas/:id', PessoaController.deleteById);

/*  Vamos criar rota para buscar uma nova matricula.
    select * from Matriculas where Matriculas.estudante_id = 1 and Matriculas.id = 5;
    Esta fazendo uma consulta dentro da tabela de Matriculas passando dois parametros. 
*/
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula);

/* Rota para criar uma nova matricula de Pessoa */
router.post('/pessoas/:estudanteId/matricula', PessoaController.novaMatricula);

/* Rota para atualizar as informacoes de uma Matricula de Pessoa */
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula);

/* Rota para apagar a Matricula de uma Pessoa (estudante) 
   http://localhost:3000/pessoas/2/matricula/6
   SQL  =>  DELETE FROM `Matriculas` WHERE `id` = 6 AND `estudante_id` = 2
*/
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula);

module.exports = router;