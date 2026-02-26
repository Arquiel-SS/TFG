const pool = require('../db/connection');

exports.obtenerTodos = async () => {
    // Seleccionamos todas las columnas existentes en la tabla
    const [rows] = await pool.query("SELECT * FROM juego ORDER BY created_at DESC");
    return rows;
};

exports.obtenerJuegosConRating = async () => {
    const [rows] = await pool.query(`
        SELECT 
            j.*,
            IFNULL(AVG(v.puntuacion), 2.5) AS rating_medio
        FROM juego j
        LEFT JOIN valoracion v ON j.id = v.juego_id
        GROUP BY j.id
        ORDER BY rating_medio DESC
    `);

    return rows;
}