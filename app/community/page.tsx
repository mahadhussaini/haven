'use client'

import { useState } from 'react'
import { MessageCircle, Plus, Users, AlertTriangle, MapPin, Search } from 'lucide-react'
import { CommunityFeed } from '@/components/community/CommunityFeed'

const categories = [
  { id: 'all', label: 'All Posts', icon: '📝' },
  { id: 'emergency', label: 'Emergency Alerts', icon: '🚨' },
  { id: 'preparedness', label: 'Preparedness', icon: '🛡️' },
  { id: 'community', label: 'Community', icon: '👥' },
  { id: 'resources', label: 'Resources', icon: '📦' },
  { id: 'climate', label: 'Climate Action', icon: '🌱' }
]

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Users className="h-8 w-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
          <p className="text-gray-600">Connect, share knowledge, and coordinate emergency response</p>
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-primary-600 mb-2">1,247</div>
          <div className="text-sm text-gray-600">Community Members</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">89</div>
          <div className="text-sm text-gray-600">Active Discussions</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">23</div>
          <div className="text-sm text-gray-600">Emergency Alerts</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">156</div>
          <div className="text-sm text-gray-600">Resources Shared</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
              <Plus className="h-5 w-5" />
              <span>Share Update</span>
            </button>
            <button className="flex items-center space-x-2 bg-danger-600 text-white px-4 py-2 rounded-lg hover:bg-danger-700 transition-colors">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Alert</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="community-search"
                name="searchQuery"
                type="text"
                placeholder="Search community..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
              />
            </div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                id="emergency-only"
                name="showEmergencyOnly"
                type="checkbox"
                checked={showEmergencyOnly}
                onChange={(e) => setShowEmergencyOnly(e.target.checked)}
                className="rounded border-gray-300 text-danger-600 focus:ring-danger-500"
              />
              <span className="text-sm font-medium text-gray-700">Emergency Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Community Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-3">
          <CommunityFeed
            category={selectedCategory === 'all' ? undefined : selectedCategory}
            showEmergencyOnly={showEmergencyOnly}
          />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Community Guidelines */}
          <div className="card sticky top-8 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Share accurate emergency information</li>
              <li>• Respect privacy during crises</li>
              <li>• Coordinate through verified channels</li>
              <li>• Support vulnerable community members</li>
              <li>• Report suspicious activity</li>
            </ul>
          </div>

          {/* Active Volunteers */}
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Volunteers</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-green-700">SJ</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Sarah Johnson</div>
                  <div className="text-xs text-gray-500">First Aid Specialist</div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-blue-700">MC</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Mike Chen</div>
                  <div className="text-xs text-gray-500">Emergency Coordinator</div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-purple-700">LP</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">Lisa Park</div>
                  <div className="text-xs text-gray-500">Community Organizer</div>
                </div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Emergency Resources */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Resources</h3>
            <div className="space-y-3">
              <button className="w-full text-left flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <MapPin className="h-5 w-5 text-primary-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Find Shelter</div>
                  <div className="text-xs text-gray-500">Nearby emergency shelters</div>
                </div>
              </button>
              <button className="w-full text-left flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Emergency Chat</div>
                  <div className="text-xs text-gray-500">Connect with responders</div>
                </div>
              </button>
              <button className="w-full text-left flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-gray-900">Volunteer Network</div>
                  <div className="text-xs text-gray-500">Join response efforts</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
