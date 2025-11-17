const { Client } = require('pg');

// Configuração da conexão direta (sem .env)
const client = new Client({
  host: 'dpg-d4dpn2ggjchc73bqvagg-a.render.com',  // Host fornecido pelo Render
  port: 5432,                                     // Porta padrão do PostgreSQL
  user: 'teste_postgresql_yks3_user',              // Usuário do banco de dados
  password: 'teste_postgresql_yks3_user',          // Senha do banco de dados
  database: 'teste_postgresql_yks3',               // Nome do banco de dados
  ssl: {                                          // Configuração SSL (requerido para conexões externas)
    rejectUnauthorized: false
  }
});

// Conectar ao banco de dados
client.connect()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
    
    // Aqui você pode rodar suas queries no banco de dados
    return client.query('SELECT NOW()');  // Exemplo de consulta
  })
  .then(result => {
    console.log('Resultado da consulta:', result.rows);
  })
  .catch(err => {
    console.error('Erro ao conectar ou consultar:', err.stack);
  })
  .finally(() => {
    // Fechar a conexão após as operações
    client.end();
  });
