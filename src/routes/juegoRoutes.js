const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juegoController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * GET /api/juegos
 * Obtiene todos los juegos del catálogo (requiere autenticación)
 */
router.get('/', authMiddleware, juegoController.obtenerJuegos);

/**
 * GET /api/juegos/favoritos
 * Obtiene los juegos favoritos del usuario autenticado
 */
router.get('/favoritos', authMiddleware, juegoController.obtenerFavoritos);

/**
 * POST /api/juegos/:id/favorito
 * Añade un juego a favoritos (requiere autenticación)
 */
router.post('/:id/favorito', authMiddleware, juegoController.marcarFavorito);

/**
 * DELETE /api/juegos/:id/favorito
 * Elimina un juego de favoritos (requiere autenticación)
 */
router.delete('/:id/favorito', authMiddleware, juegoController.quitarFavorito);

/**
 * GET /api/juegos/search?q=termino
 * Busca juegos por término (requiere autenticación)
 */
router.get('/search', authMiddleware, juegoController.buscarJuegos);

module.exports = router;