import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  backdrop_path: string
}

interface MoviesState {
  trending: Movie[]
  searchResults: Movie[]
  loading: boolean
  searchLoading: boolean
  error: string | null
}

const initialState: MoviesState = {
  trending: [],
  searchResults: [],
  loading: false,
  searchLoading: false,
  error: null,
}

export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async () => {
    const response = await fetch('/api/movies/trending')
    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }
    const data = await response.json()
    return data.results
  }
)

export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async (query: string) => {
    const response = await fetch(`/api/movies/search?q=${query}`)
    if (!response.ok) {
      throw new Error('Failed to search movies')
    }
    const data = await response.json()
    return data.results
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false
        state.trending = action.payload
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch movies'
      })
      .addCase(searchMovies.pending, (state) => {
        state.searchLoading = true
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.error.message || 'Failed to search movies'
      })
  },
})

export const { clearSearchResults } = moviesSlice.actions
export default moviesSlice.reducer
