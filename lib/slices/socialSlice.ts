import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface SocialPost {
  id: number
  title: string
  body: string
  userId: number
  user?: {
    name: string
    username: string
    email: string
  }
}

interface SocialState {
  posts: SocialPost[]
  loading: boolean
  error: string | null
  hasMore: boolean
  page: number
}

const initialState: SocialState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1,
}

export const fetchSocialPosts = createAsyncThunk(
  'social/fetchPosts',
  async (page: number = 1) => {
    const response = await fetch(`/api/social?page=${page}`)
    if (!response.ok) {
      throw new Error('Failed to fetch social posts')
    }
    const data = await response.json()
    return { posts: data.posts, hasMore: data.hasMore, page }
  }
)

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = []
      state.page = 1
      state.hasMore = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSocialPosts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSocialPosts.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.page === 1) {
          state.posts = action.payload.posts
        } else {
          state.posts = [...state.posts, ...action.payload.posts]
        }
        state.hasMore = action.payload.hasMore
        state.page = action.payload.page
      })
      .addCase(fetchSocialPosts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch social posts'
      })
  },
})

export const { resetPosts } = socialSlice.actions
export default socialSlice.reducer
