const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * POST /api/auth/register
 * Registra un nuevo usuario en el sistema
 */
router.post('/register', authController.register);

/**
 * POST /api/auth/login
 * Autentica un usuario y retorna un JWT
 */
router.post('/login', authController.login);

module.exports = router;