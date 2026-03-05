const pool = require('../db/connection');

/**
 * Crea un nuevo usuario en la base de datos
 * @param {string} username - Nombre de usuario
 * @param {string} email - Email del usuario
 * @param {string} passwordHash - Contraseña hasheada
 * @returns {Promise<Object>} Resultado de la inserción
 */
exports.crearUsuario = async (username, email, passwordHash) => {
    const [result] = await pool.query(
        "INSERT INTO Usuario (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, passwordHash]
    );
    return result;
};

/**
 * Busca un usuario por email
 * @param {string} email - Email del usuario
 * @returns {Promise<Object|undefined>} Objeto usuario o undefined si no existe
 */
exports.buscarPorEmail = async (email) => {
    const [rows] = await pool.query(
        "SELECT * FROM Usuario WHERE email = ?",
        [email]
    );
    return rows[0];
};