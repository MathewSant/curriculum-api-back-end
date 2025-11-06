const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do PostgreSQL com Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Testar conexão com o banco
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar com o banco:', err);
  } else {
    console.log('Conectado ao PostgreSQL com Neon!');
    release();
  }
});

// Importar rotas
const curriculoRoutes = require('./routes/curriculo');
app.use('/api', curriculoRoutes(pool));

// Rota inicial
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Currículos funcionando!',
    endpoints: {
      pessoas: '/api/pessoas',
      experiencias: '/api/experiencias',
      educacao: '/api/educacao',
      habilidades: '/api/habilidades'
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});