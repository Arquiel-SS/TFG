// =============================================
// DASHBOARD - APLICACIÓN PRINCIPAL
// =============================================

const catalogoCarrusel = document.getElementById("catalogoCarrusel");
const vistaCatalogo = document.getElementById("vistaCatalogo");
const vistaJuego = document.getElementById("vistaJuego");
const gameInfo = document.getElementById("gameInfo");
const gameForo = document.getElementById("gameForo");
const subTabInfo = document.getElementById("subTabInfo");
const subTabForo = document.getElementById("subTabForo");
const volverCatalogoBtn = document.getElementById("volverCatalogo");

const selectorVistaCat = document.getElementById("selectorVistaCat");
const perfilContainer = document.getElementById('perfilContainer');
const perfilMenu = document.getElementById('perfilMenu');
const usernameMenu = document.getElementById('usernameMenu');
const cerrarSesionBtn = document.getElementById('cerrarSesion');

const listaHilos = document.getElementById("listaHilos");
const foroCrear = document.getElementById("foroCrear");
const foroDetalle = document.getElementById("foroDetalle");
const crearHiloBtn = document.getElementById("crearHiloBtn");
const guardarHiloBtn = document.getElementById("guardarHilo");
const cancelarHiloBtn = document.getElementById("cancelarHilo");
const tituloHiloInput = document.getElementById("tituloHilo");
const contenidoHiloInput = document.getElementById("contenidoHilo");
const detalleTitulo = document.getElementById("detalleTitulo");
const detalleMensajes = document.getElementById("detalleMensajes");
const volverListaBtn = document.getElementById("volverLista");
const enviarRespuestaBtn = document.getElementById("enviarRespuesta");
const respuestaMensajeInput = document.getElementById("respuestaMensaje");

let juegos = [];
let juegoActual = null;
let hiloActual = null;

/**
 * Formatea una fecha al formato DD/MM/YYYY
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada o "Desconocida"
 */
function formatearFecha(fecha) {
    if (!fecha) return "Desconocida";
    
    try {
        if (typeof fecha === 'string') {
            const partes = fecha.split('T')[0];
            if (partes && partes.length === 10) {
                const [year, month, day] = partes.split('-');
                return `${day}/${month}/${year}`;
            }
        }
        
        const dateObj = new Date(fecha);
        if (!isNaN(dateObj.getTime())) {
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            return `${day}/${month}/${year}`;
        }
    } catch (e) {
        console.error("Error al formatear fecha:", e);
    }
    
    return "Desconocida";
}

/**
 * Carga el catálogo completo de juegos desde el servidor
 */
