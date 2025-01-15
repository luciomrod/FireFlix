import React, { useEffect, useState } from 'react';
import { Film, SortDesc, Heart } from 'lucide-react';
import { MovieGrid } from './components/MovieGrid';
import { getGenres } from './services/api';
import { useMovieStore } from './store/movieStore';
import { MovieCard } from './components/MovieCard';

function App() {
  const [genres, setGenres] = useState<{ id: number; name: string; }[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number>();
  const [sortByRating, setSortByRating] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const favorites = useMovieStore((state) => state.favorites);

  useEffect(() => {
    const loadGenres = async () => {
      const genreList = await getGenres();
      setGenres(genreList);
    };
    loadGenres();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-600" />
              <h1 className="text-2xl font-bold">FireFlix</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSortByRating(!sortByRating)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  sortByRating ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <SortDesc className="w-4 h-4" />
                <span>Sort by Rating</span>
              </button>
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  showFavorites ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Favorites ({favorites.length})</span>
              </button>
            </div>
          </div>
          {!showFavorites && (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGenre(undefined)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  !selectedGenre ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                All
              </button>
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => setSelectedGenre(genre.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedGenre === genre.id ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="py-8">
        {showFavorites ? (
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {favorites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        ) : (
          <MovieGrid selectedGenre={selectedGenre} sortByRating={sortByRating} />
        )}
      </main>
    </div>
  );
}

export default App;