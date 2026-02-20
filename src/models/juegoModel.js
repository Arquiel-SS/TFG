const db = require('../db/connection');

async function getAll() {
    const [rows] = await db.query('SELECT * FROM Juego LIMIT 100');
    return rows;
}

async function getById(id) {
    const [rows] = await db.query('SELECT * FROM Juego WHERE id = ?', [id]);
    return rows[0];
}

module.exports = { getAll, getById };