async function cargarCatalogo() {
    const token = localStorage.getItem("token");
    if (!token) return window.location.href = "/login.html";

    try {
        const res = await fetch("/api/juegos", {
            headers: { "Authorization": "Bearer " + token }
        });
        const data = await res.json();
        juegos = Array.isArray(data) ? data : [];

        catalogoCarrusel.innerHTML = "";
        juegos.forEach(juego => {
            const item = document.createElement('div');
            item.className = 'gameItem';
            const imgPath = juego.portada_url
                ? juego.portada_url
                : 'https://via.placeholder.com/150x200?text=Sin+Portada';
            const img = document.createElement('img');
            img.src = imgPath; 
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

/**
 * Carga solo los juegos favoritos del usuario
 */
async function cargarFavoritos() {
    const token = localStorage.getItem("token");
    if (!token) return window.location.href = "/login.html";

    try {
        const res = await fetch("/api/juegos/favoritos", {
            headers: { "Authorization": "Bearer " + token }
        });
        const data = await res.json();

        catalogoCarrusel.innerHTML = "";
        data.forEach(juego => {
            const item = document.createElement("div");
            item.className = 'gameItem';
            const imgPath = juego.portada_url
                ? juego.portada_url
                : 'https://via.placeholder.com/150x200?text=Sin+Portada';
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = juego.titulo;
            img.title = juego.titulo;
            img.addEventListener('click', () => mostrarJuego(juego));
            item.appendChild(img);
            catalogoCarrusel.appendChild(item);
        });
    } catch (err) {
        console.error("Error cargando favoritos:", err);
    }
}

/**
 * Cambia entre vista de favoritos y catálogo completo
 */
selectorVistaCat.addEventListener("change", () => {
    if (selectorVistaCat.value === "favoritos") {
        cargarFavoritos();
    } else {
        cargarCatalogo();
    }
});

/**
 * Alterna la visibilidad del menú de perfil
 */
perfilContainer.addEventListener('click', () => {
    perfilMenu.classList.toggle('hidden');
});

/**
 * Cierra la sesión del usuario
 */
cerrarSesionBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});

/**
 * Carga la información del usuario autenticado
 */
async function cargarUsuario() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const res = await fetch('/api/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!res.ok) return;

        const data = await res.json();
        usernameMenu.textContent = data.usuario?.email || "Usuario";
    } catch (err) {
        console.error("Error cargando info usuario:", err);
    }
}

/**
 * Muestra el detalle de un juego en la pantalla
 * @param {Object} juego - Objeto juego a mostrar
 */
function mostrarJuego(juego) {
    juegoActual = juego;
    vistaCatalogo.classList.add('hidden');
    vistaJuego.classList.remove('hidden');

    const imgPortada = juego.portada_url
        ? juego.portada_url
        : 'https://via.placeholder.com/150x200?text=Sin+Portada';

    gameInfo.innerHTML = `
        <h2>${juego.titulo}</h2>
        <img src="${imgPortada}" alt="${juego.titulo}" style="max-width:200px;">
        <p><strong>Género:</strong> ${juego.genero}</p>
        <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
        <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${formatearFecha(juego.fecha_lanzamiento)}</p>
        <p>${juego.descripcion || ""}</p>
        <button id="btnFavorito">💖 Favorito</button>
    `;

    document.getElementById("btnFavorito").addEventListener("click", async () => {
        const token = localStorage.getItem("token");

        const check = await fetch(`/api/juegos/favoritos`, {
            headers: { "Authorization": "Bearer " + token }
        });
        const favs = await check.json();
        const yaEsFav = favs.some(j => j.id === juegoActual.id);

        if (yaEsFav) {
            await fetch(`/api/juegos/${juegoActual.id}/favorito`, {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + token }
            });
            alert("Juego quitado de favoritos");
        } else {
            await fetch(`/api/juegos/${juegoActual.id}/favorito`, {
                method: "POST",
                headers: { "Authorization": "Bearer " + token }
            });
            alert("Juego añadido a favoritos");
        }
    });

    subTabInfo.classList.add('active');
    subTabForo.classList.remove('active');
    gameInfo.classList.remove('hidden');
    gameForo.classList.add('hidden');
}

/**
 * Busca juegos en tiempo real mientras se escribe en la barra de búsqueda
 */
