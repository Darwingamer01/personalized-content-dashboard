'use client'

import { useAppSelector } from '../lib/hooks'
import { motion } from 'framer-motion'

export default function FavoritesSection() {
  const { favorites } = useAppSelector((state) => state.preferences)
  const totalFavorites = favorites.news.length + favorites.movies.length + favorites.social.length

  if (totalFavorites === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Your Favorites
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">
          No favorites yet. Start adding items to your favorites by clicking the heart icon!
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Favorites ({totalFavorites})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            News Articles ({favorites.news.length})
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {favorites.news.length > 0 ? (
              <ul className="space-y-1">
                {favorites.news.slice(0, 3).map((url, index) => (
                  <li key={index} className="truncate">
                    • Favorite article {index + 1}
                  </li>
                ))}
                {favorites.news.length > 3 && (
                  <li>• And {favorites.news.length - 3} more...</li>
                )}
              </ul>
            ) : (
              <p>No news favorites</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Movies ({favorites.movies.length})
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {favorites.movies.length > 0 ? (
              <ul className="space-y-1">
                {favorites.movies.slice(0, 3).map((id, index) => (
                  <li key={id} className="truncate">
                    • Movie ID: {id}
                  </li>
                ))}
                {favorites.movies.length > 3 && (
                  <li>• And {favorites.movies.length - 3} more...</li>
                )}
              </ul>
            ) : (
              <p>No movie favorites</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Social Posts ({favorites.social.length})
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {favorites.social.length > 0 ? (
              <ul className="space-y-1">
                {favorites.social.slice(0, 3).map((id, index) => (
                  <li key={id} className="truncate">
                    • Post ID: {id}
                  </li>
                ))}
                {favorites.social.length > 3 && (
                  <li>• And {favorites.social.length - 3} more...</li>
                )}
              </ul>
            ) : (
              <p>No social favorites</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
