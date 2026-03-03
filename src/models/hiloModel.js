const db = require('../db/connection');

async function obtenerHilosPorJuego(juegoId) {
    const [rows] = await db.query(
        `SELECT h.id, h.titulo, h.fecha_creacion, u.username AS autor
        FROM hilo h
        JOIN usuario u ON u.id = h.usuario_id
        WHERE h.juego_id = ?
        ORDER BY h.fecha_creacion DESC`,
        [juegoId]
    );
    return rows;
}

async function crearHilo(juegoId, usuarioId, titulo, contenido) {
    const [result] = await db.query(
        'INSERT INTO hilo (juego_id, usuario_id, titulo, contenido) VALUES (?, ?, ?, ?)',
        [juegoId, usuarioId, titulo, contenido]
    );
    return { id: result.insertId, juego_id: juegoId, usuario_id: usuarioId, titulo, contenido };
}

module.exports = {
    obtenerHilosPorJuego,
    crearHilo
};