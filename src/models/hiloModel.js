// src/models/hiloModel.js
const db = require('../db/connection');

// Obtener hilos por juego
async function obtenerHilosPorJuego(juegoId) {
    try {
        const [rows] = await db.query(
            `SELECT 
                h.id, 
                h.titulo, 
                u.username AS autor, 
                (SELECT COUNT(*) FROM mensaje m WHERE m.hilo_id = h.id) AS total_mensajes,
                (SELECT m2.fecha_creacion FROM mensaje m2 WHERE m2.hilo_id = h.id ORDER BY m2.fecha_creacion DESC LIMIT 1) AS ultimo_mensaje_fecha,
                (SELECT u2.username FROM mensaje m3 
                    JOIN usuario u2 ON m3.usuario_id = u2.id 
                    WHERE m3.hilo_id = h.id 
                    ORDER BY m3.fecha_creacion DESC LIMIT 1
                ) AS ultimo_usuario
            FROM hilo h
            JOIN usuario u ON h.usuario_id = u.id
            WHERE h.juego_id = ?
            ORDER BY h.fecha_creacion DESC`,
            [juegoId]
        );
        return Array.isArray(rows) ? rows : [];
    } catch (err) {
        console.error("Error en modelo obtenerHilosPorJuego:", err);
        return [];
    }
}

// Crear nuevo hilo
async function crearHilo(juegoId, usuarioId, titulo, contenido) {
    try {
        // INSERT que preserva compatibilidad con esquema existente
        const [result] = await db.query(
            'INSERT INTO hilo (juego_id, usuario_id, titulo, contenido) VALUES (?, ?, ?, ?)',
            [juegoId, usuarioId, titulo, contenido]
        );

        // Devolver objeto compatible con dashboard.js
        return {
            id: result.insertId,
            titulo,
            autor: (await db.query('SELECT username FROM usuario WHERE id = ?', [usuarioId]))[0][0].username,
            total_mensajes: 1, // Ahora siempre tendrá al menos 1 mensaje (el del contenido inicial)
            ultimo_mensaje_fecha: null,
            ultimo_usuario: null
        };
    } catch (err) {
        console.error("Error en modelo crearHilo:", err);
        throw err;
    }
}

module.exports = {
    obtenerHilosPorJuego,
    crearHilo
};