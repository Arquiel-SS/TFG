const contenedorJuegos = document.getElementById("contenedor-juegos");

async function cargarJuegos() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("No estás autenticado");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("/api/juegos", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!response.ok) throw new Error("No autorizado o error en la API");

        const juegos = await response.json();
        const juegosArray = Array.isArray(juegos) ? juegos : [];

        // Limpiamos el contenedor
        contenedorJuegos.innerHTML = "";

        // Ordenamos por rating si existe
        juegosArray.sort((a, b) => (b.rating || 2.5) - (a.rating || 2.5));

        juegosArray.forEach(juego => {
            const li = document.createElement("li");
            li.className = "game-item";
            li.innerHTML = `
                <img src="${juego.portada_url || 'https://via.placeholder.com/150x200?text=Sin+Portada'}"
                     alt="${juego.titulo}" title="${juego.titulo}" style="cursor:pointer; max-width:150px;">
            `;
            li.addEventListener("click", () => mostrarInfoJuego(juego));
            contenedorJuegos.appendChild(li);
        });

    } catch (err) {
        contenedorJuegos.innerHTML = '<p style="color:red;">Error al cargar los juegos</p>';
        console.error("Error cargando juegos:", err);
    }
}

function mostrarInfoJuego(juego) {
    const infoDiv = document.getElementById("juegos");
    infoDiv.innerHTML = `
        <div style="border:1px solid black; padding:10px; margin:10px;">
            <h3>${juego.titulo}</h3>
            <p><strong>Género:</strong> ${juego.genero}</p>
            <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
            <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
            <p><strong>Fecha de lanzamiento:</strong> ${juego.fecha_lanzamiento}</p>
            <p>${juego.descripcion}</p>
            <img src="${juego.portada_url || 'https://via.placeholder.com/150x200?text=Sin+Portada'}" 
                 alt="${juego.titulo}" style="max-width:200px;">
            <p><strong>Rating:</strong> ${juego.rating || 2.5} / 5</p>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", cargarJuegos);

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});