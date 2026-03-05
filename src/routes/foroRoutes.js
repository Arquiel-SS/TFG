const express = require('express');
const router = express.Router();

const foroController = require('../controllers/foroController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

/**
 * GET /api/foro/juegos/:juegoId/hilos
 * Lista todos los hilos de un juego específico
 */
router.get('/juegos/:juegoId/hilos', foroController.listarHilos);

/**
 * POST /api/foro/juegos/:juegoId/hilos
 * Crea un nuevo hilo en un juego (requiere autenticación)
 */
router.post('/juegos/:juegoId/hilos', foroController.crearHilo);

/**
 * GET /api/foro/hilos/:hiloId/mensajes
 * Obtiene todos los mensajes de un hilo específico
 */
router.get('/hilos/:hiloId/mensajes', foroController.listarMensajes);

/**
 * POST /api/foro/hilos/:hiloId/mensajes
 * Crea un nuevo mensaje en un hilo (requiere autenticación)
 */
router.post('/hilos/:hiloId/mensajes', foroController.crearMensaje);

module.exports = router;