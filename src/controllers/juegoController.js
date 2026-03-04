const juegoModel = require('../models/juegoModel');
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