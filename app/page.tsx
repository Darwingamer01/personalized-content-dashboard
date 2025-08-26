'use client'

import { useSession } from 'next-auth/react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import DraggableLayout from '../components/DraggableLayout'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {session ? (
          <div className="space-y-8">
            <SearchBar />
            <DraggableLayout />
          </div>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to Your Content Dashboard
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Sign in with GitHub to access your personalized news, movies, and social feed
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Features you'll get access to:
              </p>
              <ul className="text-left space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Latest news from multiple categories</li>
                <li>• Trending movies with ratings</li>
                <li>• Social media feed</li>
                <li>• Search across all content</li>
                <li>• Favorites system</li>
                <li>• Dark mode toggle</li>
                <li>• Drag & drop dashboard customization</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
