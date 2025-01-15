import { create } from 'zustand';
import { Movie } from '../types/movie';

interface MovieStore {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
  favorites: [],
  addToFavorites: (movie) =>
    set((state) => ({
      favorites: [...state.favorites, movie],
    })),
  removeFromFavorites: (movieId) =>
    set((state) => ({
      favorites: state.favorites.filter((m) => m.id !== movieId),
    })),
  isFavorite: (movieId) =>
    get().favorites.some((movie) => movie.id === movieId),
}));