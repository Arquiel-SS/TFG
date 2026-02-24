const pool = require('../db/connection');

exports.obtenerTodos = async () => {
    // Seleccionamos todas las columnas existentes en la tabla
    const [rows] = await pool.query("SELECT * FROM Juego");
    return rows;
};