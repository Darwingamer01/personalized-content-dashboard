'use client'

import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { fetchNews, clearSearchResults } from '../lib/slices/newsSlice'
import { addToFavorites, removeFromFavorites } from '../lib/slices/preferencesSlice'
import { HeartIcon as HeartOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

export default function NewsFeed() {
  const dispatch = useAppDispatch()
  const { articles, searchResults, loading, searchLoading } = useAppSelector((state) => state.news)
  const { favorites, newsCategories } = useAppSelector((state) => state.preferences)
  const [selectedCategory, setSelectedCategory] = useState('general')

  const displayArticles = searchResults.length > 0 ? searchResults : articles
  const isLoading = searchLoading || loading

  useEffect(() => {
    dispatch(fetchNews(selectedCategory))
  }, [dispatch, selectedCategory])

  const toggleFavorite = (articleUrl: string) => {
    if (favorites.news.includes(articleUrl)) {
      dispatch(removeFromFavorites({ type: 'news', id: articleUrl }))
    } else {
      dispatch(addToFavorites({ type: 'news', id: articleUrl }))
    }
  }

  const clearSearch = () => {
    dispatch(clearSearchResults())
  }

  const categories = ['general', 'business', 'technology', 'entertainment', 'health', 'science', 'sports']

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {searchResults.length > 0 ? 'Search Results' : 'Latest News'}
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

      {searchResults.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm animate-pulse">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayArticles.slice(0, 12).map((article, index) => (
            <motion.article
              key={article.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <button
                    onClick={() => toggleFavorite(article.url)}
                    className="flex-shrink-0 ml-2 text-red-500 hover:text-red-600"
                  >
                    {favorites.news.includes(article.url) ? (
                      <HeartSolid className="h-5 w-5" />
                    ) : (
                      <HeartOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{article.source.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium"
                >
                  Read more →
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  )
}
