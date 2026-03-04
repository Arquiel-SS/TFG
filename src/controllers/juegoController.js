const juegoModel = require('../models/juegoModel');
const Valoracion = require('../models/valoracionModel');
const Favorito = require('../models/favoritoModel');

// Obtener todos los juegos
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await juegoModel.obtenerTodos();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener favoritos del usuario
exports.obtenerFavoritos = async (req, res) => {
    const usuarioId = req.usuario.id;
    try {
        const favoritos = await Favorito.obtenerFavoritos(usuarioId);
        res.json(favoritos);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo favoritos" });
    }
};

exports.valorarJuego = async (req, res) => {
    const usuarioId = req.usuario.id;
    const juegoId = req.params.id;
    const { puntuacion } = req.body;

    if (puntuacion < 0 || puntuacion > 5) {
        return res.status(400).json({ error: "Puntuación inválida" });
    }

    try {
        await Valoracion.crearOActualizar(usuarioId, juegoId, puntuacion);
        res.json({ message: "Valoración guardada" });
    } catch (err) {
        res.status(500).json({ error: "Error guardando valoración" });
    }
};

exports.marcarFavorito = async (req, res) => {
    const usuarioId = req.usuario.id;
    const juegoId = req.params.id;
    try {
        await Favorito.agregar(usuarioId, juegoId);
        res.json({ message: "Juego añadido a favoritos" });
    } catch (err) {
        res.status(500).json({ error: "Error marcando favorito" });
    }
};

exports.quitarFavorito = async (req, res) => {
    const usuarioId = req.usuario.id;
    const juegoId = req.params.id;
    try {
        await Favorito.eliminar(usuarioId, juegoId);
        res.json({ message: "Juego quitado de favoritos" });
    } catch (err) {
        res.status(500).json({ error: "Error quitando favorito" });
    }
};