import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchInfo from "./components/SearchInfo";
import Loader from "./components/Loader";
import useDebounce from "./hooks/useDebounce";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_OMDB_BASE_URL;

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultCount, setResultCount] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 800);

  useEffect(() => {
    fetchMovies(debouncedQuery, 1);
  }, [debouncedQuery]);

  const fetchMovies = async (query, page) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setResultCount(data.totalResults);
        setTotalPages(Math.ceil(data.totalResults / 10));
        setCurrentPage(page);
      } else {
        resetResults();
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      resetResults();
    } finally {
      setIsLoading(false);
    }
  };

  const resetResults = () => {
    setMovies([]);
    setResultCount(0);
    setTotalPages(1);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    fetchMovies(searchQuery, page);
  };

  return (
    <div className="container">
      <Header onSearch={setSearchQuery} />
      <SearchInfo query={debouncedQuery} count={resultCount} />
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="movies">
          {movies?.map((movie) => (
            <li key={movie.imdbID}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
      {resultCount > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
