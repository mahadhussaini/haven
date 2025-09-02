'use client'

import { useState } from 'react'
import { BookOpen, AlertTriangle, Shield, Phone, MapPin, Clock, Users, Download } from 'lucide-react'

interface EmergencyGuide {
  id: string
  title: string
  description: string
  icon: string
  color: string
  bgColor: string
  content: string[]
  beforeActions: string[]
  duringActions: string[]
  afterActions: string[]
}

const emergencyGuides: EmergencyGuide[] = [
  {
    id: 'earthquake',
    title: 'Earthquake Preparedness',
    description: 'Stay safe during and after earthquakes',
    icon: '🌋',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    content: [
      'Earthquakes can strike without warning and cause significant damage to buildings and infrastructure.',
      'Understanding what to do before, during, and after an earthquake can save lives.',
      'Preparation includes securing furniture, creating emergency kits, and practicing evacuation drills.'
    ],
    beforeActions: [
      'Secure heavy furniture and appliances to walls',
      'Create an emergency kit with food, water, and first aid supplies',
      'Identify safe spots in each room (under sturdy tables, against interior walls)',
      'Practice "Drop, Cover, and Hold On" drills with family',
      'Learn how to turn off gas, electricity, and water',
      'Keep important documents in a fireproof, portable container'
    ],
    duringActions: [
      'Drop to your hands and knees immediately',
      'Cover your head and neck with your arms',
      'Hold on to any sturdy furniture until shaking stops',
      'Stay away from windows, mirrors, and heavy objects',
      'If outdoors, move to an open area away from buildings and trees',
      'If driving, pull over and stop in a safe location'
    ],
    afterActions: [
      'Check yourself and others for injuries',
      'Evacuate the building if it appears unsafe',
      'Check for gas leaks and turn off utilities if necessary',
      'Listen to emergency broadcasts for information',
      'Be prepared for aftershocks',
      'Help neighbors who may need assistance'
    ]
  },
  {
    id: 'flood',
    title: 'Flood Safety Guide',
    description: 'Protect yourself during flooding events',
    icon: '🌊',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    content: [
      'Floods are the most common natural disaster and can develop slowly or occur suddenly.',
      'Flash floods can happen within minutes and are extremely dangerous.',
      'Never attempt to walk, swim, or drive through floodwaters.'
    ],
    beforeActions: [
      'Know your area\'s flood risk and evacuation routes',
      'Create an emergency kit with essential supplies',
      'Elevate electrical panels and appliances if possible',
      'Install check valves to prevent floodwater backup',
      'Keep important documents in waterproof containers',
      'Sign up for local flood warnings and alerts'
    ],
    duringActions: [
      'Move to higher ground immediately',
      'Follow evacuation orders from local authorities',
      'Never walk through moving water (6 inches can knock you down)',
      'Avoid driving through flooded areas',
      'Stay away from electrical equipment and power lines',
      'Listen to emergency broadcasts for updates'
    ],
    afterActions: [
      'Wait for authorities to declare it safe to return',
      'Avoid floodwaters as they may be contaminated',
      'Check for structural damage before entering buildings',
      'Document damage with photos for insurance claims',
      'Clean and disinfect everything that got wet',
      'Monitor local news for health and safety information'
    ]
  },
  {
    id: 'wildfire',
    title: 'Wildfire Survival',
    description: 'Navigate wildfire emergencies safely',
    icon: '🔥',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    content: [
      'Wildfires can spread rapidly and create dangerous conditions for communities.',
      'Early evacuation is crucial for survival during wildfire events.',
      'Preparation includes creating defensible space around your property.'
    ],
    beforeActions: [
      'Create a 30-foot defensible space around your home',
      'Remove dead vegetation and flammable materials',
      'Install ember-resistant vents and screens',
      'Create an evacuation plan with multiple routes',
      'Pack emergency supplies and important documents',
      'Sign up for local wildfire alerts and warnings'
    ],
    duringActions: [
      'Evacuate immediately when ordered by authorities',
      'Follow designated evacuation routes',
      'Close all windows and doors before leaving',
      'Turn off gas, propane, and electricity',
      'Wear protective clothing if evacuation is delayed',
      'Stay informed through emergency broadcasts'
    ],
    afterActions: [
      'Wait for official clearance before returning',
      'Check for hot spots and smoldering areas',
      'Avoid damaged or downed power lines',
      'Document damage for insurance purposes',
      'Begin cleanup only when safe to do so',
      'Monitor air quality and health advisories'
    ]
  },
  {
    id: 'hurricane',
    title: 'Hurricane Preparedness',
    description: 'Prepare for hurricane season and storms',
    icon: '🌀',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    content: [
      'Hurricanes bring high winds, heavy rainfall, and storm surges.',
      'Preparation should begin well before hurricane season.',
      'Have multiple evacuation plans and emergency supplies ready.'
    ],
    beforeActions: [
      'Create an emergency kit with 7 days of supplies',
      'Secure outdoor furniture and loose objects',
      'Install hurricane shutters or plywood covers',
      'Know your evacuation zone and routes',
      'Trim trees and remove dead branches',
      'Review your insurance coverage and document property'
    ],
    duringActions: [
      'Stay indoors and away from windows and doors',
      'Take shelter in an interior room or basement',
      'Listen to weather updates and emergency broadcasts',
      'Avoid using candles (use flashlights instead)',
      'Turn off utilities if instructed by authorities',
      'Stay away from flood-prone areas and storm surges'
    ],
    afterActions: [
      'Wait for official clearance before going outside',
      'Check for injuries and provide first aid if needed',
      'Avoid downed power lines and standing water',
      'Document damage with photos and videos',
      'Contact insurance company to report damage',
      'Help neighbors who may need assistance'
    ]
  },
  {
    id: 'heatwave',
    title: 'Heatwave Safety',
    description: 'Stay cool during extreme heat events',
    icon: '☀️',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    content: [
      'Heatwaves can cause serious health problems, especially for vulnerable populations.',
      'Extreme heat can develop quickly and last for several days.',
      'Stay hydrated and find ways to stay cool during hot weather.'
    ],
    beforeActions: [
      'Install air conditioning or identify cooling centers',
      'Stock up on water and electrolyte drinks',
      'Create a plan for vulnerable family members',
      'Learn the signs of heat-related illness',
      'Identify shady areas and cool locations nearby',
      'Check weather forecasts and heat advisories'
    ],
    duringActions: [
      'Stay indoors during the hottest hours (10 AM - 4 PM)',
      'Drink plenty of water, even if not thirsty',
      'Wear loose, light-colored clothing',
      'Take cool showers or baths to lower body temperature',
      'Use fans and air conditioning when available',
      'Check on elderly neighbors and family members'
    ],
    afterActions: [
      'Continue monitoring weather conditions',
      'Check for signs of heat exhaustion or heat stroke',
      'Gradually return to normal activities',
      'Replenish emergency supplies',
      'Review and update your heat safety plan',
      'Stay informed about future heat advisories'
    ]
  }
]

