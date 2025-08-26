'use client'

import { useState, useCallback } from 'react'
import { useAppDispatch } from '../lib/hooks'
import { searchNews } from '../lib/slices/newsSlice'
import { searchMovies } from '../lib/slices/moviesSlice'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { debounce } from 'lodash'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'news' | 'movies'>('news')
  const dispatch = useAppDispatch()

  const debouncedSearch = useCallback(
    debounce((searchQuery: string, type: 'news' | 'movies') => {
      if (searchQuery.trim()) {
        if (type === 'news') {
          dispatch(searchNews(searchQuery))
        } else {
          dispatch(searchMovies(searchQuery))
        }
      }
    }, 500),
    [dispatch]
  )

  const handleSearch = (value: string) => {
    setQuery(value)
    debouncedSearch(value, activeTab)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'news'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Search News
        </button>
        <button
          onClick={() => setActiveTab('movies')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'movies'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          Search Movies
        </button>
      </div>

      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={`Search ${activeTab}...`}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
        />
      </div>
    </div>
  )
}
