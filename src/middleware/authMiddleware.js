const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/jwt');

/**
 * Middleware para verificar autenticación mediante JWT
 * Extrae el token del header Authorization y verifica su validez
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.usuario = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido" });
    }
};