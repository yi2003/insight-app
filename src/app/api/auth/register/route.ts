import { NextRequest, NextResponse } from 'next/server'

let users = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    password: 'password123',
    totalScore: 0,
    rank: 0,
    postsCount: 0,
    joinedAt: new Date(),
    achievements: []
  }
]

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json()

    const existingUser = users.find(u => u.email === email || u.username === username)
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or username already exists' },
        { status: 400 }
      )
    }

    const newUser = {
      id: (users.length + 1).toString(),
      username,
      email,
      password,
      totalScore: 0,
      rank: users.length + 1,
      postsCount: 0,
      joinedAt: new Date(),
      achievements: []
    }

    users.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      message: 'Registration successful',
      user: userWithoutPassword
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}