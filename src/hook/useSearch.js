import React, { useEffect, useState, useRef } from "react";

export const useSearch = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  //   bandera para saber si es primer render
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === "";
      return;
    }
    if (!search) {
      setError("No se puede buscar una pelicula vacia");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se puede hacer una busqueda con un número");
      return;
    }
    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }
    setError(null);
  }, [search]);

  return { search, setSearch, error };
};
