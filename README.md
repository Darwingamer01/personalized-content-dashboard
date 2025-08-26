# Personalized Content Dashboard - SDE Frontend Assignment

## 🎯 Assignment Overview
A responsive, interactive dashboard for personalized content consumption featuring news articles, movie recommendations, and social media feeds with advanced user customization capabilities.

## 🚀 Live Demo
**Live Application**: https://personalized-content-dashboard-2st6oax61.vercel.app/

**Demo Video**: https://drive.google.com/file/d/1f9i9VGZ9S3JK_rbTQdPSDp1hIx56v98Q/view?usp=sharing

## ✨ Features Implemented

### Core Requirements ✅
- **Personalized Content Feed** with 3 API integrations (NewsAPI, TMDB, JSONPlaceholder)
- **Interactive Content Cards** with images, headlines, descriptions, and CTAs
- **User Preferences** with category selection and localStorage persistence
- **Responsive Dashboard Layout** with sidebar navigation and header
- **Advanced Search** with debounced input across all content types
- **Favorites System** allowing users to mark and organize preferred content

### Advanced UI/UX ✅
- **Drag & Drop Content Organization** using react-beautiful-dnd
- **Dark Mode Toggle** with Tailwind CSS and persistence
- **Smooth Animations** powered by Framer Motion
- **Infinite Scroll** for social media feed
- **Loading States** and error handling throughout

### State Management ✅
- **Redux Toolkit** for global state management
- **Async Thunks** for API data fetching
- **Local Storage Integration** for user preferences persistence
- **Real-time State Updates** across all components

### Authentication & Security ✅
- **NextAuth.js** integration with GitHub OAuth
- **Secure API Key Management** via environment variables
- **Protected Routes** and user session management

### Testing Suite ✅
- **Unit Tests** with Jest and React Testing Library
- **Integration Tests** for component interactions
- **End-to-End Tests** with Cypress
- **API Mocking** for reliable test execution

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS, Framer Motion animations
- **State Management**: Redux Toolkit with persistence
- **Authentication**: NextAuth.js (GitHub OAuth)
- **Testing**: Jest, React Testing Library, Cypress
- **APIs**: NewsAPI, TMDB API, JSONPlaceholder
- **Deployment**: Vercel with CI/CD
- **Tools**: ESLint, Prettier, TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ 
- npm or yarn
- GitHub account for OAuth
- API keys (NewsAPI, TMDB)

### Installation

1. **Clone the repository**
    git clone https://github.com/Darwingamer01/personalized-content-dashboard.git
    cd personalized-content-dashboard

2. **Install dependencies**
    npm install

3. **Set up environment variables**
    Create `.env.local` file in the root directory:
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your-nextauth-secret-here

    GITHUB_ID=your-github-oauth-client-id
    GITHUB_SECRET=your-github-oauth-client-secret

    NEWS_API_KEY=your-newsapi-key
    TMDB_API_KEY=your-tmdb-api-key

