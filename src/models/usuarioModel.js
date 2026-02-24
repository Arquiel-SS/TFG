const pool = require('../db/connection');

exports.crearUsuario = async (username, email, passwordHash) => {
    const [result] = await pool.query(
        "INSERT INTO Usuario (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, passwordHash]
    );
    return result;
};

exports.buscarPorEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM Usuario WHERE email = ?",
        [email]
    );
    return rows[0];
};