const express = require('express')
const app = express()
const cors = require('cors') // 3.9: Importante para o frontend falar com o backend

app.use(cors()) // 3.9: Habilita o CORS
app.use(express.json())
app.use(express.static('dist')) // 3.11: Serve os arquivos estáticos da pasta dist

const express = require('express') // Importa o Express           
// Rota principal: o que acontece quando alguém acessa o endereço do servidor
app.get('/', (request, response) => {
  response.send('<h1>Olá Mundo! O servidor está funcionando.</h1>')
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})