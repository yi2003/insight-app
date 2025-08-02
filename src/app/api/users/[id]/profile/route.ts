import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const response = await fetch(`http://localhost:8080/api/users/${userId}/profile`)
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user profile' },
        { status: response.status }
      )
    }
    
    const userProfile = await response.json()
    return NextResponse.json(userProfile)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}