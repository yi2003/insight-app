'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Post, Comment, User } from '@/types'
import CommentSection from '@/components/CommentSection'

export default function PostDetail() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down'>>({})
  const [user, setUser] = useState<User | null>(null)
  
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    
    fetchPost()
  }, [postId])

  const fetchPost = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const posts = await response.json()
        const foundPost = posts.find((p: Post) => p.id === postId)
        if (foundPost) {
          setPost(foundPost)
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (voteType: 'up' | 'down') => {
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

        setPost(prev => prev ? {
          ...prev,
          score: prev.score + scoreChange
        } : null)
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  const handleAddComment = async (content: string, parentCommentId?: number) => {
    if (!user) {
      alert('Please sign in to comment')
      return
    }

    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, parentCommentId }),
      })

      if (response.ok) {
        // Refresh post to get new comments
        fetchPost()
      }
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Post not found</h2>
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to feed
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <button
              onClick={() => handleVote('up')}
              className={`transition-colors ${
                userVotes[post.id] === 'up' 
                  ? 'text-blue-500' 
                  : 'text-gray-400 hover:text-blue-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            <span className={`text-lg font-semibold my-1 ${
              post.score > 0 ? 'text-blue-600' : post.score < 0 ? 'text-red-600' : 'text-gray-900'
            }`}>
              {post.score}
            </span>
            <button
              onClick={() => handleVote('down')}
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
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
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
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                #{post.author.rank}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommentSection
        postId={postId}
        comments={post.comments || []}
        onAddComment={handleAddComment}
        isAuthenticated={!!user}
      />
    </div>
  )
}