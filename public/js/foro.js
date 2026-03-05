/**
 * Formatea una fecha al formato DD/MM/YYYY o YYYY-MM-DD HH:mm:ss
 * @param {string|Date} fecha - Fecha a formatear
 * @returns {string} Fecha formateada o cadena vacía
 */
function formatearFecha(fecha) {
    if (!fecha) return "";
    const f = new Date(fecha);
    return f.toLocaleString();
}

/**
 * Carga la lista de hilos desde el servidor
 */
async function cargarHilos() {
    try {
        const params = new URLSearchParams(window.location.search);
        const juegoId = params.get("juegoId");
        const res = await fetch(`/api/foro/${juegoId}`);
        const hilos = await res.json();

        if (!Array.isArray(hilos)) {
            console.error("Los hilos no son un array:", hilos);
            return;
        }

        const contenedor = document.getElementById("listaHilos");
        contenedor.innerHTML = "";

        hilos.forEach(hilo => {
            const div = document.createElement("div");
            div.classList.add("hilo-card");

            div.innerHTML = `
                <h3>${hilo.titulo}</h3>
                <p>Creado por: ${hilo.creador}</p>
                <p>${hilo.total_mensajes} mensajes</p>
                <p>Último mensaje por: ${hilo.ultimo_usuario || "—"}</p>
                <p>${formatearFecha(hilo.ultimo_mensaje_fecha)}</p>
            `;

            div.addEventListener("click", () => {
                window.location.href = `hilo.html?id=${hilo.id}`;
            });

            contenedor.appendChild(div);
        });
    } catch (err) {
        console.error("Error cargando hilos:", err);
    }
}

/**
 * Carga un hilo individual con todos sus mensajes
 */
async function cargarHiloIndividual() {
    const params = new URLSearchParams(window.location.search);
    const hiloId = params.get("id");

    try {
        const res = await fetch(`/api/foro/mensaje/${hiloId}`);
        const mensajes = await res.json();

        if (!Array.isArray(mensajes)) {
            console.error("Los mensajes no son un array:", mensajes);
            return;
        }

        const contenedor = document.getElementById("hiloContainer");
        contenedor.innerHTML = "";

        if (mensajes.length > 0) {
            const titulo = document.createElement("h2");
            titulo.textContent = mensajes[0].hilo_titulo || "Hilo";
            contenedor.appendChild(titulo);
        }

        mensajes.forEach(mensaje => {
            const div = document.createElement("div");
            div.classList.add("mensaje");

            div.innerHTML = `
                <strong>${mensaje.username}</strong>
                <small>${formatearFecha(mensaje.fecha_creacion)}</small>
                <p>${mensaje.contenido}</p>
                <button onclick="darLike(${mensaje.id}, this)">
                    ❤️ <span>${mensaje.likes}</span>
                </button>
            `;

            contenedor.appendChild(div);
        });

        document.getElementById("btnResponder").addEventListener("click", () => enviarRespuesta(hiloId));
    } catch (err) {
        console.error("Error cargando hilo individual:", err);
    }
}

/**
 * Aumenta el contador de likes de un mensaje
 * @param {number} id - ID del mensaje
 * @param {HTMLElement} boton - Elemento botón que contiene el contador
 */
async function darLike(id, boton) {
    try {
        const res = await fetch(`/api/mensaje/${id}/like`, { method: "POST" });
        const data = await res.json();
        boton.querySelector("span").textContent = data.likes;
    } catch (err) {
        console.error("Error al dar like:", err);
    }
}

/**
 * Envía una respuesta a un hilo
 * @param {number} hiloId - ID del hilo donde enviar la respuesta
 */
async function enviarRespuesta(hiloId) {
    const contenido = document.getElementById("respuestaInput").value;
    if (!contenido.trim()) return;

    try {
        await fetch(`/api/foro/mensaje/${hiloId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contenido })
        });

        location.reload();
    } catch (err) {
        console.error("Error enviando respuesta:", err);
    }
}

/**
 * Inicializa la aplicación al cargar el DOM
 */
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("listaHilos")) {
        cargarHilos();
    }

    if (document.getElementById("hiloContainer")) {
        cargarHiloIndividual();
    }
});