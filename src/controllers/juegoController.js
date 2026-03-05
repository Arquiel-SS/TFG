const juegoModel = require('../models/juegoModel');
const Favorito = require('../models/favoritoModel');

/**
 * Obtiene todos los juegos del catálogo
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await juegoModel.obtenerTodos();
        res.json(juegos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene los juegos favoritos del usuario autenticado
 * @param {Object} req - Express request object
 * @param {Object} req.usuario - Usuario autenticado
 * @param {Object} res - Express response object
 */
exports.obtenerFavoritos = async (req, res) => {
    const usuarioId = req.usuario.id;
    try {
        const favoritos = await Favorito.obtenerFavoritos(usuarioId);
        res.json(favoritos);
    } catch (err) {
        res.status(500).json({ error: "Error obteniendo favoritos" });
    }
};

/**
 * Añade un juego a favoritos del usuario
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID del juego
 * @param {Object} req.usuario - Usuario autenticado
 * @param {Object} res - Express response object
 */
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

/**
 * Elimina un juego de los favoritos del usuario
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID del juego
 * @param {Object} req.usuario - Usuario autenticado
 * @param {Object} res - Express response object
 */
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

/**
 * Busca juegos por término en el título
 * @param {Object} req - Express request object
 * @param {string} req.query.q - Término de búsqueda
 * @param {Object} res - Express response object
 */
exports.buscarJuegos = async (req, res) => {
    try {
        const term = req.query.q || "";
        const resultados = await juegoModel.buscarPorTitulo(term);
        res.json(resultados);
    } catch (error) {
        console.error("Error en búsqueda:", error);
        res.status(500).json({ error: "Error al buscar juegos" });
    }
};