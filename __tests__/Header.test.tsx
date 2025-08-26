import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import Header from '../components/Header'
import preferencesReducer from '../lib/slices/preferencesSlice'

// Mock the store
const mockStore = configureStore({
  reducer: {
    preferences: preferencesReducer,
    news: (state = {}) => state,
    movies: (state = {}) => state,
    social: (state = {}) => state,
  },
})

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      {component}
    </Provider>
  )
}

describe('Header', () => {
  it('renders the dashboard title', () => {
    renderWithProvider(<Header />)
    expect(screen.getByText('Content Dashboard')).toBeInTheDocument()
  })

  it('shows sign in button when not authenticated', () => {
    renderWithProvider(<Header />)
    expect(screen.getByText('Sign In with GitHub')).toBeInTheDocument()
  })

  it('has dark mode toggle button', () => {
    renderWithProvider(<Header />)
    const darkModeButton = screen.getByRole('button', { name: /toggle dark mode/i }) || 
                          screen.getByRole('button', { name: '' })
    expect(darkModeButton).toBeInTheDocument()
  })
})
