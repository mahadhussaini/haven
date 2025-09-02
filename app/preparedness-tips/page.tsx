'use client'

import { useState } from 'react'
import { Lightbulb, Shield, Clock, Heart } from 'lucide-react'

interface PreparednessTip {
  id: string
  title: string
  description: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Advanced'
  timeRequired: string
  cost: string
  icon: string
  steps: string[]
  benefits: string[]
}

const preparednessTips: PreparednessTip[] = [
  {
    id: 'emergency-kit',
    title: 'Build a 72-Hour Emergency Kit',
    description: 'Create a comprehensive emergency kit that can sustain your family for 3 days',
    category: 'Emergency Supplies',
    difficulty: 'Easy',
    timeRequired: '2-3 hours',
    cost: '$100-300',
    icon: '👜',
    steps: [
      'Gather essential items: water, food, first aid, flashlight',
      'Pack personal items: medications, documents, cash',
      'Include comfort items: blankets, change of clothes',
      'Store in accessible, waterproof containers',
      'Review and update contents every 6 months'
    ],
    benefits: [
      'Immediate access to essential supplies',
      'Reduces stress during emergencies',
      'Increases survival chances',
      'Provides comfort and security'
    ]
  },
  {
    id: 'family-plan',
    title: 'Create a Family Emergency Plan',
    description: 'Develop a comprehensive plan for family communication and evacuation',
    category: 'Planning',
    difficulty: 'Easy',
    timeRequired: '1-2 hours',
    cost: 'Free',
    icon: '👨‍👩‍👧‍👦',
    steps: [
      'Identify meeting points for different scenarios',
      'Establish emergency contacts outside your area',
      'Plan evacuation routes from home and work',
      'Practice the plan with family members',
      'Update contact information regularly'
    ],
    benefits: [
      'Ensures family knows what to do',
      'Reduces panic during emergencies',
      'Improves coordination and safety',
      'Provides peace of mind'
    ]
  },
  {
    id: 'home-securing',
    title: 'Secure Your Home Against Disasters',
    description: 'Strengthen your home to withstand various natural disasters',
    category: 'Home Safety',
    difficulty: 'Medium',
    timeRequired: '1-2 days',
    cost: '$500-2000',
    icon: '🏠',
    steps: [
      'Install hurricane shutters or plywood covers',
      'Secure heavy furniture and appliances to walls',
      'Reinforce garage doors and entry points',
      'Improve roof and window connections',
      'Consider earthquake retrofitting if in seismic zone'
    ],
    benefits: [
      'Reduces property damage',
      'Increases home safety',
      'May lower insurance premiums',
      'Protects family and belongings'
    ]
  },
  {
    id: 'communication-backup',
    title: 'Establish Backup Communication Methods',
    description: 'Set up multiple ways to communicate when normal channels fail',
    category: 'Communication',
    difficulty: 'Medium',
    timeRequired: '3-4 hours',
    cost: '$100-500',
    icon: '📻',
    steps: [
      'Purchase emergency radio with weather alerts',
      'Set up family group chat apps',
      'Establish meeting points for different scenarios',
      'Learn local emergency radio frequencies',
      'Practice using backup communication methods'
    ],
    benefits: [
      'Maintains family contact during disasters',
      'Provides access to emergency information',
      'Reduces isolation and anxiety',
      'Enables coordination of response efforts'
    ]
  },
  {
    id: 'skill-development',
    title: 'Learn Essential Survival Skills',
    description: 'Master basic skills that could save lives in emergency situations',
    category: 'Skills',
    difficulty: 'Advanced',
    timeRequired: '20-40 hours',
    cost: '$200-1000',
    icon: '🛠️',
    steps: [
      'Take first aid and CPR certification courses',
      'Learn basic fire safety and prevention',
      'Practice water purification methods',
      'Master basic navigation and orienteering',
      'Develop emergency cooking and food preservation skills'
    ],
    benefits: [
      'Increases self-reliance during disasters',
      'Enables helping others in need',
      'Builds confidence and preparedness',
      'May save lives in critical situations'
    ]
  },
  {
    id: 'community-connection',
    title: 'Build Community Disaster Networks',
    description: 'Connect with neighbors and local organizations for mutual support',
    category: 'Community',
    difficulty: 'Medium',
    timeRequired: '5-10 hours',
    cost: 'Free',
    icon: '🤝',
    steps: [
      'Meet and exchange contact information with neighbors',
      'Join local emergency response groups',
      'Participate in community preparedness events',
      'Share resources and skills with neighbors',
      'Establish neighborhood communication systems'
    ],
    benefits: [
      'Creates mutual support network',
      'Increases community resilience',
      'Provides access to shared resources',
      'Strengthens social connections'
    ]
  }
]

