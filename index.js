const express = require('express')

const app = express()

app.listen(3000, () => console.log('servidor rodando na porta 3000'))

app.get('/atendimentos', (request, response) => response.send('Você está na rota de atendimento e está realizando um GET'))