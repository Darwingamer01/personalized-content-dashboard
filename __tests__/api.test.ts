/**
 * @jest-environment node
 */

import { createMocks } from 'node-mocks-http'
import { GET } from '../app/api/news/route'

// Mock environment variables
process.env.NEWS_API_KEY = 'test-api-key'

// Mock fetch
global.fetch = jest.fn()

describe('/api/news', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return news articles', async () => {
    const mockResponse = {
      articles: [
        {
          title: 'Test Article',
          description: 'Test Description',
          url: 'https://example.com',
          urlToImage: 'https://example.com/image.jpg',
          publishedAt: '2023-01-01T00:00:00Z',
          source: { name: 'Test Source' },
        },
      ],
    }

    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const { req } = createMocks({
      method: 'GET',
      url: '/api/news?category=general',
    })

    const response = await GET(req as any)
    const data = await response.json()

    expect(data.articles).toBeDefined()
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('newsapi.org'),
      expect.objectContaining({
        headers: {
          'User-Agent': 'PersonalizedDashboard/1.0',
        },
      })
    )
  })

  it('should handle fetch errors', async () => {
    ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

    const { req } = createMocks({
      method: 'GET',
      url: '/api/news',
    })

    const response = await GET(req as any)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('Failed to fetch news')
  })
})
