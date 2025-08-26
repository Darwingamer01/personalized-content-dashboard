'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { fetchSocialPosts } from '../lib/slices/socialSlice'
import { addToFavorites, removeFromFavorites } from '../lib/slices/preferencesSlice'
import { HeartIcon as HeartOutline, UserIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

export default function SocialFeed() {
  const dispatch = useAppDispatch()
  const { posts, loading, hasMore, page } = useAppSelector((state) => state.social)
  const { favorites } = useAppSelector((state) => state.preferences)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchSocialPosts(1))
    }
  }, [dispatch, posts.length])

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(fetchSocialPosts(page + 1))
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore, page, dispatch]
  )

  const toggleFavorite = (postId: number) => {
    if (favorites.social.includes(postId)) {
      dispatch(removeFromFavorites({ type: 'social', id: postId }))
    } else {
      dispatch(addToFavorites({ type: 'social', id: postId }))
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Feed</h2>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            ref={index === posts.length - 1 ? lastPostElementRef : null}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2">
                  <UserIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {post.user?.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    @{post.user?.username}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(post.id)}
                className="text-red-500 hover:text-red-600"
              >
                {favorites.social.includes(post.id) ? (
                  <HeartSolid className="h-5 w-5" />
                ) : (
                  <HeartOutline className="h-5 w-5" />
                )}
              </button>
            </div>

            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {post.title}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {post.body}
            </p>
          </motion.div>
        ))}

        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1 w-24"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded mb-1"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-4/5"></div>
              </div>
            ))}
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              You've reached the end of the feed
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
