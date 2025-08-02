'use client'

import { useState, useEffect } from 'react'
import { LeaderboardEntry, Post } from '@/types'

export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState<LeaderboardEntry[]>([])
  const [topPosts, setTopPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboardData()
  }, [])

  const fetchLeaderboardData = async () => {
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch('/api/posts?limit=10'),
        fetch('/api/users/leaderboard')
      ])

      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        setTopPosts(postsData)
      }

      if (usersResponse.ok) {
        const usersData = await usersResponse.json()
        setTopUsers(usersData)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 text-yellow-800'
      case 2: return 'bg-gray-100 text-gray-800'
      case 3: return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-50 text-gray-700'
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-12"></div>
                <div className="h-3 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Top Users</h2>
        
        <div className="space-y-4">
          {topUsers.map((user) => (
            <div key={user.userId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getRankBadgeColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.username?.split(' ').map(n => n[0]).join('') || '?'}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900">{user.username}</h3>
                  <p className="text-sm text-gray-600">{user.postsCount} posts</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-primary-600">{user.score.toLocaleString()}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Today's Top Posts</h2>
        
        <div className="space-y-4">
          {topPosts.map((post, index) => (
            <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{post.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                  index === 2 ? 'bg-orange-100 text-orange-800' :
                  'bg-gray-50 text-gray-700'
                }`}>
                  #{index + 1}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-2">
                {post.content.length > 100 
                  ? `${post.content.substring(0, 100)}...` 
                  : post.content
                }
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>by {post.author.username}</span>
                <span className="font-semibold text-primary-600">{post.score} pts</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}