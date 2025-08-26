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
            if (type === 'news' && typeof id === 'string') {
                if (!state.favorites.news.includes(id)) {
                    state.favorites.news.push(id)
                }
            } else if (type === 'movies' && typeof id === 'number') {
                if (!state.favorites.movies.includes(id)) {
                    state.favorites.movies.push(id)
                }
            } else if (type === 'social' && typeof id === 'number') {
                if (!state.favorites.social.includes(id)) {
                    state.favorites.social.push(id)
                }
            }
        },
        removeFromFavorites: (state, action: PayloadAction<{ type: 'news' | 'movies' | 'social', id: string | number }>) => {
            const { type, id } = action.payload
            if (type === 'news') {
                state.favorites.news = state.favorites.news.filter(item => item !== id)
            } else if (type === 'movies') {
                state.favorites.movies = state.favorites.movies.filter(item => item !== id)
            } else if (type === 'social') {
                state.favorites.social = state.favorites.social.filter(item => item !== id)
            }
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
