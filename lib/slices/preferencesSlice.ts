import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PreferencesState {
  darkMode: boolean
  favorites: {
    news: string[]
    movies: number[]
    social: number[]
  }
  newsCategories: string[]
  layoutOrder: string[]
}

const initialState: PreferencesState = {
  darkMode: false,
  favorites: {
    news: [],
    movies: [],
    social: [],
  },
  newsCategories: ['general', 'technology', 'business'],
  layoutOrder: ['news', 'movies', 'social'],
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    addToFavorites: (state, action: PayloadAction<{ type: 'news' | 'movies' | 'social', id: string | number }>) => {
      const { type, id } = action.payload
      if (!state.favorites[type].includes(id as never)) {
        state.favorites[type].push(id as never)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<{ type: 'news' | 'movies' | 'social', id: string | number }>) => {
      const { type, id } = action.payload
      state.favorites[type] = state.favorites[type].filter(item => item !== id)
    },
    updateLayoutOrder: (state, action: PayloadAction<string[]>) => {
      state.layoutOrder = action.payload
    },
    updateNewsCategories: (state, action: PayloadAction<string[]>) => {
      state.newsCategories = action.payload
    },
  },
})

export const {
  toggleDarkMode,
  addToFavorites,
  removeFromFavorites,
  updateLayoutOrder,
  updateNewsCategories,
} = preferencesSlice.actions

export default preferencesSlice.reducer
