const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'mit_backend',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db; 