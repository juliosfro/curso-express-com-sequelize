const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get('/home', (request, response) => response
                    .status(200)
                    .send({mensagem: 'Seja bem vindo a pagina inicial.'})
                 );

app.listen(port, () => console.log(`O servidor esta rodando na porta ${port}`));

console.log(`http://localhost:3000/home`);

module.exports = app;
