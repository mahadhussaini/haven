'use client'

import { useState } from 'react'
import { Leaf, TrendingUp, Target, BookOpen, Calculator, MapPin } from 'lucide-react'
import { ResilienceRecommendations } from '@/components/climate/ResilienceRecommendations'
import { useAppStore } from '@/store/useAppStore'

const climateModules = [
  {
    id: 'carbon-footprint',
    title: 'Carbon Footprint Calculator',
    description: 'Calculate your personal and household carbon emissions',
    icon: Calculator,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    difficulty: 'Easy',
    duration: '15 mins'
  },
  {
    id: 'energy-audit',
    title: 'Home Energy Audit',
    description: 'Assess your home\'s energy efficiency and identify improvements',
    icon: Target,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    difficulty: 'Medium',
    duration: '30 mins'
  },
  {
    id: 'climate-education',
    title: 'Climate Science Basics',
    description: 'Learn about climate change science and local impacts',
    icon: BookOpen,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    difficulty: 'Easy',
    duration: '20 mins'
  },
  {
    id: 'adaptation-planning',
    title: 'Climate Adaptation Planning',
    description: 'Develop strategies to adapt to local climate changes',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    difficulty: 'Medium',
    duration: '45 mins'
  }
]

export default function ClimatePage() {
  const { userLocation } = useAppStore()
  const [activeTab, setActiveTab] = useState<'recommendations' | 'education'>('recommendations')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Leaf className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Climate Resilience Toolkit</h1>
          <p className="text-gray-600">AI-powered recommendations for sustainable living and climate adaptation</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'recommendations'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Action Recommendations
        </button>
        <button
          onClick={() => setActiveTab('education')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'education'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Climate Education
        </button>
      </div>

      {activeTab === 'recommendations' ? (
        <div className="space-y-8">
          {/* Climate Impact Overview */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Climate Impact Overview</h2>
              </div>
              {userLocation && (
                <div className="text-sm text-gray-600">
                  Data for {userLocation.city || `${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}`}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">+2.1°C</div>
                <div className="text-sm text-gray-600">Global Temperature Rise</div>
                <div className="text-xs text-gray-500 mt-1">Since pre-industrial times</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">420 ppm</div>
                <div className="text-sm text-gray-600">CO₂ Concentration</div>
                <div className="text-xs text-gray-500 mt-1">Current atmospheric level</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">1.5°C</div>
                <div className="text-sm text-gray-600">Paris Agreement Target</div>
                <div className="text-xs text-gray-500 mt-1">Limit warming to avoid worst impacts</div>
              </div>
            </div>
          </div>

          {/* Resilience Recommendations */}
          <ResilienceRecommendations />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Climate Education Modules */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Climate Education Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {climateModules.map((module) => {
                const IconComponent = module.icon
                return (
                  <div
                    key={module.id}
                    className={`card cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${module.bgColor}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${module.bgColor} ${module.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {module.difficulty}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {module.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {module.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <BookOpen className="h-4 w-4" />
                        <span>{module.duration}</span>
                      </div>
                      <button className="btn-primary text-sm px-4 py-2">
                        Start Module
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Climate Facts */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Climate Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Extreme Weather Events</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Heatwaves are becoming more frequent and intense</li>
                  <li>• Heavy precipitation events are increasing</li>
                  <li>• Droughts are becoming more severe and prolonged</li>
                  <li>• Hurricanes are becoming stronger</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sea Level Rise</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Global sea levels have risen 8 inches since 1880</li>
                  <li>• Coastal communities face increased flooding risk</li>
                  <li>• Saltwater intrusion threatens freshwater supplies</li>
                  <li>• Some island nations may become uninhabitable</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Climate Action Categories */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Climate Action Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-green-900">Energy</div>
                <div className="text-sm text-green-700">Reduce emissions from energy use</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-2">🚗</div>
                <div className="font-semibold text-blue-900">Transportation</div>
                <div className="text-sm text-blue-700">Lower transportation emissions</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-2">🏠</div>
                <div className="font-semibold text-purple-900">Buildings</div>
                <div className="text-sm text-purple-700">Improve building efficiency</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl mb-2">🌾</div>
                <div className="font-semibold text-orange-900">Food Systems</div>
                <div className="text-sm text-orange-700">Sustainable food production</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
