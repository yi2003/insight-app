import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = params.id
    const response = await fetch(`http://localhost:8080/api/comments/${commentId}/replies`)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch replies' },
        { status: response.status }
      )
    }
    
    const replies = await response.json()
    return NextResponse.json(replies)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}