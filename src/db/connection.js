const mysql = require('mysql2/promise');

/**
 * Pool de conexiones MySQL
 * Configurado para manejar múltiples conexiones concurrentes
 */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'main',
    password: '1234',
    database: 'TFG',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;