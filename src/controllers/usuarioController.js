const Usuario = require('../models/usuarioModel');

async function getUsuarios(req, res) {
    try {
        const usuarios = await Usuario.getAll();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getUsuarioById(req, res) {
    try {
        const usuario = await Usuario.getById(req.params.id);
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getUsuarios, getUsuarioById };