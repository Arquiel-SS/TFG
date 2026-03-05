/**
 * Servidor Express principal para la aplicación TFG
 * Configura rutas de API, middlewares y sirve archivos estáticos
 */

const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

const juegoRoutes = require('./src/routes/juegoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const authRoutes = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');
const foroRoutes = require('./src/routes/foroRoutes');

/**
 * Endpoint protegido - Requiere autenticación
 * @route GET /api/protegido
 * @middleware authMiddleware
 * @returns {Object} Mensaje de acceso concedido y datos del usuario
 */
app.get('/api/protegido', authMiddleware, (req, res) => {
    res.json({
        message: "Acceso concedido",
        usuario: req.usuario
    });
});

/**
 * Endpoint para obtener información del usuario autenticado
 * @route GET /api/me
 * @middleware authMiddleware
 * @returns {Object} Datos del usuario autenticado
 */
app.get('/api/me', authMiddleware, (req, res) => {
    res.json({
        message: "Usuario autenticado",
        usuario: req.usuario
    });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/juegos', juegoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/foro', foroRoutes);

/**
 * Ruta raíz - Sirve el dashboard principal
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});