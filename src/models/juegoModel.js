const pool = require('../db/connection');

exports.obtenerTodos = async () => {
    const [rows] = await pool.query("SELECT * FROM juego ORDER BY created_at DESC");
    return rows;
};

exports.obtenerRatingPorJuego = async (juegoId) => {
    const [rows] = await pool.query(`
        SELECT IFNULL(AVG(puntuacion), 0) AS rating,
            COUNT(*) AS total
        FROM valoracion
        WHERE juego_id = ?
    `, [juegoId]);

    return rows[0];
};

// Obtener calificación media y total de valoración
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

// Obtener juegos favoritos de un usuario
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

// Marcar favorito
exports.marcarFavorito = async (usuarioId, juegoId) => {
    return await pool.query(
        `INSERT INTO favorito (usuario_id, juego_id)
        VALUES (?, ?)`,
        [usuarioId, juegoId]
    );
};

// Quitar favorito
exports.quitarFavorito = async (usuarioId, juegoId) => {
    return await pool.query(
        `DELETE FROM favorito
        WHERE usuario_id = ? AND juego_id = ?`,
        [usuarioId, juegoId]
    );
};