'use client'

import Link from 'next/link'
import { Shield, AlertTriangle, MapPin, Users, BookOpen, Settings, ChevronRight } from 'lucide-react'

const quickActions = [
  {
    title: 'Emergency Alerts',
    description: 'View current alerts and notifications',
    icon: AlertTriangle,
    href: '/alerts',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    primary: true
  },
  {
    title: 'Risk Assessment',
    description: 'Get your location\'s disaster risk profile',
    icon: Shield,
    href: '/emergency',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    primary: true
  },
  {
    title: 'Find Resources',
    description: 'Locate nearby emergency services',
    icon: MapPin,
    href: '/resources',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    primary: true
  },
  {
    title: 'Emergency Plans',
    description: 'Create personalized response plans',
    icon: BookOpen,
    href: '/emergency',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    title: 'Community Hub',
    description: 'Connect with your community',
    icon: Users,
    href: '/community',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  {
    title: 'Climate Toolkit',
    description: 'Explore resilience recommendations',
    icon: Settings,
    href: '/climate',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  }
]

export function QuickActions() {
  const primaryActions = quickActions.filter(action => action.primary)
  const secondaryActions = quickActions.filter(action => !action.primary)

  return (
    <div className="py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto px-2">
          Access the most important disaster preparedness tools with just one click.
        </p>
      </div>

      {/* Primary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {primaryActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <Link
              key={index}
              href={action.href}
              className={`${action.bgColor} ${action.borderColor} border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 block group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 ${action.bgColor} rounded-lg flex items-center justify-center ${action.color}`}>
                  <IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <ChevronRight className={`h-5 w-5 ${action.color} group-hover:translate-x-1 transition-transform duration-200`} />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {action.description}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {secondaryActions.map((action, index) => {
          const IconComponent = action.icon
          return (
            <Link
              key={index}
              href={action.href}
              className={`${action.bgColor} ${action.borderColor} border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 block text-center group`}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 ${action.bgColor} rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3 ${action.color}`}>
                <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                {action.title}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-tight">
                {action.description}
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}