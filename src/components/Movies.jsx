import React from "react";
import RenderMovies from "./RenderMovies";
import NoMoviesResults from "./NoMoviesResults";

const Movies = ({ movies }) => {
  const hasMovies = movies?.length > 0;

  return hasMovies ? (
    <RenderMovies movies={movies}></RenderMovies>
  ) : (
    <NoMoviesResults></NoMoviesResults>
  );
};

export default Movies;
