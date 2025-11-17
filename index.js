// index.js
const { Pool } = require('pg');

// URL completa fornecida pelo Render
const connectionString = "postgresql://teste_postgresql_yks3_user:cBkLWDEkFhCc5Iifil1RWua5eaPMCnfo@dpg-d4dpn2ggjchc73bqvagg-a.oregon-postgres.render.com/teste_postgresql_yks3";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Render exige SSL
  }
});

async function main() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Conexão bem-sucedida! Hora atual no banco:', res.rows[0]);
  } catch (err) {
    console.error('Erro na conexão:', err);
  } finally {
    await pool.end();
  }
}

main();

