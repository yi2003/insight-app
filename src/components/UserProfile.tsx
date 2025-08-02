'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { User, Achievement } from '@/types'

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  
  const params = useParams()
  const userId = params.id as string

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    
    fetchUserProfile()
  }, [userId])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/profile`)
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getAchievementIcon = (icon: string) => {
    const iconMap: Record<string, string> = {
      '🏆': '🏆',
      '🌟': '🌟',
      '🎯': '🎯',
      '🚀': '🚀',
      '💎': '💎',
      '🔥': '🔥',
      '⭐': '⭐',
      '🎖️': '🎖️',
      '🏅': '🏅',
      '👑': '👑'
    }
    return iconMap[icon] || '🏆'
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">User not found</h2>
          <p className="text-gray-600">The user you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const isOwnProfile = currentUser && currentUser.id === userId

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
            <p className="text-gray-600">Member since {formatDate(user.joinedAt)}</p>
            {isOwnProfile && (
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Your Profile
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">#{user.rank}</div>
            <div className="text-sm text-gray-500">Rank</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900">{user.totalScore}</div>
            <div className="text-sm text-gray-600">Total Score</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900">{user.postsCount}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-900">{user.achievements?.length || 0}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
        
        {user.achievements && user.achievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.achievements.map((achievement: Achievement) => (
              <div key={achievement.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{getAchievementIcon(achievement.icon)}</span>
                  <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                <p className="text-xs text-gray-500">
                  Unlocked {formatDate(achievement.unlockedAt)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-gray-600">No achievements yet. Keep posting and engaging to unlock achievements!</p>
          </div>
        )}
      </div>
    </div>
  )
}