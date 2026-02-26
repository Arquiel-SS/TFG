const catalogoCarrusel = document.getElementById("catalogoCarrusel");
const vistaCatalogo = document.getElementById("vistaCatalogo");
const vistaJuego = document.getElementById("vistaJuego");
const gameInfo = document.getElementById("gameInfo");
const gameForo = document.getElementById("gameForo");
const subTabInfo = document.getElementById("subTabInfo");
const subTabForo = document.getElementById("subTabForo");
const volverCatalogoBtn = document.getElementById("volverCatalogo");

// Cargar catálogo desde API
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
        const juegos = Array.isArray(data) ? data : data.juegos || [];

        catalogoCarrusel.innerHTML = "";

        juegos.forEach(juego => {
            const li = document.createElement("div");
            li.className = "gameItem";
            li.innerHTML = `<img src="${juego.portada_url || 'https://via.placeholder.com/150x200?text=Sin+Portada'}" 
                             alt="${juego.titulo}" title="${juego.titulo}">`;
            li.addEventListener("click", () => mostrarJuego(juego));
            catalogoCarrusel.appendChild(li);
        });

    } catch (err) {
        catalogoCarrusel.innerHTML = '<p style="color:red;">Error al cargar los juegos</p>';
        console.error(err);
    }
}

// Mostrar juego seleccionado
function mostrarJuego(juego) {
    // Ocultar catálogo, mostrar vista juego
    vistaCatalogo.classList.add("hidden");
    vistaJuego.classList.remove("hidden");

    // Rellenar info
    gameInfo.innerHTML = `
        <h2>${juego.titulo}</h2>
        <p><strong>Género:</strong> ${juego.genero}</p>
        <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
        <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
        <p><strong>Fecha lanzamiento:</strong> ${juego.fecha_lanzamiento}</p>
        <p>${juego.descripcion || ""}</p>
        <p><strong>Rating:</strong> ${juego.rating || 2.5} / 5</p>
        ${juego.portada_url ? `<img src="${juego.portada_url}" alt="${juego.titulo}" style="max-width:200px;">` : ""}
    `;
}

// Tabs internas del juego
subTabInfo.addEventListener("click", () => {
    subTabInfo.classList.add("active");
    subTabForo.classList.remove("active");
    gameInfo.classList.remove("hidden");
    gameForo.classList.add("hidden");
});

subTabForo.addEventListener("click", () => {
    subTabForo.classList.add("active");
    subTabInfo.classList.remove("active");
    gameInfo.classList.add("hidden");
    gameForo.classList.remove("hidden");
});

// Botón volver al catálogo
volverCatalogoBtn.addEventListener("click", () => {
    vistaJuego.classList.add("hidden");
    vistaCatalogo.classList.remove("hidden");
});

// Iniciar
document.addEventListener("DOMContentLoaded", cargarCatalogo);