// src/controllers/foroController.js
const hiloModel = require('../models/hiloModel');
const mensajeModel = require('../models/mensajeModel');

// ================= HILOS =================

// Listar hilos de un juego
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

// Crear hilo nuevo
exports.crearHilo = async (req, res) => {
    const juegoId = req.params.juegoId;
    const usuarioId = req.usuario.id;
    const { titulo, contenido } = req.body;

    if (!titulo || !contenido) {
        return res.status(400).json({ error: 'Faltan datos: título y/o contenido.' });
    }

    try {
        // Crear el hilo
        const hilo = await hiloModel.crearHilo(juegoId, usuarioId, titulo, contenido);
        
        // Crear automáticamente el primer mensaje con el contenido del hilo
        const mensaje = await mensajeModel.crearMensaje(hilo.id, usuarioId, contenido);
        
        res.status(201).json(hilo);
    } catch (err) {
        console.error("Error creando hilo:", err);
        res.status(500).json({ error: "Error interno creando hilo" });
    }
};

// ================= MENSAJES =================

// Listar mensajes de un hilo
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

// Crear mensaje en hilo
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