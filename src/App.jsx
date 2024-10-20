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
  const [resultCount, setResultCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedQuery = useDebounce(searchQuery, 800);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      fetchMovies(debouncedQuery, 1);
      setHasSearched(true);
    }
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
        setResultCount(Number(data.totalResults));
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

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }

    if (!searchQuery.trim()) {
      return (
        <p className="movies-empty">
          Please enter a search term to find movies.
        </p>
      );
    }

    if (hasSearched && debouncedQuery && movies.length === 0) {
      return (
        <p className="movies-empty">
          No movies found. Please try a different search.
        </p>
      );
    }

    return (
      <>
        <SearchInfo query={debouncedQuery} count={resultCount} />
        <ul className="movies">
          {movies.map((movie) => (
            <li key={movie.imdbID}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
        {resultCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </>
    );
  };

  return (
    <div className="container">
      <Header onSearch={setSearchQuery} />
      {renderContent()}
    </div>
  );
}
