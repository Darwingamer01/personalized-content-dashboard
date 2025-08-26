import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import SearchBar from '../components/SearchBar'
import newsReducer from '../lib/slices/newsSlice'
import moviesReducer from '../lib/slices/moviesSlice'

const mockStore = configureStore({
  reducer: {
    news: newsReducer,
    movies: moviesReducer,
    preferences: (state = {}) => state,
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

describe('SearchBar', () => {
  it('renders search tabs', () => {
    renderWithProvider(<SearchBar />)
    expect(screen.getByText('Search News')).toBeInTheDocument()
    expect(screen.getByText('Search Movies')).toBeInTheDocument()
  })

  it('has search input field', () => {
    renderWithProvider(<SearchBar />)
    expect(screen.getByPlaceholderText('Search news...')).toBeInTheDocument()
  })

  it('switches between tabs', () => {
    renderWithProvider(<SearchBar />)
    const moviesTab = screen.getByText('Search Movies')
    fireEvent.click(moviesTab)
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
  })

  it('updates search input value', () => {
    renderWithProvider(<SearchBar />)
    const searchInput = screen.getByPlaceholderText('Search news...') as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: 'test query' } })
    expect(searchInput.value).toBe('test query')
  })
})
