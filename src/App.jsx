import { useCallback, useState } from "react";
import "./App.css";
import Movies from "./components/Movies";
import useMovies from "./hook/useMovies";
import { useSearch } from "./hook/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setsort] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  // En el handleChange podemos hacer validaciones y prevalidaciones
  const handleChange = (e) => {
    // Obtenemos el valor actual para nuestras validaciones y evitar la asincronía que nos genera el setSearch para las mismas
    const search = e.target.value;
    if (search.startsWith(" ")) return;
    setSearch(search);
    if (error) return;
    debouncedGetMovies(search);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;

    // inyectamos por parametro
    getMovies({ search });
  };

  const handleSort = () => {
    setsort(!sort);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form onSubmit={handleSubmit}>
          <input
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
            type="text"
            onChange={handleChange}
            value={search}
            placeholder="Ej: Avengers, The Matrix"
          />
          <input type="checkbox" onChange={handleSort} />
          <button>Buscar</button>
        </form>
        {error && <p>{error}</p>}
      </header>
      <main>
        <Movies movies={movies}></Movies>
      </main>
    </div>
  );
}

export default App;
