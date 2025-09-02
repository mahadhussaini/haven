'use client'

import { useState } from 'react'
import { Shield, AlertTriangle, CloudRain, Zap, Flame, Thermometer, Snowflake, Waves, Mountain, Droplets } from 'lucide-react'
import { EmergencyPlanGenerator } from '@/components/emergency/EmergencyPlanGenerator'
import { DisasterType } from '@/types'

const disasterTypes: Array<{
  type: DisasterType
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
}> = [
  {
    type: DisasterType.EARTHQUAKE,
    name: 'Earthquake',
    description: 'Ground shaking and structural damage from seismic activity',
    icon: Zap,
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    type: DisasterType.FLOOD,
    name: 'Flood',
    description: 'Rising water levels and flash flooding from heavy rain',
    icon: Droplets,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    type: DisasterType.HURRICANE,
    name: 'Hurricane',
    description: 'Tropical storms with high winds and heavy rainfall',
    icon: CloudRain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    type: DisasterType.WILDFIRE,
    name: 'Wildfire',
    description: 'Fast-spreading fires in dry vegetation and forests',
    icon: Flame,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    type: DisasterType.HEATWAVE,
    name: 'Heatwave',
    description: 'Extended periods of extreme high temperatures',
    icon: Thermometer,
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  {
    type: DisasterType.BLIZZARD,
    name: 'Blizzard',
    description: 'Heavy snow with high winds and reduced visibility',
    icon: Snowflake,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    type: DisasterType.TSUNAMI,
    name: 'Tsunami',
    description: 'Large ocean waves triggered by underwater earthquakes',
    icon: Waves,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    type: DisasterType.VOLCANIC,
    name: 'Volcanic Eruption',
    description: 'Lava, ash, and gases from volcanic activity',
    icon: Mountain,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50'
  }
]

export default function EmergencyPage() {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType | null>(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Shield className="h-8 w-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Response Guide</h1>
          <p className="text-gray-600">AI-generated emergency plans and step-by-step guidance for any disaster scenario</p>
        </div>
      </div>

      {!selectedDisaster ? (
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Emergency Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <div className="text-left">
                  <div className="font-medium text-red-900">Immediate Danger</div>
                  <div className="text-sm text-red-700">Drop, Cover, Hold</div>
                </div>
              </button>

              <button className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <Shield className="h-6 w-6 text-blue-600" />
                <div className="text-left">
                  <div className="font-medium text-blue-900">Evacuation</div>
                  <div className="text-sm text-blue-700">Follow Routes</div>
                </div>
              </button>

              <button className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <CloudRain className="h-6 w-6 text-green-600" />
                <div className="text-left">
                  <div className="font-medium text-green-900">Emergency Kit</div>
                  <div className="text-sm text-green-700">Check Supplies</div>
                </div>
              </button>
            </div>
          </div>

          {/* Disaster Types Grid */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Disaster Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {disasterTypes.map((disaster) => {
                const IconComponent = disaster.icon
                return (
                  <button
                    key={disaster.type}
                    onClick={() => setSelectedDisaster(disaster.type)}
                    className={`card text-left hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 ${disaster.bgColor} border-2 border-transparent hover:border-${disaster.color.split('-')[1]}-300`}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg ${disaster.bgColor} ${disaster.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{disaster.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {disaster.description}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* General Preparedness Tips */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">General Preparedness Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Before a Disaster</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Prepare an emergency kit with essentials</li>
                  <li>• Create a family communication plan</li>
                  <li>• Know your evacuation routes</li>
                  <li>• Secure your home and valuables</li>
                  <li>• Learn about local hazards</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">During a Disaster</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Stay calm and follow instructions</li>
                  <li>• Move to higher ground if flooding</li>
                  <li>• Drop, cover, and hold during shaking</li>
                  <li>• Avoid downed power lines</li>
                  <li>• Use emergency radio for updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Back Button */}
          <button
            onClick={() => setSelectedDisaster(null)}
            className="mb-6 text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-2"
          >
            ← Back to Disaster Types
          </button>

          {/* Emergency Plan Generator */}
          <EmergencyPlanGenerator
            disasterType={selectedDisaster}
            onPlanGenerated={(plan) => {
              console.log('Emergency plan generated:', plan)
            }}
          />
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <div className="text-2xl">🚨</div>
            <div>
              <div className="font-semibold text-red-900">Emergency Services</div>
              <div className="text-red-700 font-bold">911</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl">🌊</div>
            <div>
              <div className="font-semibold text-blue-900">Flood Hotline</div>
              <div className="text-blue-700">1-800-FLOOD</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl">🔥</div>
            <div>
              <div className="font-semibold text-orange-900">Fire Department</div>
              <div className="text-orange-700">1-800-FIRE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
