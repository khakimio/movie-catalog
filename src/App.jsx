import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchInfo from "./components/SearchInfo";
import Loader from "./components/Loader";
import useDebounce from "./hooks/useDebounce";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_OMDB_BASE_URL;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultCount, setResultCount] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 800);

  useEffect(() => {
    fetchMovies(debouncedQuery);
  }, [debouncedQuery]);

  const fetchMovies = async (query, page) => {
    setIsLoading(true);
    setResultCount(null);
    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setResultCount(data.totalResults);
      } else {
        resetResults();
      }

      setMovies(data.Search);
      setResultCount(data.totalResults);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetResults = () => {
    setMovies([]);
    setResultCount(0);
  };

  return (
    <div className="app">
      <Header onSearch={setSearchQuery} />
      <SearchInfo query={debouncedQuery} count={resultCount} />
      {isLoading ? (
        <Loader />
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
