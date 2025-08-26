'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { toggleDarkMode } from '../lib/slices/preferencesSlice'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

export default function Header() {
  const { data: session } = useSession()
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector((state) => state.preferences.darkMode)

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem('dashboard-preferences', JSON.stringify({ darkMode }))
    
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Content Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {session ? (
              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src={session.user?.image || ''}
                  alt={session.user?.name || ''}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm text-red-600 hover:text-red-800 dark:text-red-400"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn('github')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Sign In with GitHub
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
