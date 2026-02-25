const db = require('../config/db');

const Valoracion = {

    async crearOActualizar(usuarioId, juegoId, puntuacion) {
        await db.query(`
            INSERT INTO valoracion (usuario_id, juego_id, puntuacion)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE puntuacion = ?
        `, [usuarioId, juegoId, puntuacion, puntuacion]);
    }

};

module.exports = Valoracion;