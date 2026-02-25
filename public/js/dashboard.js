// Contenedores de los carruseles y info
const highRatedGames = document.getElementById("highRatedGames");
const otherSuggestionsGames = document.getElementById("otherSuggestionsGames");
const infoDiv = document.getElementById("juegos");

// Función para cargar todos los juegos desde el backend
async function cargarJuegos() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("No estás autenticado");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("/api/juegos", {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error("No autorizado o error en la API");
        }

        const juegos = await response.json();

        // Aseguramos que sea array
        const juegosArray = Array.isArray(juegos) ? juegos : [];

        // Limpiamos contenedores
        highRatedGames.innerHTML = "";
        otherSuggestionsGames.innerHTML = "";
        infoDiv.innerHTML = "";

        // Ordenamos por rating, si no existe usamos 2.5
        const sortedJuegos = juegosArray.sort((a, b) => (b.rating || 2.5) - (a.rating || 2.5));

        sortedJuegos.forEach((juego, index) => {
            const portada = juego.portada_url || "https://via.placeholder.com/150x200?text=Sin+Portada";
            const li = document.createElement("li");
            li.className = "game-item";
            li.innerHTML = `<img src="${portada}" alt="${juego.titulo}" title="${juego.titulo}">`;

            li.addEventListener("click", () => mostrarInfoJuego(juego));

            if (index < 3) {
                highRatedGames.appendChild(li);
            } else {
                otherSuggestionsGames.appendChild(li);
            }
        });

    } catch (err) {
        infoDiv.innerHTML = '<p style="color:red;">Error al cargar los juegos</p>';
        console.error("Error cargando juegos:", err);
    }
}

// Función para mostrar información detallada de un juego
function mostrarInfoJuego(juego) {
    infoDiv.innerHTML = `
        <div style="border:1px solid black; padding:10px; margin:10px; background-color:#fff;">
            <h3>${juego.titulo}</h3>
            <p><strong>Género:</strong> ${juego.genero}</p>
            <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
            <p><strong>Desarrollador:</strong> ${juego.desarrollador}</p>
            <p><strong>Fecha de lanzamiento:</strong> ${juego.fecha_lanzamiento}</p>
            <p>${juego.descripcion}</p>
            ${juego.portada_url ? `<img src="${juego.portada_url}" alt="${juego.titulo}" style="max-width:200px;">` : ""}
            <p><strong>Rating:</strong> ${juego.rating || 2.5} / 5</p>
        </div>
    `;
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/login.html";
});

// Cargamos los juegos al abrir la página
document.addEventListener("DOMContentLoaded", cargarJuegos);