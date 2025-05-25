const cargarPeliculas = async () => {
    const contenedorTarjetas = document.getElementById("pelis-container");
    contenedorTarjetas.innerHTML = ""; // limpiar antes

    const apiKey = "1e13ae34471da399ada080287af489de";

    // Función para cargar películas, con o sin query de búsqueda
    const cargarPeliculas = async (query = "") => {
        const contenedorTarjetas = document.getElementById("pelis-container");
        contenedorTarjetas.innerHTML = ""; // limpiar antes

        // Se elige el endpoint según si hay búsqueda o no
        const url = query
            ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(query)}&page=1`
            : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;

        try {
            // Se hace el fetch a la API, el link depende de si hay búsqueda o no
            const response = await fetch(url);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                data.results.forEach((pelicula) => {
                    const tarjeta = document.createElement("div");
                    tarjeta.classList.add("card");
                    tarjeta.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w200${pelicula.poster_path}" alt="${pelicula.title}" />
                        <div class="card-content">
                            <h3>${pelicula.title}</h3>
                            <p>Año: ${pelicula.release_date ? pelicula.release_date.split('-')[0] : "N/A"}</p>
                            <p>Popularidad: ${pelicula.popularity.toFixed(1)}</p>
                            <button class="button">Agregar a mi lista</button>
                        </div>
                    `;

                    // Se agrega el evento al botón de agregar
                    const btnAgregar = tarjeta.querySelector("button");
                    btnAgregar.addEventListener("click", () => {
                        const misPeliculas = JSON.parse(localStorage.getItem("misPeliculas")) || [];
                        if (!misPeliculas.some(p => p.id === pelicula.id)) {
                            misPeliculas.push(pelicula);
                            localStorage.setItem("misPeliculas", JSON.stringify(misPeliculas));
                            alert(`“${pelicula.title}” agregada.`);
                        } else {
                            // Se alerta si la peli ya esta en tu lista
                            alert(`“${pelicula.title}” ya está en tu lista.`);
                        }
                    });

                    contenedorTarjetas.appendChild(tarjeta);
                });
            } else {
                contenedorTarjetas.innerHTML = `<p>${ query ? "No se encontraron resultados para “" + query + "”." : "No se encontraron películas." }</p>`;
            }

        } catch (error) {
            console.error("Error al cargar las películas:", error);
            contenedorTarjetas.innerHTML = "<p>Error al cargar las películas.</p>";
        }
    };

    // Cuando no hay query se cargan las películas populares
    document.addEventListener("DOMContentLoaded", () => {
        cargarPeliculas();
        const inputSearch = document.getElementById("search");
        inputSearch.addEventListener("keyup", (e) => {
            if (e.key === "Enter") {
                document.getElementById("searchBtn").click();
            }
        });
    });

    // Vincular el botón de búsqueda
    document.getElementById("searchBtn").addEventListener("click", () => {
        const query = document.getElementById("search").value.trim();
        cargarPeliculas(query);
    });
}

cargarPeliculas();