// src/models/hiloModel.js
const db = require('../db/connection');

/**
 * Obtiene todos los hilos de un juego específico
 * @param {number} juegoId - ID del juego
 * @returns {Promise<Array>} Array de hilos con metadatos
 */
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
        console.error("Error en obtenerHilosPorJuego:", err);
        return [];
    }
}

/**
 * Crea un nuevo hilo
 * @param {number} juegoId - ID del juego
 * @param {number} usuarioId - ID del usuario creador
 * @param {string} titulo - Título del hilo
 * @param {string} contenido - Contenido inicial (se guardará en BD)
 * @returns {Promise<Object>} Objeto hilo creado
 */
async function crearHilo(juegoId, usuarioId, titulo, contenido) {
    try {
        const [result] = await db.query(
            'INSERT INTO hilo (juego_id, usuario_id, titulo, contenido) VALUES (?, ?, ?, ?)',
            [juegoId, usuarioId, titulo, contenido]
        );

        const usuarioRow = await db.query('SELECT username FROM usuario WHERE id = ?', [usuarioId]);
        const username = usuarioRow[0][0]?.username || "Desconocido";

        return {
            id: result.insertId,
            titulo,
            autor: username,
            total_mensajes: 1,
            ultimo_mensaje_fecha: null,
            ultimo_usuario: null
        };
    } catch (err) {
        console.error("Error en crearHilo:", err);
        throw err;
    }
}

module.exports = {
    obtenerHilosPorJuego,
    crearHilo
};