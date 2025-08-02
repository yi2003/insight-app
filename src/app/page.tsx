'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Feed from '@/components/Feed'
import Leaderboard from '@/components/Leaderboard'
import CreatePostForm from '@/components/CreatePostForm'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'feed' | 'leaderboard'>('feed')
  const [user, setUser] = useState(null)
  const [refreshFeed, setRefreshFeed] = useState(0)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handlePostCreated = () => {
    setRefreshFeed(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="gradient-text bg-gradient-to-r from-primary-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Insight
            </span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto leading-relaxed">
            Where knowledge meets competition. Share your best insights daily and climb the leaderboard.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-soft border border-white/20">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('feed')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'feed'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <span>Daily Feed</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'leaderboard'
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-md'
                    : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>Leaderboard</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="animate-slide-up">
              {activeTab === 'feed' ? <Feed key={refreshFeed} /> : <Leaderboard />}
            </div>
          </div>
          
          <div className="space-y-6">
            {user && (
              <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
                <CreatePostForm onPostCreated={handlePostCreated} />
              </div>
            )}

            <div className="card-modern animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="p-6">
                <h3 className="text-lg font-bold text-secondary-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Today's Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Total Posts</span>
                    <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Total Votes</span>
                    <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-600">Active Users</span>
                    <span className="font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full text-sm">89</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-modern animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="p-6">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">Quick Tips</h3>
                <div className="space-y-3 text-sm text-secondary-600">
                  <p>✨ Share valuable insights daily</p>
                  <p>🏆 Compete for leaderboard positions</p>
                  <p>💡 Quality over quantity matters</p>
                  <p>🤝 Engage with the community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}