import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    const response = await fetch(`http://localhost:8080/api/comments/post/${postId}`)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: response.status }
      )
    }
    
    const comments = await response.json()
    return NextResponse.json(comments)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id
    const { content, parentCommentId } = await request.json()
    const token = request.headers.get('authorization')
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Comment content is required' },
        { status: 400 }
      )
    }
    
    const response = await fetch(`http://localhost:8080/api/comments?postId=${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token || ''
      },
      body: JSON.stringify({ content, parentCommentId })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}