export default function EmergencyGuidePage() {
  const [selectedGuide, setSelectedGuide] = useState<EmergencyGuide | null>(null)
  const [activeTab, setActiveTab] = useState<'before' | 'during' | 'after'>('before')

  const downloadGuide = (guide: EmergencyGuide) => {
    const content = `
Emergency Guide: ${guide.title}

BEFORE:
${guide.beforeActions.map(action => `• ${action}`).join('\n')}

DURING:
${guide.duringActions.map(action => `• ${action}`).join('\n')}

AFTER:
${guide.afterActions.map(action => `• ${action}`).join('\n')}
    `.trim()
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${guide.title.toLowerCase().replace(/\s+/g, '-')}-guide.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <BookOpen className="h-8 w-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Guide</h1>
          <p className="text-gray-600">Comprehensive disaster preparedness and response guides</p>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Phone className="h-5 w-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
            <Phone className="h-5 w-5 text-red-600" />
            <div>
              <div className="font-medium text-red-900">Emergency Services</div>
              <div className="text-sm text-red-700">911</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900">Local Emergency</div>
              <div className="text-sm text-blue-700">Check local directory</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Users className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-medium text-green-900">Family Contacts</div>
              <div className="text-sm text-green-700">Keep updated list</div>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {emergencyGuides.map((guide) => (
          <div 
            key={guide.id} 
            className={`card cursor-pointer hover:shadow-lg transition-all duration-200 ${guide.bgColor}`}
            onClick={() => setSelectedGuide(guide)}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">{guide.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                <p className="text-sm text-gray-600">{guide.description}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              {guide.content.slice(0, 2).map((item, index) => (
                <p key={index} className="text-sm text-gray-700">{item}</p>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-500">Click to view full guide</span>
              <AlertTriangle className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Selected Guide Details */}
      {selectedGuide && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{selectedGuide.icon}</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{selectedGuide.title}</h2>
                <p className="text-gray-600">{selectedGuide.description}</p>
              </div>
            </div>
            <button
              onClick={() => downloadGuide(selectedGuide)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Guide</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('before')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'before'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Before
            </button>
            <button
              onClick={() => setActiveTab('during')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'during'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              During
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'after'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              After
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'before' && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Preparation Actions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedGuide.beforeActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'during' && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Emergency Response</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedGuide.duringActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'after' && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Recovery Actions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedGuide.afterActions.map((action, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Important Notes</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Always follow official evacuation orders from local authorities</li>
              <li>• Keep emergency supplies updated and easily accessible</li>
              <li>• Practice emergency procedures regularly with family members</li>
              <li>• Stay informed through local emergency broadcasts and alerts</li>
              <li>• Have multiple evacuation routes planned in advance</li>
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setSelectedGuide(null)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* General Preparedness Tips */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">General Preparedness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Emergency Kit Essentials</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Water (1 gallon per person per day for 3 days)</li>
              <li>• Non-perishable food (3-day supply)</li>
              <li>• First aid kit and medications</li>
              <li>• Flashlight and extra batteries</li>
              <li>• Emergency radio and phone charger</li>
              <li>• Important documents and cash</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Communication Plan</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Designate meeting points for family</li>
              <li>• Establish emergency contacts outside your area</li>
              <li>• Learn local emergency procedures</li>
              <li>• Keep emergency numbers easily accessible</li>
              <li>• Practice your communication plan regularly</li>
              <li>• Have backup communication methods</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
