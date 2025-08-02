import { NextRequest, NextResponse } from 'next/server'

const mockPosts = [
  {
    id: 1,
    title: "The Future of AI in Software Development",
    content: "AI is revolutionizing how we write code. From automated testing to code completion, developers are becoming more efficient. The key is to embrace AI as a tool, not a replacement for human creativity.",
    author: "TechVisionary",
    score: 45,
    createdAt: "2024-01-15T10:30:00",
    voteCount: 23,
    commentCount: 8
  },
  {
    id: 2,
    title: "Mastering React Hooks in 2024",
    content: "React Hooks have fundamentally changed how we write React components. Understanding useState, useEffect, and custom hooks is essential for modern React development.",
    author: "ReactExpert",
    score: 38,
    createdAt: "2024-01-15T09:15:00",
    voteCount: 19,
    commentCount: 5
  },
  {
    id: 3,
    title: "Best Practices for Database Design",
    content: "Good database design is the foundation of scalable applications. Always consider normalization, indexing, and query optimization when designing your schema.",
    author: "DatabaseGuru",
    score: 32,
    createdAt: "2024-01-15T08:45:00",
    voteCount: 16,
    commentCount: 3
  }
]

export async function GET(request: NextRequest) {
  try {
    // Return mock data instead of calling backend
    return NextResponse.json(mockPosts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Create a mock post response
    const newPost = {
      id: mockPosts.length + 1,
      title: body.title,
      content: body.content,
      author: "CurrentUser", // Mock user
      score: 0,
      createdAt: new Date().toISOString(),
      voteCount: 0,
      commentCount: 0
    }
    
    return NextResponse.json(newPost)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}