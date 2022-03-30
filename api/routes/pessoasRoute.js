const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

// Declaracao de todas as rotas presentes na aplicacao.
router.get('/pessoas', PessoaController.readAll);
router.get('/pessoas/:id', PessoaController.readById);
router.post('/pessoas', PessoaController.create);
router.put('/pessoas/:id', PessoaController.updateById);
router.delete('/pessoas/:id', PessoaController.deleteById);

module.exports = router;