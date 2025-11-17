require('dotenv').config(); // Carrega as variáveis do arquivo .env

const { Client } = require('pg');

// Criando o cliente PostgreSQL com as variáveis do .env
const client = new Client({
    host: process.env.DB_HOST, // Obtém o valor de DB_HOST
    port: process.env.DB_PORT, // Obtém o valor de DB_PORT
    user: process.env.DB_USER, // Obtém o valor de DB_USER
    password: process.env.DB_PASSWORD, // Obtém o valor de DB_PASSWORD
    database: process.env.DB_NAME, // Obtém o valor de DB_NAME
    ssl: {
        rejectUnauthorized: false, // Necessário para conexões seguras no Render
    },
});

// Conectando ao banco
client.connect()
    .then(() => console.log('Conectado ao PostgreSQL no Render!'))
    .catch(err => console.error('Erro de conexão', err.stack));
