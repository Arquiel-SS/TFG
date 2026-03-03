document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("listaHilos")) {
        cargarHilos();
    }

    if (document.getElementById("hiloContainer")) {
        cargarHiloIndividual();
    }

});

async function cargarHilos() {
    const res = await fetch("/api/hilos");
    const hilos = await res.json();

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
}

async function cargarHiloIndividual() {

    const params = new URLSearchParams(window.location.search);
    const hiloId = params.get("id");

    const res = await fetch(`/api/hilo/${hiloId}`);
    const data = await res.json();

    const contenedor = document.getElementById("hiloContainer");
    contenedor.innerHTML = "";

    // Cabecera del hilo
    const titulo = document.createElement("h2");
    titulo.textContent = data.hilo.titulo;

    const contenido = document.createElement("p");
    contenido.textContent = data.hilo.contenido;

    contenedor.appendChild(titulo);
    contenedor.appendChild(contenido);

    // Mensajes
    data.mensajes.forEach(mensaje => {

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

    // Responder
    document.getElementById("btnResponder")
        .addEventListener("click", () => enviarRespuesta(hiloId));
}

async function darLike(id, boton) {

    const res = await fetch(`/api/mensaje/${id}/like`, {
        method: "POST"
    });

    const data = await res.json();

    boton.querySelector("span").textContent = data.likes;
}

async function enviarRespuesta(hiloId) {

    const contenido = document.getElementById("respuestaInput").value;

    if (!contenido.trim()) return;

    await fetch(`/api/hilo/${hiloId}/mensaje`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contenido })
    });

    location.reload();
}

function formatearFecha(fecha) {
    if (!fecha) return "";

    const f = new Date(fecha);
    return f.toLocaleString();
}