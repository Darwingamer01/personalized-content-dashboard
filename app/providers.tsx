'use client'

import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import { store } from '../lib/store'
import { useEffect } from 'react'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Load preferences from localStorage
    const savedPreferences = localStorage.getItem('dashboard-preferences')
    if (savedPreferences) {
      const preferences = JSON.parse(savedPreferences)
      if (preferences.darkMode) {
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </SessionProvider>
  )
}
