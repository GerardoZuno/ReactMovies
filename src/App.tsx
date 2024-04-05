import { useEffect, useState } from "react";
import "./App.css";
import { Movie } from "./interfaces";
import { Link } from "react-router-dom";
import { api } from "./utils/api";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${api}&page=${page}`
      );
      const data = await response.json();

      setMovies((prevState) => {
        const allMovies = [...prevState, ...data.results];

        const deleteDuplicated = allMovies.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
        return deleteDuplicated;
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const formatSearched = searchTitle.trim().toLowerCase();
    if (formatSearched.length > 0) {
      const filtered = movies.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(formatSearched) ||
          movie.release_date.toString().toLowerCase().includes(formatSearched)
          ||
          movie.id.toString().toLowerCase().includes(formatSearched)
        );
      });

      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchTitle, movies]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScrollEvent = (e: any) => {
    const endList =
      e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 50;
    if (endList) {
      const newPage = page + 1;
      setPage(newPage);
    }
  };

  return (
    <>
      <h1> Movies App </h1>

      <div className="input-container">
        <input
          className="input"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Buscar por titulo, id y fecha"
        />
      </div>

      <div onScroll={handleScrollEvent} className="container">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <div className="image-container">
                <img
                  className="image"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <p
                  style={{
                    color: "white",
                  }}
                >
                  {movie.title}
                  <p>Fecha de Estreno: {movie?.release_date.toString()}</p>
                  <p>Id: {movie?.id}</p>






                </p>
              </div>
            </Link>
          ))
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </>
  );
}

export default App;