document.getElementById("barraBusqueda").addEventListener("input", async (e) => {
    const query = e.target.value.trim();
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`/api/juegos/search?q=${encodeURIComponent(query)}`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const juegosFiltrados = await res.json();

        catalogoCarrusel.innerHTML = "";
        juegosFiltrados.forEach(juego => {
            const item = document.createElement("div");
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
        console.error("Error en la búsqueda:", err);
    }
});

/**
 * Muestra el formulario para crear un nuevo hilo
 */
crearHiloBtn.addEventListener("click", () => {
    listaHilos.classList.add("hidden");
    foroCrear.classList.remove("hidden");
    tituloHiloInput.value = "";
    contenidoHiloInput.value = "";
});

/**
 * Cancela la creación de un hilo y vuelve a la lista
 */
cancelarHiloBtn.addEventListener("click", () => {
    foroCrear.classList.add("hidden");
    listaHilos.classList.remove("hidden");
});

/**
 * Guarda un nuevo hilo en el servidor
 */
guardarHiloBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    if (!tituloHiloInput.value.trim() || !contenidoHiloInput.value.trim()) {
        return alert("Debes completar título y contenido.");
    }

    try {
        const res = await fetch(`/api/foro/juegos/${juegoActual.id}/hilos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                titulo: tituloHiloInput.value,
                contenido: contenidoHiloInput.value
            })
        });
        const data = await res.json();

        if (!res.ok) {
            return alert("Error creando hilo: " + (data.error || res.statusText));
        }

        foroCrear.classList.add("hidden");
        listaHilos.classList.remove("hidden");
        tituloHiloInput.value = "";
        contenidoHiloInput.value = "";

        await cargarHilos();
    } catch (err) {
        console.error("Error creando hilo:", err);
        alert("Error al crear el hilo.");
    }
});

/**
 * Cambia a la pestaña del foro y carga los hilos
 */
subTabForo.addEventListener("click", async () => {
    subTabInfo.classList.remove("active");
    subTabForo.classList.add("active");
    gameInfo.classList.add("hidden");
    gameForo.classList.remove("hidden");
    listaHilos.innerHTML = "";
    foroCrear.classList.add("hidden");
    foroDetalle.classList.add("hidden");
    await cargarHilos();
});

/**
 * Cambia a la pestaña de información del juego
 */
subTabInfo.addEventListener("click", () => {
    subTabInfo.classList.add("active");
    subTabForo.classList.remove("active");
    gameInfo.classList.remove("hidden");
    gameForo.classList.add("hidden");
    foroCrear.classList.add("hidden");
    foroDetalle.classList.add("hidden");
    listaHilos.innerHTML = "";
});

/**
 * Carga los hilos de un juego desde el servidor
 */
async function cargarHilos() {
    if (!juegoActual) return;
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`/api/foro/juegos/${juegoActual.id}/hilos`, {
            headers: { "Authorization": "Bearer " + token }
        });
        const hilos = await res.json();

        listaHilos.innerHTML = "";
        if (!Array.isArray(hilos) || hilos.length === 0) {
            listaHilos.innerHTML = "<p>No hay hilos aún.</p>";
            return;
        }

        hilos.forEach(hilo => {
            const div = document.createElement("div");
            div.className = "hiloItem";
            div.innerHTML = `
                <strong>${hilo.titulo}</strong><br>
                <small>Por ${hilo.autor || "Desconocido"}</small>
            `;
            div.addEventListener("click", () => abrirHilo(hilo));
            listaHilos.appendChild(div);
        });
    } catch (err) {
        console.error("Error cargando hilos:", err);
        listaHilos.innerHTML = '<p style="color:red;">Error de conexión al servidor</p>';
    }
}

/**
 * Abre un hilo para mostrar sus mensajes
 * @param {Object} hilo - Objeto hilo a abrir
 */
function abrirHilo(hilo) {
    hiloActual = hilo;
    listaHilos.classList.add("hidden");
    foroDetalle.classList.remove("hidden");
    detalleTitulo.textContent = hilo.titulo;
    detalleMensajes.innerHTML = "";
    
    cargarMensajes(hilo.id);
}

/**
 * Carga los mensajes de un hilo desde el servidor
 * @param {number} hiloId - ID del hilo
 */
async function cargarMensajes(hiloId) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`/api/foro/hilos/${hiloId}/mensajes`, {
            headers: { "Authorization": "Bearer " + token }
        });
        const mensajes = await res.json();

        detalleMensajes.innerHTML = "";
        if (!Array.isArray(mensajes) || mensajes.length === 0) {
            detalleMensajes.innerHTML = "<p>No hay mensajes en este hilo.</p>";
            return;
        }

        mensajes.forEach(m => {
            const div = document.createElement("div");
            div.className = "mensajeItem";
            div.innerHTML = `
                <p class="mensajeAutor"><strong>${m.username}</strong> • ${new Date(m.fecha).toLocaleString()}</p>
                <p>${m.contenido}</p>
                <hr>
            `;
            detalleMensajes.appendChild(div);
        });
    } catch (err) {
        console.error("Error cargando mensajes:", err);
        detalleMensajes.innerHTML = '<p style="color:red;">Error cargando mensajes</p>';
    }
}

/**
 * Envía una respuesta a un hilo
 */
enviarRespuestaBtn.addEventListener("click", async () => {
    const contenido = respuestaMensajeInput.value.trim();
    if (!contenido) return;

    const token = localStorage.getItem("token");
    try {
        const res = await fetch(`/api/foro/hilos/${hiloActual.id}/mensajes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ contenido })
        });
        const data = await res.json();

        if (!res.ok) {
            return alert("Error enviando respuesta: " + (data.error || res.statusText));
        }

        respuestaMensajeInput.value = "";
        cargarMensajes(hiloActual.id);
    } catch (err) {
        console.error("Error enviando respuesta:", err);
        alert("Error al enviar la respuesta.");
    }
});

/**
 * Vuelve a la lista de hilos desde la vista de detalle
 */
volverListaBtn.addEventListener("click", async () => {
    foroDetalle.classList.add("hidden");
    listaHilos.classList.remove("hidden");
    await cargarHilos();
});

/**
 * Vuelve al catálogo de juegos
 */
volverCatalogoBtn.addEventListener("click", () => {
    vistaJuego.classList.add("hidden");
    vistaCatalogo.classList.remove("hidden");
});

/**
 * Inicializa la aplicación al cargar el DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();
    cargarUsuario();
});
