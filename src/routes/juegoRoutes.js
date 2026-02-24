const express = require('express');
const router = express.Router();
const juegoController = require('../controllers/juegoController');
const authMiddleware = require('../middleware/authMiddleware'); // protege la ruta

// Ruta protegida que devuelve todos los juegos
router.get('/', authMiddleware, juegoController.getAll);

module.exports = router;