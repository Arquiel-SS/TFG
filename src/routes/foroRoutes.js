// routes/foroRoutes.js
const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foroController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Hilos por juego
router.get('/:juegoId', foroController.listarHilos);
router.post('/:juegoId', foroController.crearHilo);

// Mensajes por hilo
router.get('/mensaje/:hiloId', foroController.listarMensajes);
router.post('/mensaje/:hiloId', foroController.crearMensaje);

// Likes
// router.post('/like/:mensajeId', foroController.darLike);

module.exports = router;