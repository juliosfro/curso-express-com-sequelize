const bodyParser = require('body-parser');

const pessoas = require('./pessoasRoute');

// adicionamos as rotas de niveis e turmas
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

/*
module.exports = app => {
  app.use(bodyParser.json());
  app.use(pessoas);
}
*/

// Adicionamos as instâncias de níveis e turmas e refatoramos um pouco a função.
module.exports = app => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    pessoas,
    niveis,
    turmas
  )
}