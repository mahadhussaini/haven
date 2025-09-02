'use client'

import { useState, useCallback } from 'react'
import { MapPin, Search, Loader } from 'lucide-react'
import { debounce } from '@/lib/utils'
import type { Location } from '@/types'

interface LocationInputProps {
  onLocationSelect: (location: Location) => void
  placeholder?: string
  className?: string
}

interface LocationSuggestion {
  display_name: string
  lat: string
  lon: string
  address: {
    city?: string
    town?: string
    village?: string
    state?: string
    country?: string
  }
}

export function LocationInput({ 
  onLocationSelect, 
  placeholder = "Enter location...",
  className = ""
}: LocationInputProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 3) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      try {
        // Using Nominatim (OpenStreetMap) geocoding service
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1`
        )
        const data = await response.json()
        setSuggestions(data)
      } catch (error) {
        console.error('Geocoding error:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, 300),
    []
  )

  const handleInputChange = (value: string) => {
    setQuery(value)
    setShowSuggestions(true)
    debouncedSearch(value)
  }

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    const location: Location = {
      latitude: parseFloat(suggestion.lat),
      longitude: parseFloat(suggestion.lon),
      city: suggestion.address.city || suggestion.address.town || suggestion.address.village,
      state: suggestion.address.state,
      country: suggestion.address.country,
      address: suggestion.display_name,
    }

    onLocationSelect(location)
    setQuery(suggestion.display_name)
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location: Location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }

          // Reverse geocode to get address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}&addressdetails=1`
            )
            const data = await response.json()
            
            if (data.address) {
              location.city = data.address.city || data.address.town || data.address.village
              location.state = data.address.state
              location.country = data.address.country
              location.address = data.display_name
            }
          } catch (error) {
            console.error('Reverse geocoding error:', error)
          }

          onLocationSelect(location)
          setQuery(location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`)
          setIsLoading(false)
        },
        (error) => {
          console.error('Geolocation error:', error)
          setIsLoading(false)
        },
        { timeout: 10000 }
      )
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isLoading ? (
            <Loader className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          )}
        </div>

        <input
          id="location-search"
          name="location"
          type="text"
          className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          autoComplete="address-level2"
        />

        <button
          onClick={handleGetCurrentLocation}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-600 transition-colors btn-touch"
          title="Use current location"
        >
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-3 sm:px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors btn-touch"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || 'Unknown City'}
                    {suggestion.address?.state && `, ${suggestion.address.state}`}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {suggestion.display_name}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}