export default function PreparednessTipsPage() {
  const [selectedTip, setSelectedTip] = useState<PreparednessTip | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(preparednessTips.map(tip => tip.category)))]

  const filteredTips = activeCategory === 'all' 
    ? preparednessTips 
    : preparednessTips.filter(tip => tip.category === activeCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return { color: 'text-green-600', bgColor: 'bg-green-50' }
      case 'Medium': return { color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
      case 'Advanced': return { color: 'text-red-600', bgColor: 'bg-red-50' }
      default: return { color: 'text-gray-600', bgColor: 'bg-gray-50' }
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Emergency Supplies': '👜',
      'Planning': '📋',
      'Home Safety': '🏠',
      'Communication': '📻',
      'Skills': '🛠️',
      'Community': '🤝'
    }
    return icons[category] || '📌'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Lightbulb className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Preparedness Tips</h1>
          <p className="text-gray-600">Practical advice and step-by-step guides for disaster preparedness</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All Categories' : category}
          </button>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredTips.map((tip) => (
          <div 
            key={tip.id} 
            className="card cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setSelectedTip(tip)}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{tip.icon}</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(tip.difficulty).bgColor} ${getDifficultyColor(tip.difficulty).color}`}>
                  {tip.difficulty}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {tip.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500 flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{tip.timeRequired}</span>
              </span>
              <span className="text-xs text-gray-500">{tip.cost}</span>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>{getCategoryIcon(tip.category)}</span>
              <span>{tip.category}</span>
            </div>

            <div className="mt-4 text-xs text-blue-600">
              Click to view detailed steps →
            </div>
          </div>
        ))}
      </div>

      {/* Selected Tip Details */}
      {selectedTip && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{selectedTip.icon}</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{selectedTip.title}</h2>
                <p className="text-gray-600">{selectedTip.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedTip(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Difficulty</div>
              <div className={`font-medium ${getDifficultyColor(selectedTip.difficulty).color}`}>
                {selectedTip.difficulty}
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Time Required</div>
              <div className="font-medium text-green-600">{selectedTip.timeRequired}</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Estimated Cost</div>
              <div className="font-medium text-purple-600">{selectedTip.cost}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span>Step-by-Step Guide</span>
              </h3>
              <div className="space-y-3">
                {selectedTip.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Heart className="h-5 w-5 text-green-600" />
                <span>Key Benefits</span>
              </h3>
              <div className="space-y-3">
                {selectedTip.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Additional Resources</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Related Training</h5>
                <ul className="space-y-1">
                  <li>• First Aid & CPR certification</li>
                  <li>• Emergency response workshops</li>
                  <li>• Disaster preparedness courses</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Equipment & Supplies</h5>
                <ul className="space-y-1">
                  <li>• Emergency supply checklists</li>
                  <li>• Home improvement guides</li>
                  <li>• Communication equipment reviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Tips Section */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Preparedness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">💧</div>
            <div className="font-semibold text-blue-900">Water Storage</div>
            <div className="text-sm text-blue-700">Store 1 gallon per person per day</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <div className="font-semibold text-green-900">Phone Backup</div>
            <div className="text-sm text-green-700">Keep portable chargers ready</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">📻</div>
            <div className="font-semibold text-purple-900">Emergency Radio</div>
            <div className="text-sm text-purple-700">Stay informed during outages</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl mb-2">🚪</div>
            <div className="font-semibold text-orange-900">Escape Routes</div>
            <div className="text-sm text-orange-700">Plan multiple exit paths</div>
          </div>
        </div>
      </div>

      {/* Seasonal Preparedness */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Seasonal Preparedness Checklist</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Spring (March-May)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Clean gutters and downspouts</li>
              <li>• Inspect and repair roof damage</li>
              <li>• Test emergency equipment</li>
              <li>• Update emergency contact lists</li>
              <li>• Review and practice evacuation plans</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Summer (June-August)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Prepare for heat waves and droughts</li>
              <li>• Check air conditioning systems</li>
              <li>• Stock up on water and electrolytes</li>
              <li>• Create cooling center plans</li>
              <li>• Monitor wildfire risks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Fall (September-November)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Prepare for hurricane season</li>
              <li>• Winterize home and vehicles</li>
              <li>• Stock up on winter supplies</li>
              <li>• Check heating systems</li>
              <li>• Update emergency kits</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Winter (December-February)</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Prepare for winter storms</li>
              <li>• Check emergency heating options</li>
              <li>• Insulate pipes and windows</li>
              <li>• Keep emergency supplies accessible</li>
              <li>• Monitor weather forecasts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
