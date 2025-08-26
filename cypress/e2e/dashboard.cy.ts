describe('Dashboard E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays welcome page when not authenticated', () => {
    cy.contains('Welcome to Your Content Dashboard')
    cy.contains('Sign in with GitHub to access')
    cy.get('[data-testid=github-signin]').should('be.visible')
  })

  it('displays header with correct elements', () => {
    cy.contains('Content Dashboard')
    cy.get('button').should('contain', 'Sign In with GitHub')
  })

  it('has dark mode toggle', () => {
    cy.get('button').contains('Sign In with GitHub').should('be.visible')
    // Dark mode toggle should be present (icon button)
    cy.get('header button').should('have.length.at.least', 2)
  })
})

describe('Dashboard Functionality (Mock Auth)', () => {
  beforeEach(() => {
    // Mock authentication by intercepting the session API
    cy.intercept('/api/auth/session', {
      statusCode: 200,
      body: {
        user: {
          name: 'Test User',
          email: 'test@example.com',
          image: 'https://github.com/testuser.png',
        },
      },
    }).as('getSession')

    // Mock API endpoints
    cy.intercept('/api/news*', {
      statusCode: 200,
      body: {
        articles: [
          {
            title: 'Test News Article',
            description: 'Test description',
            url: 'https://example.com',
            urlToImage: 'https://example.com/image.jpg',
            publishedAt: '2023-01-01T00:00:00Z',
            source: { name: 'Test Source' },
          },
        ],
      },
    }).as('getNews')

    cy.intercept('/api/movies*', {
      statusCode: 200,
      body: {
        results: [
          {
            id: 1,
            title: 'Test Movie',
            overview: 'Test overview',
            poster_path: '/test-poster.jpg',
            release_date: '2023-01-01',
            vote_average: 8.5,
          },
        ],
      },
    }).as('getMovies')

    cy.intercept('/api/social*', {
      statusCode: 200,
      body: {
        posts: [
          {
            id: 1,
            title: 'Test Social Post',
            body: 'Test post content',
            userId: 1,
            user: {
              name: 'Test User',
              username: 'testuser',
              email: 'test@example.com',
            },
          },
        ],
        hasMore: false,
      },
    }).as('getSocial')

    cy.visit('/')
  })

  it('displays search functionality', () => {
    cy.contains('Search News').click()
    cy.get('input[placeholder*="Search news"]').type('test query')
    cy.get('input[placeholder*="Search news"]').should('have.value', 'test query')
  })

  it('can toggle between search tabs', () => {
    cy.contains('Search Movies').click()
    cy.get('input[placeholder*="Search movies"]').should('be.visible')
  })

  it('displays content sections', () => {
    cy.contains('Latest News')
    cy.contains('Trending Movies')
    cy.contains('Social Feed')
    cy.contains('Your Favorites')
  })

  it('can enable drag and drop mode', () => {
    cy.contains('Enable Drag & Drop').click()
    cy.contains('Disable Drag & Drop').should('be.visible')
    cy.contains('Drag & Drop mode is enabled')
  })
})
