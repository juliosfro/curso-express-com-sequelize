const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.readAll);
router.get('/pessoas/:id', PessoaController.readById);
router.post('/pessoas', PessoaController.create);
module.exports = router;