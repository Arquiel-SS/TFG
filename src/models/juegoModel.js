const pool = require('../db/connection');

/**
 * Obtiene todos los juegos ordenados por fecha de creación descendente
 * @returns {Promise<Array>} Array de todos los juegos
 */
exports.obtenerTodos = async () => {
    const [rows] = await pool.query("SELECT * FROM juego ORDER BY created_at DESC");
    return rows;
};

/**
 * Obtiene la calificación promedio y total de valoraciones de un juego
 * @param {number} juegoId - ID del juego
 * @returns {Promise<Object>} Objeto con rating y total de valoraciones
 */
exports.obtenerRatingPorJuego = async (juegoId) => {
    const [rows] = await pool.query(`
        SELECT IFNULL(AVG(puntuacion), 0) AS rating,
            COUNT(*) AS total
        FROM valoracion
        WHERE juego_id = ?
    `, [juegoId]);
    return rows[0];
};

/**
 * Obtiene la calificación promedio de un juego
 * @param {number} juegoId - ID del juego
 * @returns {Promise<Object>} Objeto con promedio y total
 */
exports.obtenerRating = async (juegoId) => {
    const [rows] = await pool.query(
        `SELECT 
            IFNULL(AVG(puntuacion), 0) AS promedio,
            COUNT(*) AS total
        FROM valoracion
        WHERE juego_id = ?`,
        [juegoId]
    );
    return rows[0];
};

/**
 * Obtiene los juegos favoritos de un usuario
 * @param {number} usuarioId - ID del usuario
 * @returns {Promise<Array>} Array de juegos favoritos
 */
exports.obtenerFavoritosPorUsuario = async (usuarioId) => {
    const [rows] = await pool.query(
        `SELECT j.*
        FROM juego j
        JOIN favorito f ON f.juego_id = j.id
        WHERE f.usuario_id = ?`,
        [usuarioId]
    );
    return rows;
};

/**
 * Marca un juego como favorito de un usuario
 * @param {number} usuarioId - ID del usuario
 * @param {number} juegoId - ID del juego
 * @returns {Promise<Object>} Resultado de la inserción
 */
exports.marcarFavorito = async (usuarioId, juegoId) => {
    return await pool.query(
        `INSERT INTO favorito (usuario_id, juego_id)
        VALUES (?, ?)`,
        [usuarioId, juegoId]
    );
};

/**
 * Quita un juego de los favoritos de un usuario
 * @param {number} usuarioId - ID del usuario
 * @param {number} juegoId - ID del juego
 * @returns {Promise<Object>} Resultado de la eliminación
 */
exports.quitarFavorito = async (usuarioId, juegoId) => {
    return await pool.query(
        `DELETE FROM favorito
        WHERE usuario_id = ? AND juego_id = ?`,
        [usuarioId, juegoId]
    );
};

/**
 * Busca juegos por término en el título
 * @param {string} term - Término de búsqueda
 * @returns {Promise<Array>} Array de juegos que coinciden
 */
exports.buscarPorTitulo = async (term) => {
    const searchValue = `%${term}%`;
    const [rows] = await pool.query(
        `SELECT * FROM juego
        WHERE titulo LIKE ?`,
        [searchValue]
    );
    return rows;
};