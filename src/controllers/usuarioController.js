const Usuario = require('../models/usuarioModel');

/**
 * Obtiene la lista de todos los usuarios
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/**
 * Obtiene un usuario específico por ID
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID del usuario
 * @param {Object} res - Express response object
 */
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.getById(req.params.id);
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};