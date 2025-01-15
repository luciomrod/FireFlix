import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';
import { getMovies, getMoviesByGenre } from '../services/api';

interface MovieGridProps {
  selectedGenre?: number;
  sortByRating?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ selectedGenre, sortByRating }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView();

  const loadMovies = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = selectedGenre
        ? await getMoviesByGenre(selectedGenre, page)
        : await getMovies(page);

      let newMovies = response.results;
      if (sortByRating) {
        newMovies = newMovies.sort((a, b) => b.vote_average - a.vote_average);
      }

      setMovies((prev) => [...prev, ...newMovies]);
      setHasMore(page < response.total_pages);
      setPage((p) => p + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMovies();
    }
  }, [inView]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, [selectedGenre, sortByRating]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {hasMore && (
        <div ref={ref} className="h-20 flex items-center justify-center">
          {loading && (
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
};