import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mock authentication - accept any username/password
    if (body.username && body.password) {
      const mockUser = {
        id: '1',
        username: body.username,
        email: `${body.username}@example.com`,
        token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
      }
      
      return NextResponse.json(mockUser)
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}