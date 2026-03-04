// src/models/favoritoModel.js
const pool = require('../db/connection');

const Favorito = {
    async agregar(usuarioId, juegoId) {
        try {
            await pool.query(
                `INSERT INTO favorito (usuario_id, juego_id) VALUES (?, ?)
                 ON DUPLICATE KEY UPDATE usuario_id = usuario_id`,
                [usuarioId, juegoId]
            );
        } catch (err) {
            throw err;
        }
    },

    async eliminar(usuarioId, juegoId) {
        try {
            await pool.query(
                "DELETE FROM favorito WHERE usuario_id = ? AND juego_id = ?",
                [usuarioId, juegoId]
            );
        } catch (err) {
            throw err;
        }
    },

    async obtenerFavoritos(usuarioId) {
        const [rows] = await pool.query(
            `SELECT j.* FROM favorito f
            JOIN juego j ON j.id = f.juego_id
            WHERE f.usuario_id = ?`,
            [usuarioId]
        );
        return rows;
    },

    async esFavorito(usuarioId, juegoId) {
        const [rows] = await pool.query(
            `SELECT 1 FROM favorito WHERE usuario_id = ? AND juego_id = ?`,
            [usuarioId, juegoId]
        );
        return rows.length > 0;
    }
};

module.exports = Favorito;