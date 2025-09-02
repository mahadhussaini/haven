'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, MapPin, Shield, AlertTriangle, Users } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { LocationInput } from '@/components/common/LocationInput'

export function Hero() {
  const { userLocation, setUserLocation, activeAlerts } = useAppStore()
  const [showLocationInput, setShowLocationInput] = useState(false)

  useEffect(() => {
    // Auto-request location on first visit if not set
    if (!userLocation && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        },
        (error) => {
          console.log('Geolocation error:', error)
          setShowLocationInput(true)
        },
        { timeout: 10000 }
      )
    }
  }, [userLocation, setUserLocation])

  const criticalAlerts = activeAlerts.filter(alert => 
    alert.severity === 'extreme' || alert.severity === 'high'
  )

  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Critical Alert Banner */}
          {criticalAlerts.length > 0 && (
            <div className="mb-8 inline-flex items-center space-x-2 bg-danger-600 text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              <span>{criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? 's' : ''} in your area</span>
            </div>
          )}

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Haven
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-blue-100 leading-relaxed max-w-4xl mx-auto px-2">
            Your AI-powered sanctuary for disaster preparedness and climate resilience.
            Real-time alerts, personalized guidance, and community support when you need it most.
          </p>

          {/* Location Setup */}
          {!userLocation || showLocationInput ? (
            <div className="mb-6 sm:mb-8 px-2">
              <p className="text-base sm:text-lg mb-4 text-blue-100 text-center">
                Get started by setting your location for personalized alerts and recommendations
              </p>
              <div className="max-w-md mx-auto">
                <LocationInput
                  onLocationSelect={(location) => {
                    setUserLocation(location)
                    setShowLocationInput(false)
                  }}
                  placeholder="Enter your city or address..."
                />
              </div>
            </div>
          ) : (
            <div className="mb-6 sm:mb-8 flex items-center justify-center space-x-2 text-blue-100 px-2">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-sm sm:text-base truncate">
                {userLocation.city ?
                  `${userLocation.city}, ${userLocation.country}` :
                  `${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}`
                }
              </span>
              <button
                onClick={() => setShowLocationInput(true)}
                className="text-yellow-400 hover:text-yellow-300 underline text-sm whitespace-nowrap"
              >
                Change
              </button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4 mb-8 sm:mb-12 px-2">
            <button className="btn-primary bg-white text-primary-700 hover:bg-gray-100 w-full sm:w-auto flex items-center justify-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-200">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span>Get Risk Assessment</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            </button>

            <button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-700 w-full sm:w-auto flex items-center justify-center space-x-2 text-base sm:text-lg px-6 sm:px-8 py-3 transition-all duration-200">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span>Join Community</span>
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16 px-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">Real-Time Alerts</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Instant notifications for weather emergencies, earthquakes, and climate events in your area.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-200">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">AI Risk Assessment</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Location-based vulnerability analysis with personalized preparedness recommendations.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-200 sm:col-span-2 lg:col-span-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-center">Community Hub</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Connect with neighbors, share resources, and coordinate emergency response efforts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="rgb(239, 246, 255)"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,229.3C672,224,768,192,864,165.3C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
