const juegoModel = require('../models/juegoModel');

exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await juegoModel.obtenerTodos();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.valorarJuego = async (req, res) => {
    const usuarioId = req.user.id;
    const juegoId = req.params.id;
    const { puntuacion } = req.body;

    if (puntuacion < 0 || puntuacion > 5) {
        return res.status(400).json({ error: "Puntuación inválida" });
    }

    await Valoracion.crearOActualizar(usuarioId, juegoId, puntuacion);

    res.json({ message: "Valoración guardada correctamente" });
};