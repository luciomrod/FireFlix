import axios from 'axios';
import { MovieResponse } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNDZlZDhhYzg3NjU2OTY4ZWQzZmQwMTk2MGYxOGVhYyIsIm5iZiI6MTczNjg4MjMyMy44MTcsInN1YiI6IjY3ODZiODkzMWZjMGVjN2YwODdiMTdiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lpWRFKKNxZinYRuqsrXM7tud_2Ma73e5eEa4q4Wp1qY', // Replace with your TMDB access token
    'Content-Type': 'application/json'
  },
});

// Custom error handler
const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      throw new Error('Please check your TMDB access token');
    }
    throw new Error(error.response?.data?.message || 'An error occurred while fetching data');
  }
  throw error;
};

export const getMovies = async (page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await api.get('/movie/popular', { params: { page } });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};

export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<MovieResponse> => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        page,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};