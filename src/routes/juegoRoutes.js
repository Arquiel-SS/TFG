// src/routes/juegoRoutes.js
const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juegoController');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todos los juegos
router.get('/', authMiddleware, juegoController.obtenerJuegos);

// Obtener juegos favoritos
router.get('/favoritos', authMiddleware, juegoController.obtenerFavoritos);

// Favoritos (añadir/quitar)
router.post('/:id/favorito', authMiddleware, juegoController.marcarFavorito);
router.delete('/:id/favorito', authMiddleware, juegoController.quitarFavorito);

// /src/routes/juegoRoutes.js
router.get('/search', authMiddleware, juegoController.buscarJuegos);

module.exports = router;