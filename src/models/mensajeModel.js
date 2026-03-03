const db = require('../db/connection');

async function obtenerMensajesPorHilo(hiloId) {
    const [rows] = await db.query(
        'SELECT * FROM mensaje WHERE hilo_id = ? ORDER BY fecha_envio ASC',
        [hiloId]
    );
    return rows;
}

async function crearMensaje(hiloId, usuarioId, contenido) {
    const [result] = await db.query(
        'INSERT INTO mensaje (hilo_id, usuario_id, contenido) VALUES (?, ?, ?)',
        [hiloId, usuarioId, contenido]
    );
    return { id: result.insertId, hilo_id: hiloId, usuario_id: usuarioId, contenido };
}

module.exports = {
    obtenerMensajesPorHilo,
    crearMensaje
};