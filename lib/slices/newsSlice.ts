import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface NewsArticle {
  url: string
  title: string
  description: string
  urlToImage: string
  publishedAt: string
  source: {
    name: string
  }
}

interface NewsState {
  articles: NewsArticle[]
  loading: boolean
  error: string | null
  searchResults: NewsArticle[]
  searchLoading: boolean
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
}

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (category: string = 'general') => {
    const response = await fetch(`/api/news?category=${category}`)
    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }
    const data = await response.json()
    return data.articles
  }
)

export const searchNews = createAsyncThunk(
  'news/searchNews',
  async (query: string) => {
    const response = await fetch(`/api/news/search?q=${query}`)
    if (!response.ok) {
      throw new Error('Failed to search news')
    }
    const data = await response.json()
    return data.articles
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch news'
      })
      .addCase(searchNews.pending, (state) => {
        state.searchLoading = true
      })
      .addCase(searchNews.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload
      })
      .addCase(searchNews.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.error.message || 'Failed to search news'
      })
  },
})

export const { clearSearchResults } = newsSlice.actions
export default newsSlice.reducer
