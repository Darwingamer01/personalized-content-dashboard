import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return ''
  },
}))

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession() {
    return {
      data: null,
      status: 'unauthenticated',
    }
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
  SessionProvider: ({ children }) => children,
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    article: ({ children, ...props }) => <article {...props}>{children}</article>,
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock react-beautiful-dnd
jest.mock('react-beautiful-dnd', () => ({
  DragDropContext: ({ children }) => children,
  Droppable: ({ children }) => children({ provided: { innerRef: jest.fn(), droppableProps: {}, placeholder: null } }),
  Draggable: ({ children }) => children({ provided: { innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }, snapshot: { isDragging: false } }),
}))
