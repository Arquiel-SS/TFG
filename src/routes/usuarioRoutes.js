const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/**
 * GET /api/usuarios
 * Obtiene la lista de todos los usuarios
 */
router.get('/', usuarioController.getUsuarios);

/**
 * GET /api/usuarios/:id
 * Obtiene un usuario específico por su ID
 */
router.get('/:id', usuarioController.getUsuarioById);

module.exports = router;