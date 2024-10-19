import { useState, useEffect } from "react";
import Header from "./components/Header";
import useDebounce from "./hooks/useDebounce";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_OMDB_BASE_URL;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 800);

  useEffect(() => {
    fetchMovies(debouncedQuery);
  }, [debouncedQuery]);

  const fetchMovies = async (query, page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      const data = await response.json();
      setMovies(data.Search);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header onSearch={setSearchQuery} />
      {isLoading ? (
        "Loading..."
      ) : (
        <ul className="movies">
          {movies?.map((movie) => (
            <li key={movie.imdbID}>{JSON.stringify(movie)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
