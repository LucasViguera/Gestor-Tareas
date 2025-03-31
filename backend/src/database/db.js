// src/config/db.js
import mysql from 'mysql2';
import dotenv from 'dotenv';
import { URL } from 'url';

dotenv.config();

const dbUrl = new URL(process.env.DATABASE_URL);

const connection = mysql.createConnection({
  host: dbUrl.hostname,
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  port: dbUrl.port || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos: ' + err.stack);
    process.exit(1); // Termina el proceso si no se puede conectar
  }
  console.log('Conectado a la base de datos MySQL con ID ' + connection.threadId);
});

export default connection;
