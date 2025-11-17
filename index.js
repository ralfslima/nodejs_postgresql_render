
// index.js
import express from 'express';
import pkg from 'pg';


const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com PostgreSQL usando a DATABASE_URL do Render
const pool = new Pool({
//   connectionString: process.env.DATABASE_URL || "postgresql://teste_postgresql_yks3_user:cBkLWDEkFhCc5Iifil1RWua5eaPMCnfo@dpg-d4dpn2ggjchc73bqvagg-a.oregon-postgres.render.com/teste_postgresql_yks3",
 connectionString: process.env.DATABASE_URL,  
ssl: { rejectUnauthorized: false }
});

// Middleware para interpretar JSON
app.use(express.json());

// Endpoint raiz
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

// Endpoint para testar conexão com o banco
app.get('/db/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ horaBanco: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Falha na conexão com o banco' });
  }
});

// Exemplo de endpoint para listar dados de uma tabela chamada "usuarios"
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});




// TESTE DE CONEXÃO
// // index.js
// const { Pool } = require('pg');

// // URL completa fornecida pelo Render
// const connectionString = "postgresql://teste_postgresql_yks3_user:cBkLWDEkFhCc5Iifil1RWua5eaPMCnfo@dpg-d4dpn2ggjchc73bqvagg-a.oregon-postgres.render.com/teste_postgresql_yks3";

// const pool = new Pool({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: false // Render exige SSL
//   }
// });

// async function main() {
//   try {
//     const res = await pool.query('SELECT NOW()');
//     console.log('Conexão bem-sucedida! Hora atual no banco:', res.rows[0]);
//   } catch (err) {
//     console.error('Erro na conexão:', err);
//   } finally {
//     await pool.end();
//   }
// }

// main();