4. **Get Required API Keys**
    - **NewsAPI**: Register at [newsapi.org](https://newsapi.org/register)
    - **TMDB**: Get API key at [themoviedb.org](https://www.themoviedb.org/settings/api)
    - **GitHub OAuth**: Create app at [github.com/settings/developers](https://github.com/settings/developers)

5. **Run the development server**
    npm run dev

6. 
6. **Open** [http://localhost:3000](http://localhost:3000) in your browser

    ## 🧪 Testing

    ### Run All Tests
    Unit and integration tests
    npm test

    Tests with coverage report
    npm run test:coverage

    End-to-end tests (interactive)
    npm run cypress

    End-to-end tests (headless)
    npm run cypress:run

    Run all tests for CI/CD
    npm run test:ci


### Test Coverage
- **Unit Tests**: 85%+ coverage on components and Redux slices
- **Integration Tests**: Critical component interactions
- **E2E Tests**: Complete user workflows including authentication, search, and drag-drop

## 📱 User Flows

### 1. Authentication Flow
- User clicks "Sign In with GitHub"
- OAuth redirect to GitHub for authorization
- Return to dashboard with authenticated session
- Profile information displayed in header

### 2. Content Discovery
- Browse personalized feed based on preferences
- Use search with real-time debounced results
- Filter content by categories (news, movies)
- View trending content in dedicated sections

### 3. Personalization
- Add/remove items from favorites
- Customize dashboard layout via drag-and-drop
- Toggle dark/light mode with persistence
- Adjust content preferences in settings

### 4. Content Interaction
- Read full articles via external links
- View detailed movie information and ratings
- Engage with social media content
- Infinite scroll for continuous content discovery

## 🏗️ Project Architecture
├── app/ # Next.js 14 App Router
│ ├── api/ # API routes
│ │ ├── auth/ # NextAuth configuration
│ │ ├── news/ # NewsAPI integration
│ │ ├── movies/ # TMDB API integration
│ │ └── social/ # Social media API mock
│ ├── globals.css # Global styles and Tailwind
│ ├── layout.tsx # Root layout with providers
│ ├── page.tsx # Main dashboard page
│ └── providers.tsx # Redux and session providers
├── components/ # Reusable React components
│ ├── DraggableLayout.tsx # Drag-and-drop dashboard
│ ├── FavoritesSection.tsx # Favorites management
│ ├── Header.tsx # Navigation and auth
│ ├── MoviesFeed.tsx # Movie recommendations
│ ├── NewsFeed.tsx # News articles display
│ ├── SearchBar.tsx # Debounced search
│ └── SocialFeed.tsx # Social media integration
├── lib/ # Utilities and state management
│ ├── slices/ # Redux Toolkit slices
│ │ ├── newsSlice.ts # News state management
│ │ ├── moviesSlice.ts # Movies state management
│ │ ├── socialSlice.ts # Social content state
│ │ └── preferencesSlice.ts # User preferences
│ ├── hooks.ts # Typed Redux hooks
│ └── store.ts # Redux store configuration
├── tests/ # Jest unit and integration tests
├── cypress/ # End-to-end test specifications
└── public/ # Static assets and icons


## 🎯 Assignment Requirements Fulfilled

| Requirement | Status | Implementation |
|-------------|---------|----------------|
| Personalized Content Feed | ✅ Complete | 3 APIs with user preferences |
| Interactive Content Cards | ✅ Complete | Rich cards with CTAs and favorites |
| Responsive Dashboard Layout | ✅ Complete | Mobile-first design with sidebar |
| Search Functionality | ✅ Complete | Debounced cross-category search |
| Drag-and-Drop Organization | ✅ Complete | Section reordering with persistence |
| Dark Mode Implementation | ✅ Complete | Tailwind CSS with localStorage |
| Redux State Management | ✅ Complete | Toolkit with async thunks |
| Comprehensive Testing | ✅ Complete | Unit, integration, and E2E tests |
| Authentication System | ✅ Bonus | NextAuth.js with GitHub OAuth |

## 🚀 Performance Optimizations

- **Debounced Search**: Reduces API calls during user input
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Optimized bundle sizes
- **Caching Strategy**: Redux state persistence
- **Error Boundaries**: Graceful error handling

## 🔒 Security Features

- **Environment Variables**: Secure API key storage
- **OAuth Integration**: Secure GitHub authentication
- **CSRF Protection**: Built-in NextAuth security
- **Input Sanitization**: Protected against XSS attacks
- **Secure Headers**: Next.js security defaults

## 📈 Future Enhancements

- Real-time content updates with WebSockets
- Multi-language support with react-i18next
- Advanced analytics and user insights
- Push notifications for breaking news
- Offline support with service workers
- Advanced filtering and sorting options

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) for the robust React framework
- [NewsAPI](https://newsapi.org) for comprehensive news data
- [TMDB](https://themoviedb.org) for movie and entertainment content
- [JSONPlaceholder](https://jsonplaceholder.typicode.com) for mock social data
- [Vercel](https://vercel.com) for seamless deployment platform

---

