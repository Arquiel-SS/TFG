const pool = require('../db/connection');

const Favorito = {
    /**
     * Añade un juego a los favoritos de un usuario
     * @param {number} usuarioId - ID del usuario
     * @param {number} juegoId - ID del juego
     */
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

    /**
     * Elimina un juego de los favoritos de un usuario
     * @param {number} usuarioId - ID del usuario
     * @param {number} juegoId - ID del juego
     */
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

    /**
     * Obtiene todos los favoritos de un usuario
     * @param {number} usuarioId - ID del usuario
     * @returns {Promise<Array>} Array de juegos favoritos
     */
    async obtenerFavoritos(usuarioId) {
        const [rows] = await pool.query(
            `SELECT j.* FROM favorito f
            JOIN juego j ON j.id = f.juego_id
            WHERE f.usuario_id = ?`,
            [usuarioId]
        );
        return rows;
    },

    /**
     * Verifica si un juego es favorito de un usuario
     * @param {number} usuarioId - ID del usuario
     * @param {number} juegoId - ID del juego
     * @returns {Promise<boolean>} True si es favorito, false si no
     */
    async esFavorito(usuarioId, juegoId) {
        const [rows] = await pool.query(
            `SELECT 1 FROM favorito WHERE usuario_id = ? AND juego_id = ?`,
            [usuarioId, juegoId]
        );
        return rows.length > 0;
    }
};

module.exports = Favorito;