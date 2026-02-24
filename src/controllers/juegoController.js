const juegoModel = require('../models/juegoModel');

exports.getAll = async (req, res) => {
    try {
        const juegos = await juegoModel.obtenerTodos();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};