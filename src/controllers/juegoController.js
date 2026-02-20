const Juego = require('../models/juegoModel');

async function getJuegos(req, res) {
    try {
        const juegos = await Juego.getAll();
        res.json(juegos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getJuegoById(req, res) {
    try {
        const juego = await Juego.getById(req.params.id);
        res.json(juego);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getJuegos, getJuegoById };