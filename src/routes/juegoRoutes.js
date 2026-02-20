const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juegoController');

// Obtener todos los juegos
router.get('/', juegoController.getJuegos);

// Obtener un juego por id
router.get('/:id', juegoController.getJuegoById);

module.exports = router;