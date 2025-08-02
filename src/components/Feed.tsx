'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Post, User } from '@/types'

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({})

  const handleVote = async (postId: string, voteType: 'up' | 'down') => {
    const user = localStorage.getItem('user')
    if (!user) {
      alert('Please sign in to vote')
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: voteType }),
      })

      if (response.ok) {
        const previousVote = userVotes[postId]
        let scoreChange = 0
        
        if (previousVote === voteType) {
          // Remove vote if clicking the same button
          setUserVotes(prev => {
            const newVotes = { ...prev }
            delete newVotes[postId]
            return newVotes
          })
          scoreChange = voteType === 'up' ? -1 : 1
        } else if (previousVote) {
          // Change vote
          setUserVotes(prev => ({ ...prev, [postId]: voteType }))
          scoreChange = voteType === 'up' ? 2 : -2
        } else {
          // New vote
          setUserVotes(prev => ({ ...prev, [postId]: voteType }))
          scoreChange = voteType === 'up' ? 1 : -1
        }

        setPosts(posts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              score: post.score + scoreChange
            }
          }
          return post
        }))
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleVote(post.id, 'up')}
                className={`transition-colors ${
                  userVotes[post.id] === 'up' 
                    ? 'text-primary-500' 
                    : 'text-gray-400 hover:text-primary-500'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <span className={`text-lg font-semibold my-1 ${
                post.score > 0 ? 'text-primary-600' : post.score < 0 ? 'text-red-600' : 'text-gray-900'
              }`}>
                {post.score}
              </span>
              <button
                onClick={() => handleVote(post.id, 'down')}
                className={`transition-colors ${
                  userVotes[post.id] === 'down' 
                    ? 'text-red-500' 
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-medium">
                    {post?.author?.username?.split(' ').map(n => n[0]).join('') || '?'}
                  </span>
                </div>
                <div>
                  <span 
                    className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                    onClick={() => router.push(`/users/${post.author.id}`)}
                  >
                    {post.author.username}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    • {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                  #{post.author.rank}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 cursor-pointer hover:text-blue-600" onClick={() => router.push(`/posts/${post.id}`)}>
                {post.title}
              </h3>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {post.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-gray-500 text-sm">
                  <button className="hover:text-primary-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="ml-1">{post.comments?.length || 0}</span>
                  </button>
                  <button className="hover:text-primary-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}