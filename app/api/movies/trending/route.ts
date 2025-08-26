import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.TMDB_API_KEY}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('TMDB API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trending movies' },
      { status: 500 }
    )
  }
}
