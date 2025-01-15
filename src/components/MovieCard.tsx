import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '../types/movie';
import { useMovieStore } from '../store/movieStore';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieStore();
  const favorite = isFavorite(movie.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-[300px] object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★ {movie.vote_average.toFixed(1)}</span>
              <button
                onClick={toggleFavorite}
                className="ml-auto p-2 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={`w-6 h-6 ${favorite ? 'fill-red-500 text-red-500' : 'fill-none'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};