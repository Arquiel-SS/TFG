const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const { SECRET } = require('../config/jwt');

/**
 * Registra un nuevo usuario en el sistema
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.username - Nombre de usuario
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña en texto plano
 * @param {Object} res - Express response object
 */
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        await usuarioModel.crearUsuario(username, email, hash);
        res.status(201).json({ message: "Usuario creado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Autentica un usuario y genera un JWT
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Email del usuario
 * @param {string} req.body.password - Contraseña en texto plano
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password_hash);

        if (!passwordValida) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            SECRET,
            { expiresIn: "2h" }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};