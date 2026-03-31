const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json()) // Middleware para ler JSON, deve vir ANTES do morgan

// 3.8: Criando um token personalizado chamado 'body'
morgan.token('body', (req, res) => {
  // Se for um POST, retorna o JSON do body em string
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  return ' ' // Se não for POST, retorna vazio
})

// 3.7 & 3.8: Configurando o morgan para usar o formato tiny + o nosso token 'body'
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// --- Suas rotas abaixo ---
// Exemplo:
// app.post('/api/persons', (req, res) => { ... })