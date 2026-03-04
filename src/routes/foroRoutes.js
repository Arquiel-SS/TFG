// src/routes/foroRoutes.js
const express = require('express');
const router = express.Router();

const foroController = require('../controllers/foroController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// === HILOS ===

// Obtener hilos de un juego
router.get('/juegos/:juegoId/hilos', foroController.listarHilos);

// Crear hilo nuevo
router.post('/juegos/:juegoId/hilos', foroController.crearHilo);

// === MENSAJES ===

// Obtener mensajes de un hilo
router.get('/hilos/:hiloId/mensajes', foroController.listarMensajes);

// Crear mensaje en hilo
router.post('/hilos/:hiloId/mensajes', foroController.crearMensaje);

module.exports = router;