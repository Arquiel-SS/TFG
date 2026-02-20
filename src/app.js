const express = require('express');
const pool = require('./src/db/connection');

const app = express();
const port = 3000;

app.get('/juegos', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Juego');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la base de datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});