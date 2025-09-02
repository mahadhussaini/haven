'use client'

import { Shield, AlertTriangle, MapPin, Users, Leaf, CloudRain, Zap, Thermometer } from 'lucide-react'

const features = [
  {
    icon: AlertTriangle,
    title: 'Real-Time Alerts',
    description: 'Get instant notifications about weather emergencies, earthquakes, floods, and other disasters in your area.',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    icon: Shield,
    title: 'AI Risk Assessment',
    description: 'Personalized vulnerability analysis based on your location, with tailored preparedness recommendations.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    icon: MapPin,
    title: 'Resource Finder',
    description: 'Interactive maps to locate nearby emergency shelters, hospitals, fire stations, and relief centers.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    icon: CloudRain,
    title: 'Weather Intelligence',
    description: 'Advanced weather forecasting with severe weather alerts and climate trend analysis.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  {
    icon: Users,
    title: 'Community Hub',
    description: 'Connect with neighbors, share emergency information, and coordinate community response efforts.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    icon: Leaf,
    title: 'Climate Resilience',
    description: 'AI-powered recommendations for sustainable practices and long-term climate adaptation strategies.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    icon: Zap,
    title: 'Emergency Plans',
    description: 'Generate personalized emergency response plans for different disaster scenarios with step-by-step guidance.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  {
    icon: Thermometer,
    title: 'Offline Mode',
    description: 'Access critical survival information and emergency guides even without internet connectivity.',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
]

export function Features() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Comprehensive Disaster Preparedness
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
          Everything you need to prepare for, respond to, and recover from natural disasters and climate challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div
              key={index}
              className={`${feature.bgColor} ${feature.borderColor} border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                <IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}