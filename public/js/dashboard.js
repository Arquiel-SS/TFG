// ================= DOM ELEMENTS =================
const catalogoCarrusel = document.getElementById("catalogoCarrusel");
const vistaCatalogo = document.getElementById("vistaCatalogo");
const vistaJuego = document.getElementById("vistaJuego");
const gameInfo = document.getElementById("gameInfo");
const gameForo = document.getElementById("gameForo");
const subTabInfo = document.getElementById("subTabInfo");
const subTabForo = document.getElementById("subTabForo");
const volverCatalogoBtn = document.getElementById("volverCatalogo");

// Perfil usuario
const perfilContainer = document.getElementById('perfilContainer');
const perfilMenu = document.getElementById('perfilMenu');
const usernameMenu = document.getElementById('usernameMenu');
const cerrarSesionBtn = document.getElementById('cerrarSesion');

// ================= VARIABLES =================
let juegos = [];
let juegoActual = null;

// ================= FUNCIONES =================

// Cargar catálogo
async function cargarCatalogo() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("/api/juegos", {
            headers: { "Authorization": "Bearer " + token }
        });
        const data = await response.json();
        juegos = Array.isArray(data) ? data : data.juegos || [];

        catalogoCarrusel.innerHTML = '';

        juegos.forEach(juego => {
            const item = document.createElement('div');
            item.className = 'gameItem';

            const img = document.createElement('img');
            img.src = juego.portada_url || 'https://via.placeholder.com/150x200?text=Sin+Portada';
            img.alt = juego.titulo;
            img.title = juego.titulo;

            img.addEventListener('click', () => mostrarJuego(juego));
            item.appendChild(img);
            catalogoCarrusel.appendChild(item);
        });

    } catch (err) {
        catalogoCarrusel.innerHTML = '<p style="color:red;">Error al cargar los juegos</p>';
        console.error(err);
    }
}

// Mostrar juego seleccionado
function mostrarJuego(juego) {
    juegoActual = juego;

    vistaCatalogo.classList.add('hidden');
    vistaJuego.classList.remove('hidden');

    gameInfo.innerHTML = `
        <h2>${juego.titulo}</h2>
        <p><strong>Género:</strong> ${juego.genero}</p>
        <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
        <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${juego.fecha_lanzamiento}</p>
        <p>${juego.descripcion || ""}</p>
        <img src="${juego.portada_url || 'https://via.placeholder.com/150x200?text=Sin+Portada'}" style="max-width:200px;">
    `;

    subTabInfo.classList.add('active');
    subTabForo.classList.remove('active');
    gameInfo.classList.remove('hidden');
    gameForo.classList.add('hidden');
}

// Tabs internas
subTabInfo.addEventListener('click', () => {
    subTabInfo.classList.add('active');
    subTabForo.classList.remove('active');
    gameInfo.classList.remove('hidden');
    gameForo.classList.add('hidden');
});

subTabForo.addEventListener('click', () => {
    subTabForo.classList.add('active');
    subTabInfo.classList.remove('active');
    gameInfo.classList.add('hidden');
    gameForo.classList.remove('hidden');
});

// Botón volver al catálogo
volverCatalogoBtn.addEventListener('click', () => {
    vistaJuego.classList.add('hidden');
    vistaCatalogo.classList.remove('hidden');
});

// Perfil usuario
perfilContainer.addEventListener('click', () => {
    perfilMenu.classList.toggle('hidden');
});

cerrarSesionBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});

// Cargar info usuario
async function cargarUsuario() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch('/api/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        usernameMenu.textContent = data.usuario.email || "Usuario";
        // avatar.src = data.usuario.avatar_url || avatar actual
    } catch (err) {
        console.error("Error cargando info usuario:", err);
    }
}

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', () => {
    cargarUsuario();
    cargarCatalogo();
});