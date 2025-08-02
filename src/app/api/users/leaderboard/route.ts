import { NextRequest, NextResponse } from 'next/server'
import { LeaderboardEntry } from '@/types'

const mockUsers: LeaderboardEntry[] = [
  { userId: '2', username: 'Mike Rodriguez', score: 3120, rank: 1, postsCount: 67 },
  { userId: '4', username: 'Emma Watson', score: 2890, rank: 2, postsCount: 52 },
  { userId: '1', username: 'Sarah Chen', score: 2450, rank: 3, postsCount: 45 },
  { userId: '6', username: 'David Kim', score: 2230, rank: 4, postsCount: 41 },
  { userId: '3', username: 'Lisa Park', score: 2100, rank: 5, postsCount: 38 },
  { userId: '8', username: 'Alex Thompson', score: 1950, rank: 6, postsCount: 35 },
  { userId: '5', username: 'James Wilson', score: 1820, rank: 7, postsCount: 32 },
  { userId: '9', username: 'Maria Garcia', score: 1680, rank: 8, postsCount: 29 },
  { userId: '7', username: 'Ryan Lee', score: 1540, rank: 9, postsCount: 27 },
  { userId: '10', username: 'Sophie Martin', score: 1420, rank: 10, postsCount: 25 }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10
    
    const topUsers = mockUsers
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((user, index) => ({
        ...user,
        rank: index + 1
      }))
    
    return NextResponse.json(topUsers)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}