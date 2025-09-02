'use client'

import { useState } from 'react'
import { MessageCircle, Heart, Share, Flag, MapPin, Clock, AlertTriangle } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { formatTimeAgo } from '@/lib/utils'
import type { CommunityPost, Comment } from '@/types'

interface CommunityFeedProps {
  category?: string
  showEmergencyOnly?: boolean
}

// Mock data for demonstration - in real app this would come from API
const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'SJ',
      location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', country: 'USA' },
      expertise: ['Emergency Response', 'First Aid'],
      reputation: 95,
      isVerified: true
    },
    title: 'Flood Preparation Tips for NYC Residents',
    content: 'With recent heavy rainfall in our area, here are some essential flood preparation tips...',
    category: 'preparedness',
    location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', country: 'USA' },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    likes: 24,
    comments: [
      {
        id: '1',
        author: { id: '2', name: 'Mike Chen', avatar: 'MC', reputation: 78, isVerified: false, expertise: ['First Aid'] },
        content: 'Great tips! I\'ve added sandbags to my emergency kit.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        likes: 3,
        replies: []
      }
    ],
    tags: ['flood', 'preparation', 'nyc'],
    attachments: [],
    isEmergency: false
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'Emergency Response Team',
      avatar: 'ERT',
      location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', country: 'USA' },
      expertise: ['Emergency Management', 'Coordination'],
      reputation: 100,
      isVerified: true
    },
    title: 'URGENT: Power Outage in Downtown Area',
    content: 'We are experiencing a widespread power outage affecting downtown Manhattan. Please stay indoors and conserve phone battery...',
    category: 'emergency',
    location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', country: 'USA' },
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    likes: 67,
    comments: [
      {
        id: '2',
        author: { id: '4', name: 'Lisa Park', avatar: 'LP', reputation: 82, isVerified: true, expertise: ['Emergency Coordination'] },
        content: 'I\'m in the affected area. Are there any emergency shelters open?',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        likes: 5,
        replies: [
          {
            id: '3',
            author: { id: '3', name: 'Emergency Response Team', avatar: 'ERT', reputation: 100, isVerified: true, expertise: ['Emergency Management'] },
            content: 'Yes, shelters are open at Central Park and Times Square locations.',
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            likes: 8,
            replies: []
          }
        ]
      }
    ],
    tags: ['power-outage', 'emergency', 'downtown'],
    attachments: [],
    isEmergency: true
  },
  {
    id: '3',
    author: {
      id: '5',
      name: 'Green Community Initiative',
      avatar: 'GCI',
      location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', country: 'USA' },
      expertise: ['Climate Action', 'Community Organizing'],
      reputation: 88,
      isVerified: true
    },
    title: 'Community Tree Planting Event This Weekend',
    content: 'Join us for our monthly community tree planting event! We\'ll be planting native species in Prospect Park...',
    category: 'community',
    location: { latitude: 40.7128, longitude: -74.0060, city: 'New York', country: 'USA' },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    likes: 31,
    comments: [
      {
        id: '4',
        author: { id: '6', name: 'Robert Kim', avatar: 'RK', reputation: 65, isVerified: false, expertise: ['Community Organizing'] },
        content: 'Count me in! What time should I arrive?',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        likes: 2,
        replies: []
      }
    ],
    tags: ['tree-planting', 'community', 'environment'],
    attachments: [],
    isEmergency: false
  }
]

export function CommunityFeed({ category, showEmergencyOnly }: CommunityFeedProps) {
  const { } = useAppStore()
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())

  // Filter posts based on props
  const filteredPosts = mockPosts.filter(post => {
    if (showEmergencyOnly && !post.isEmergency) return false
    if (category && post.category !== category) return false
    return true
  })

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-6">
      {filteredPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isLiked={likedPosts.has(post.id)}
          isCommentsExpanded={expandedComments.has(post.id)}
          onToggleLike={() => toggleLike(post.id)}
          onToggleComments={() => toggleComments(post.id)}
        />
      ))}

      {filteredPosts.length === 0 && (
        <div className="card">
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Posts Found</h3>
            <p className="text-gray-600">
              {showEmergencyOnly
                ? 'No emergency alerts at this time.'
                : category
                  ? `No posts in the ${category} category.`
                  : 'Be the first to share something with your community!'}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function PostCard({
  post,
  isLiked,
  isCommentsExpanded,
  onToggleLike,
  onToggleComments
}: {
  post: CommunityPost
  isLiked: boolean
  isCommentsExpanded: boolean
  onToggleLike: () => void
  onToggleComments: () => void
}) {
  return (
    <div className={`card ${post.isEmergency ? 'border-danger-300 bg-danger-50' : ''}`}>
      {/* Emergency Banner */}
      {post.isEmergency && (
        <div className="bg-danger-600 text-white px-4 py-2 -m-6 mb-4 rounded-t-xl">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Emergency Alert</span>
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-primary-700">
            {post.author.avatar}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            {post.author.isVerified && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Verified
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{post.location?.city || 'Unknown'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formatTimeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <Flag className="h-4 w-4" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
        <p className="text-gray-700 leading-relaxed">{post.content}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-6">
          <button
            onClick={onToggleLike}
            className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
              isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{post.likes + (isLiked ? 1 : 0)}</span>
          </button>

          <button
            onClick={onToggleComments}
            className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>{post.comments.length}</span>
          </button>
        </div>

        <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
          <Share className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {isCommentsExpanded && post.comments.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  const [showReplies, setShowReplies] = useState(false)

  return (
    <div className="flex space-x-3">
      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold text-gray-600">
          {comment.author.avatar}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-gray-100 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-semibold text-gray-900">
              {comment.author.name}
            </span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(comment.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>

        {/* Comment Actions */}
        <div className="flex items-center space-x-4 mt-1 ml-3">
          <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
            Like ({comment.likes})
          </button>
          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs text-gray-500 hover:text-gray-700 font-medium"
            >
              {showReplies ? 'Hide' : 'Show'} {comment.replies.length} repl{comment.replies.length !== 1 ? 'ies' : 'y'}
            </button>
          )}
        </div>

        {/* Replies */}
        {showReplies && comment.replies.length > 0 && (
          <div className="mt-3 ml-6 space-y-2">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="flex space-x-3">
                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-gray-600">
                    {reply.author.avatar}
                  </span>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold text-gray-900">
                      {reply.author.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(reply.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
