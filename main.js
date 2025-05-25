const cargarPeliculas = async () => {
    // Contenedor para mostrar las películas
    const contenedorTarjetas = document.getElementById("pelis-container");
    contenedorTarjetas.innerHTML = ""; // limpiar antes

    const apiKey = "1e13ae34471da399ada080287af489de";

    // Se hace un fetch a las pelis mas populares
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES&page=1`);
        const data = await response.json();
        console.log(data);
        

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
                        <button class="button">Agregar a mi lista :)</button>
                    </div>
                `;

                contenedorTarjetas.appendChild(tarjeta);
            });
        } else {
            contenedorTarjetas.innerHTML = "<p>No se encontraron películas.</p>";
        }

    } catch (error) {
        console.error("Error al cargar las películas:", error);
        contenedorTarjetas.innerHTML = "<p>Error al cargar las películas.</p>";
    }
}

cargarPeliculas();

const listaPeliculas = async () => {
    
}