const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Rutas
const juegoRoutes = require('./src/routes/juegoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const authRoutes = require('./src/routes/authRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');
const foroRoutes = require('./src/routes/foroRoutes');

app.get('/api/protegido', authMiddleware, (req, res) => {
    res.json({
        message: "Acceso concedido",
        usuario: req.usuario
    });
});

app.get('/api/me', authMiddleware, (req, res) => {
    res.json({
        message: "Usuario autenticado",
        usuario: req.usuario
    });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/juegos', juegoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/foro', foroRoutes);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});