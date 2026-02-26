const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');
const { SECRET } = require('../config/jwt');

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