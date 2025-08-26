import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 10

  try {
    // Fetch posts
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    )
    
    // Fetch users
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users')
    
    if (!postsResponse.ok || !usersResponse.ok) {
      throw new Error('Failed to fetch data')
    }

    const posts = await postsResponse.json()
    const users = await usersResponse.json()

    // Combine posts with user data
    const postsWithUsers = posts.map((post: any) => ({
      ...post,
      user: users.find((user: any) => user.id === post.userId),
    }))

    // Simulate pagination
    const hasMore = posts.length === limit

    return NextResponse.json({
      posts: postsWithUsers,
      hasMore,
      page,
    })
  } catch (error) {
    console.error('Social API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch social posts' },
      { status: 500 }
    )
  }
}
