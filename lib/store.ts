import { configureStore } from '@reduxjs/toolkit'
import preferencesReducer from './slices/preferencesSlice'
import newsReducer from './slices/newsSlice'
import moviesReducer from './slices/moviesSlice'
import socialReducer from './slices/socialSlice'

export const store = configureStore({
  reducer: {
    preferences: preferencesReducer,
    news: newsReducer,
    movies: moviesReducer,
    social: socialReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
