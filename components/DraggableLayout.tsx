'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { useAppDispatch, useAppSelector } from '../lib/hooks'
import { updateLayoutOrder } from '../lib/slices/preferencesSlice'
import NewsFeed from './NewsFeed'
import MoviesFeed from './MoviesFeed'
import SocialFeed from './SocialFeed'
import FavoritesSection from './FavoritesSection'

const components = {
  news: NewsFeed,
  movies: MoviesFeed,
  social: SocialFeed,
  favorites: () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Your Favorites
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Favorites functionality - temporarily simplified for drag & drop stability
      </p>
    </div>
  ),
}


export default function DraggableLayout() {
  const dispatch = useAppDispatch()
  const { layoutOrder } = useAppSelector((state) => state.preferences)
  const [dragEnabled, setDragEnabled] = useState(false)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(layoutOrder)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    dispatch(updateLayoutOrder(items))
  }

  // Add favorites to layout if not present
  const fullLayoutOrder = layoutOrder.includes('favorites') 
    ? layoutOrder 
    : [...layoutOrder, 'favorites']

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Dashboard
        </h1>
        <button
          onClick={() => setDragEnabled(!dragEnabled)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            dragEnabled
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {dragEnabled ? 'Disable Drag & Drop' : 'Enable Drag & Drop'}
        </button>
      </div>

      {dragEnabled && (
        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            🎯 Drag & Drop mode is enabled! You can now reorder sections by dragging them.
          </p>
        </div>
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dashboard" isDropDisabled={!dragEnabled}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-8"
            >
              {fullLayoutOrder.map((componentKey, index) => {
                const Component = components[componentKey as keyof typeof components]
                return (
                  <Draggable
                    key={componentKey}
                    draggableId={componentKey}
                    index={index}
                    isDragDisabled={!dragEnabled}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${
                          snapshot.isDragging
                            ? 'shadow-2xl transform rotate-2 z-50'
                            : 'shadow-sm'
                        } ${
                          dragEnabled
                            ? 'cursor-move border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4'
                            : ''
                        } transition-all duration-200`}
                      >
                        {dragEnabled && (
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center justify-center w-full py-2 mb-4 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300 text-sm font-medium"
                          >
                            ⋮⋮ Drag to reorder "{componentKey}" section
                          </div>
                        )}
                        <Component />
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
