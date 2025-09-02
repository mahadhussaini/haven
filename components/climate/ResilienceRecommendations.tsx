'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { Leaf, DollarSign, Clock, Star, CheckCircle, ExternalLink, Filter } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { aiApi } from '@/lib/api'
import { ResilienceCategory } from '@/types'
import type { ResilienceRecommendation } from '@/types'

interface ResilienceRecommendationsProps {
  category?: ResilienceCategory
  maxCost?: number
  difficulty?: 'easy' | 'moderate' | 'hard'
}

export function ResilienceRecommendations({
  maxCost,
  difficulty
}: ResilienceRecommendationsProps) {
  const { userLocation } = useAppStore()
  const [selectedCategory, setSelectedCategory] = useState<ResilienceCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<'impact' | 'cost' | 'timeframe'>('impact')
  const [savedRecommendations, setSavedRecommendations] = useState<Set<string>>(new Set())

  const { data: recommendations, isLoading } = useQuery(
    ['resilienceRecommendations', userLocation],
    () => aiApi.getResilienceRecommendations(userLocation!),
    {
      enabled: !!userLocation
    }
  )

  const categories: Array<{
    value: ResilienceCategory | 'all'
    label: string
    icon: string
  }> = [
    { value: 'all', label: 'All Categories', icon: '🌱' },
    { value: ResilienceCategory.ENERGY_EFFICIENCY, label: 'Energy Efficiency', icon: '⚡' },
    { value: ResilienceCategory.WATER_CONSERVATION, label: 'Water Conservation', icon: '💧' },
    { value: ResilienceCategory.SUSTAINABLE_TRANSPORT, label: 'Sustainable Transport', icon: '🚲' },
    { value: ResilienceCategory.WASTE_REDUCTION, label: 'Waste Reduction', icon: '♻️' },
    { value: ResilienceCategory.GREEN_INFRASTRUCTURE, label: 'Green Infrastructure', icon: '🌳' },
    { value: ResilienceCategory.COMMUNITY_RESILIENCE, label: 'Community Resilience', icon: '👥' },
    { value: ResilienceCategory.EMERGENCY_PREPAREDNESS, label: 'Emergency Preparedness', icon: '🛡️' }
  ]

  const filteredRecommendations = recommendations?.filter(rec => {
    if (selectedCategory !== 'all' && rec.category !== selectedCategory) return false
    if (maxCost && rec.cost.max > maxCost) return false
    if (difficulty && rec.difficulty !== difficulty) return false
    return true
  }) || []

  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    switch (sortBy) {
      case 'impact':
        const impactOrder: Record<string, number> = { high: 3, medium: 2, low: 1 }
        return impactOrder[b.impact] - impactOrder[a.impact]
      case 'cost':
        return (a.cost.min + a.cost.max) / 2 - (b.cost.min + b.cost.max) / 2
      case 'timeframe':
        const timeOrder = { '3-6 months': 3, '1-3 months': 2, '1 month': 1 }
        return (timeOrder[a.timeframe as keyof typeof timeOrder] || 0) -
               (timeOrder[b.timeframe as keyof typeof timeOrder] || 0)
      default:
        return 0
    }
  })

  const toggleSaved = (id: string) => {
    const newSaved = new Set(savedRecommendations)
    if (newSaved.has(id)) {
      newSaved.delete(id)
    } else {
      newSaved.add(id)
    }
    setSavedRecommendations(newSaved)
  }

  if (!userLocation) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Location Required</h3>
          <p className="text-gray-600">Set your location to receive personalized climate resilience recommendations.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <span className="font-medium text-gray-900">Filter by Category:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-primary-100 text-primary-800 border border-primary-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            id="recommendation-sort"
            name="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          >
            <option value="impact">Impact Level</option>
            <option value="cost">Cost</option>
            <option value="timeframe">Timeframe</option>
          </select>
        </div>
      </div>

      {/* Recommendations Grid */}
      {sortedRecommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sortedRecommendations.map((rec) => (
            <RecommendationCard
              key={rec.id}
              recommendation={rec}
              isSaved={savedRecommendations.has(rec.id)}
              onToggleSaved={() => toggleSaved(rec.id)}
            />
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="text-center py-12">
            <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Recommendations Found</h3>
            <p className="text-gray-600 mb-4">
              No recommendations match your current filters. Try adjusting your criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSortBy('impact')
              }}
              className="btn-primary"
            >
              Show All Recommendations
            </button>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {recommendations && recommendations.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Climate Action Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {recommendations.length}
              </div>
              <div className="text-sm text-gray-600">Total Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {savedRecommendations.size}
              </div>
              <div className="text-sm text-gray-600">Saved for Later</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                ${recommendations.reduce((sum, rec) => sum + rec.cost.min, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Min. Total Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(recommendations.filter(rec => rec.impact === 'high').length / recommendations.length * 100)}%
              </div>
              <div className="text-sm text-gray-600">High Impact Actions</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function RecommendationCard({
  recommendation,
  isSaved,
  onToggleSaved
}: {
  recommendation: ResilienceRecommendation
  isSaved: boolean
  onToggleSaved: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'green'
      case 'moderate': return 'yellow'
      case 'hard': return 'red'
      default: return 'gray'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'green'
      case 'medium': return 'yellow'
      case 'low': return 'red'
      default: return 'gray'
    }
  }

  const difficultyColor = getDifficultyColor(recommendation.difficulty)
  const impactColor = getImpactColor(recommendation.impact)

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {recommendation.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {recommendation.description}
          </p>
        </div>
        <button
          onClick={onToggleSaved}
          className={`p-2 rounded-full transition-colors ${
            isSaved
              ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
          }`}
        >
          <Star className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${difficultyColor}-100 text-${difficultyColor}-800`}>
          {recommendation.difficulty.charAt(0).toUpperCase() + recommendation.difficulty.slice(1)}
        </span>
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${impactColor}-100 text-${impactColor}-800`}>
          {recommendation.impact} Impact
        </span>
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {recommendation.category.replace('_', ' ')}
        </span>
      </div>

      {/* Cost and Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              ${recommendation.cost.min.toLocaleString()} - ${recommendation.cost.max.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Estimated Cost</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">{recommendation.timeframe}</div>
            <div className="text-xs text-gray-500">Timeframe</div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {recommendation.benefits.slice(0, isExpanded ? undefined : 2).map((benefit, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        {recommendation.benefits.length > 2 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2"
          >
            {isExpanded ? 'Show Less' : `Show ${recommendation.benefits.length - 2} More Benefits`}
          </button>
        )}
      </div>

      {/* Action Steps */}
      {isExpanded && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Implementation Steps:</h4>
          <ol className="text-sm text-gray-600 space-y-1">
            {recommendation.steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-primary-600 font-medium">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Resources */}
      {recommendation.resources && recommendation.resources.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Resources:</h4>
          <div className="space-y-1">
            {recommendation.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
              >
                <ExternalLink className="h-3 w-3" />
                <span>{resource.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-center text-primary-600 hover:text-primary-700 font-medium text-sm py-2 border-t border-gray-100"
      >
        {isExpanded ? 'Show Less' : 'Learn More'}
      </button>
    </div>
  )
}
