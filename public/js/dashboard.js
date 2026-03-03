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

// Foro DOM
const listaHilos = document.getElementById("listaHilos");
const foroCrear = document.getElementById("foroCrear");
const foroDetalle = document.getElementById("foroDetalle");
const foroLista = document.getElementById("gameForo"); // contenedor principal de lista

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

let hiloActual = null;

// ================= FUNCIONES =================

// -------- CATÁLOGO --------
async function cargarCatalogo() {
    const token = localStorage.getItem("token");
    if (!token) return window.location.href = "/login.html";

    try {
        const res = await fetch("/api/juegos", {
            headers: { "Authorization": "Bearer " + token }
        });
        const data = await res.json();
        juegos = Array.isArray(data) ? data : data.juegos || [];

        catalogoCarrusel.innerHTML = "";

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

// -------- JUEGO --------
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

// -------- TABS INTERNAS --------
subTabInfo.addEventListener('click', () => {
    subTabInfo.classList.add('active');
    subTabForo.classList.remove('active');
    gameInfo.classList.remove('hidden');
    gameForo.classList.add('hidden');
});

subTabForo.addEventListener('click', () => {
    subTabInfo.classList.remove('active');
    subTabForo.classList.add('active');
    gameInfo.classList.add('hidden');
    gameForo.classList.remove('hidden');

    cargarHilos();
});

// -------- BOTÓN VOLVER AL CATÁLOGO --------
volverCatalogoBtn.addEventListener('click', () => {
    vistaJuego.classList.add('hidden');
    vistaCatalogo.classList.remove('hidden');
});

// -------- PERFIL USUARIO --------
perfilContainer.addEventListener('click', () => {
    perfilMenu.classList.toggle('hidden');
});

cerrarSesionBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
});

async function cargarUsuario() {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const res = await fetch('/api/me', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        usernameMenu.textContent = data.usuario.email || "Usuario";
    } catch (err) {
        console.error("Error cargando info usuario:", err);
    }
}

// ================= FORO =================
async function cargarHilos() {
    if (!juegoActual) return;
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`/api/foro/${juegoActual.id}`, {
            headers: { "Authorization": "Bearer " + token }
        });

        const hilos = await res.json();

        if (!Array.isArray(hilos)) {
            console.error("Los hilos no son un array:", hilos);
            listaHilos.innerHTML = '<p style="color:red;">Error cargando los hilos</p>';
            return;
        }

        listaHilos.innerHTML = "";
        hilos.forEach(hilo => {
            const div = document.createElement("div");
            div.className = "hiloItem";
            div.innerHTML = `<strong>${hilo.titulo}</strong><br>
                            <small>Por ${hilo.usuario_id}</small>`;
            div.addEventListener("click", () => abrirHilo(hilo));
            listaHilos.appendChild(div);
        });

    } catch (err) {
        console.error("Error cargando hilos:", err);
        listaHilos.innerHTML = '<p style="color:red;">Error de conexión al servidor</p>';
    }
}

function abrirHilo(hilo) {
    hiloActual = hilo;

    foroLista.classList.add("hidden");
    foroDetalle.classList.remove("hidden");

    detalleTitulo.textContent = hilo.titulo;
    detalleMensajes.innerHTML = "";

    cargarMensajes(hilo.id);
}

async function cargarMensajes(hiloId) {
    const token = localStorage.getItem("token");

    try {
        const res = await fetch(`/api/foro/mensaje/${hiloId}`, {
            headers: { "Authorization": "Bearer " + token }
        });
        const mensajes = await res.json();

        detalleMensajes.innerHTML = "";
        mensajes.forEach(m => {
            const div = document.createElement("div");
            div.className = "mensajeItem";
            div.innerHTML = `
                <div class="mensajeAutor">${m.usuario_id}</div>
                <div>${m.contenido}</div>
            `;
            detalleMensajes.appendChild(div);
        });

    } catch (err) {
        console.error("Error cargando mensajes:", err);
        detalleMensajes.innerHTML = '<p style="color:red;">Error cargando mensajes</p>';
    }
}

// Crear hilo
crearHiloBtn.addEventListener("click", () => {
    foroLista.classList.add("hidden");
    foroCrear.classList.remove("hidden");
});

cancelarHiloBtn.addEventListener("click", () => {
    foroCrear.classList.add("hidden");
    foroLista.classList.remove("hidden");
});

guardarHiloBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    if (!tituloHiloInput.value || !contenidoHiloInput.value) return;

    try {
        const res = await fetch(`/api/foro/${juegoActual.id}`, {
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

        if (!res.ok) throw new Error("Error creando hilo");

        tituloHiloInput.value = "";
        contenidoHiloInput.value = "";
        foroCrear.classList.add("hidden");
        foroLista.classList.remove("hidden");

        cargarHilos();
    } catch (err) {
        console.error(err);
        alert("Error creando el hilo");
    }
});

// Crear mensaje en hilo
enviarRespuestaBtn.addEventListener("click", async () => {
    if (!respuestaMensajeInput.value.trim()) return;
    const token = localStorage.getItem("token");

    try {
        await fetch(`/api/foro/mensaje/${hiloActual.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ contenido: respuestaMensajeInput.value })
        });

        respuestaMensajeInput.value = "";
        cargarMensajes(hiloActual.id);
    } catch (err) {
        console.error(err);
        alert("Error enviando mensaje");
    }
});

// Volver a lista de hilos
volverListaBtn.addEventListener("click", () => {
    foroDetalle.classList.add("hidden");
    foroLista.classList.remove("hidden");
});

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', () => {
    cargarUsuario();
    cargarCatalogo();
});