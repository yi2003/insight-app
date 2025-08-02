'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CreatePostFormProps {
  onPostCreated?: () => void
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [postsRemaining, setPostsRemaining] = useState(1)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const user = localStorage.getItem('user')
      if (!user) {
        router.push('/auth/login')
        return
      }

      const userData = JSON.parse(user)
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
          authorId: userData.id
        }),
      })

      if (response.ok) {
        setTitle('')
        setContent('')
        setTags('')
        setIsOpen(false)
        setPostsRemaining(0)
        onPostCreated?.()
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create post')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const canPost = postsRemaining > 0

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Daily Challenge
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            Posts remaining: {postsRemaining}
          </span>
          <div className={`w-3 h-3 rounded-full ${canPost ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
      </div>

      {canPost ? (
        <>
          {!isOpen ? (
            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
            >
              Share Your Insight
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <input
                  type="text"
                  placeholder="Give your insight a compelling title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <textarea
                  placeholder="Share your knowledge, tip, or groundbreaking idea..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Add tags (comma separated)..."
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isLoading || !title.trim() || !content.trim()}
                  className="flex-1 bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Posting...' : 'Post Insight'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">✨</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Daily Complete!
          </h4>
          <p className="text-gray-600 mb-4">
            You've already shared your insight for today. Come back tomorrow to share more knowledge!
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Next post available in:
            </p>
            <p className="text-2xl font-bold text-primary-600">
              {new Date().toLocaleDateString('en-US', { weekday: 'long' }) === new Date().toLocaleDateString('en-US', { weekday: 'long' }) 
                ? 'Tomorrow' 
                : 'Today'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}