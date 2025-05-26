import { useState } from "react";
import fetchMovies from "../../services/movieService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import SearchBar from "../SearchBar/SearchBar";
import css from "./App.module.css";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function App() {
  const [search, setSearch] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const searchMovie = (value: string): void => {
    setSearch(value);
  };
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [search],
    queryFn: () => fetchMovies(search),
    enabled: search !== '',
  });

  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setSelectedMovie(null);
    setModalOpen(false);
  };
  const selectMovie = (movie: Movie): void => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={searchMovie} />
      {data && (
        <MovieGrid movies={data.results as Movie[]} onSelect={selectMovie} />
      )}
      {modalOpen && <MovieModal movie={selectedMovie} onClose={closeModal} />}
      {isError && <ErrorMessage error={error} />}
      {isLoading && <Loader />}
    </div>
  );
}
