'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { fetchTrendingMovies, clearSearchResults } from '../lib/slices/moviesSlice'
import { addToFavorites, removeFromFavorites } from '../lib/slices/preferencesSlice'
import { HeartIcon as HeartOutline, StarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

export default function MoviesFeed() {
  const dispatch = useAppDispatch()
  const { trending, searchResults, loading, searchLoading } = useAppSelector((state) => state.movies)
  const { favorites } = useAppSelector((state) => state.preferences)

  const displayMovies = searchResults.length > 0 ? searchResults : trending
  const isLoading = searchLoading || loading

  useEffect(() => {
    if (trending.length === 0) {
      dispatch(fetchTrendingMovies())
    }
  }, [dispatch, trending.length])

  const toggleFavorite = (movieId: number) => {
    if (favorites.movies.includes(movieId)) {
      dispatch(removeFromFavorites({ type: 'movies', id: movieId }))
    } else {
      dispatch(addToFavorites({ type: 'movies', id: movieId }))
    }
  }

  const clearSearch = () => {
    dispatch(clearSearchResults())
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {searchResults.length > 0 ? 'Movie Search Results' : 'Trending Movies'}
        </h2>
        {searchResults.length > 0 && (
          <button
            onClick={clearSearch}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            Clear Search
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
              <div className="aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
              <div className="p-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayMovies.slice(0, 20).map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : '/api/placeholder/300/450'
                  }
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover rounded-t-lg"
                />
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-red-500 hover:text-red-600"
                >
                  {favorites.movies.includes(movie.id) ? (
                    <HeartSolid className="h-4 w-4" />
                  ) : (
                    <HeartOutline className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <div className="flex items-center">
                    <StarIcon className="h-3 w-3 text-yellow-400 mr-1" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
