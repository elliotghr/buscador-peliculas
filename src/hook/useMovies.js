import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/searchMovies";

export default function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [test] = useState(null);
  let previousSearch = useRef(search);

  // Al dejar las dependencias vacias creamos la función una sola vez e inyectar el search por parametro evitamos que se creé con cada cambio
  const getMovies = useCallback(({ search }) => {
    if (search === previousSearch.current) return;
    searchMovies({ search }).then((res) => setMovies(res));
    previousSearch.current = search;
  }, []);
  // localeCompare compara con acentos
  // const getSortedMovies = () => {
  //   console.log("render");
  //   const sortedMovies = sort
  //     ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
  //     : movies;
  //   return sortedMovies;
  // };

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, test };
}
