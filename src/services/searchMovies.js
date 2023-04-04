import whitoutResults from "../mocks/errorSearch.json";

export const searchMovies = ({ search }) => {
  if (!search) return;

  if (search) {
    return fetch(`https://www.omdbapi.com/?apikey=2d9aa9d8&s=${search}`)
      .then((res) => res.json())
      .then((json) => {
        const movies = json.Search;

        return movies?.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster,
        }));
      })
      .catch((err) => console.log(err));
  } else {
    return setResponseMovies(whitoutResults);
  }
};
