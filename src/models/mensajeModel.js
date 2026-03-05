// src/models/mensajeModel.js
const db = require('../db/connection');

/**
 * Obtiene todos los mensajes de un hilo ordenados por fecha
 * @param {number} hiloId - ID del hilo
 * @returns {Promise<Array>} Array de mensajes
 */
async function obtenerMensajesPorHilo(hiloId) {
    try {
        const [rows] = await db.query(`
            SELECT 
                m.id, 
                m.contenido, 
                m.fecha_creacion AS fecha, 
                u.username
            FROM mensaje m
            JOIN usuario u ON u.id = m.usuario_id
            WHERE m.hilo_id = ?
            ORDER BY m.fecha_creacion ASC
        `, [hiloId]);
        return rows;
    } catch (err) {
        console.error("Error en obtenerMensajesPorHilo:", err);
        throw new Error("Error en base de datos");
    }
}

/**
 * Crea un nuevo mensaje en un hilo
 * @param {number} hiloId - ID del hilo
 * @param {number} usuarioId - ID del usuario creador
 * @param {string} contenido - Contenido del mensaje
 * @returns {Promise<Object>} Objeto mensaje creado
 */
async function crearMensaje(hiloId, usuarioId, contenido) {
    try {
        const [result] = await db.query(
            'INSERT INTO mensaje (hilo_id, usuario_id, contenido) VALUES (?, ?, ?)',
            [hiloId, usuarioId, contenido]
        );
        return {
            id: result.insertId,
            hilo_id: hiloId,
            usuario_id: usuarioId,
            contenido
        };
    } catch (err) {
        console.error("Error en crearMensaje:", err);
        throw new Error("Error en base de datos");
    }
}

module.exports = {
    obtenerMensajesPorHilo,
    crearMensaje
};