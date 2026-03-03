// src/models/mensajeModel.js
const db = require('../db/connection');

async function obtenerMensajesPorHilo(hiloId) {
    try {
        const [rows] = await db.query(`
            SELECT m.id, m.contenido, m.fecha_envio AS fecha_creacion,
                u.username, COALESCE(m.likes, 0) AS likes
            FROM mensaje m
            JOIN usuario u ON u.id = m.usuario_id
            WHERE m.hilo_id = ?
            ORDER BY m.fecha_envio ASC
        `, [hiloId]);
        return rows; // siempre array
    } catch (err) {
        console.error("Error en DB obteniendo mensajes:", err);
        throw new Error("Error en base de datos");
    }
}

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
        console.error("Error en DB creando mensaje:", err);
        throw new Error("Error en base de datos");
    }
}

module.exports = {
    obtenerMensajesPorHilo,
    crearMensaje
};