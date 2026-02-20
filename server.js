const express = require('express');
const path = require('path');

// Rutas
const juegoRoutes = require('./src/routes/juegoRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/juegos', juegoRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});