// src/controllers/foroController.js
const hiloModel = require('../models/hiloModel');
const mensajeModel = require('../models/mensajeModel');

/**
 * Lista todos los hilos de un juego específico
 * @param {Object} req - Express request object
 * @param {string} req.params.juegoId - ID del juego
 * @param {Object} res - Express response object
 */
exports.listarHilos = async (req, res) => {
    const juegoId = req.params.juegoId;

    try {
        const hilos = await hiloModel.obtenerHilosPorJuego(juegoId);
        res.json(Array.isArray(hilos) ? hilos : []);
    } catch (err) {
        console.error("Error listando hilos:", err);
        res.status(500).json({ error: "Error listando hilos" });
    }
};

/**
 * Crea un nuevo hilo en un juego con su primer mensaje
 * @param {Object} req - Express request object
 * @param {string} req.params.juegoId - ID del juego
 * @param {Object} req.body - Request body
 * @param {string} req.body.titulo - Título del hilo
 * @param {string} req.body.contenido - Contenido del primer mensaje
 * @param {Object} req.usuario - Usuario autenticado
 * @param {Object} res - Express response object
 */
exports.crearHilo = async (req, res) => {
    const juegoId = req.params.juegoId;
    const usuarioId = req.usuario.id;
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
        return res.status(400).json({ error: 'Faltan datos: título y/o contenido.' });
    }

    try {
        const hilo = await hiloModel.crearHilo(juegoId, usuarioId, titulo, contenido);
        const mensaje = await mensajeModel.crearMensaje(hilo.id, usuarioId, contenido);
        res.status(201).json(hilo);
    } catch (err) {
        console.error("Error creando hilo:", err);
        res.status(500).json({ error: "Error interno creando hilo" });
    }
};

/**
 * Lista todos los mensajes de un hilo específico
 * @param {Object} req - Express request object
 * @param {string} req.params.hiloId - ID del hilo
 * @param {Object} res - Express response object
 */
exports.listarMensajes = async (req, res) => {
    const hiloId = req.params.hiloId;

    try {
        const mensajes = await mensajeModel.obtenerMensajesPorHilo(hiloId);
        res.json(Array.isArray(mensajes) ? mensajes : []);
    } catch (err) {
        console.error("Error listando mensajes:", err);
        res.status(500).json({ error: "Error listando mensajes" });
    }
};

/**
 * Crea un nuevo mensaje dentro de un hilo
 * @param {Object} req - Express request object
 * @param {string} req.params.hiloId - ID del hilo
 * @param {Object} req.body - Request body
 * @param {string} req.body.contenido - Contenido del mensaje
 * @param {Object} req.usuario - Usuario autenticado
 * @param {Object} res - Express response object
 */
exports.crearMensaje = async (req, res) => {
    const hiloId = req.params.hiloId;
    const usuarioId = req.usuario.id;
    const { contenido } = req.body;

    if (!contenido) {
        return res.status(400).json({ error: 'Contenido vacío.' });
    }

    try {
        const mensaje = await mensajeModel.crearMensaje(hiloId, usuarioId, contenido);
        res.status(201).json(mensaje);
    } catch (err) {
        console.error("Error creando mensaje:", err);
        res.status(500).json({ error: "Error interno creando mensaje" });
    }
};