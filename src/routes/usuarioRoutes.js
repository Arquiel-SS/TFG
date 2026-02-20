const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Obtener un usuario por id
router.get('/:id', usuarioController.getUsuarioById);

module.exports = router;