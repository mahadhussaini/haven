'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { Search, MapPin, Phone, Clock, Users, Navigation } from 'lucide-react'
import { ResourceMap } from '@/components/map/ResourceMap'
import { useAppStore } from '@/store/useAppStore'
import { resourceApi } from '@/lib/api'
import { ResourceType } from '@/types'
import type { EmergencyResource } from '@/types'

const resourceTypes: Array<{
  value: ResourceType
  label: string
  icon: string
  color: string
}> = [
  { value: ResourceType.SHELTER, label: 'Emergency Shelters', icon: '🏠', color: 'text-green-600' },
  { value: ResourceType.HOSPITAL, label: 'Hospitals', icon: '🏥', color: 'text-red-600' },
  { value: ResourceType.FIRE_STATION, label: 'Fire Stations', icon: '🚒', color: 'text-orange-600' },
  { value: ResourceType.POLICE_STATION, label: 'Police Stations', icon: '🚔', color: 'text-blue-600' },
  { value: ResourceType.EVACUATION_CENTER, label: 'Evacuation Centers', icon: '🏫', color: 'text-purple-600' },
  { value: ResourceType.SUPPLY_DEPOT, label: 'Supply Depots', icon: '📦', color: 'text-yellow-600' },
  { value: ResourceType.COMMUNICATION_HUB, label: 'Communication Hubs', icon: '📡', color: 'text-indigo-600' }
]

export default function ResourcesPage() {
  const { userLocation } = useAppStore()
  const [selectedResource, setSelectedResource] = useState<EmergencyResource | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([])
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'distance' | 'name' | 'type'>('distance')
  const [radius, setRadius] = useState(10) // km

  const { data: resources, isLoading } = useQuery(
    ['emergencyResources', userLocation, radius],
    () => userLocation ? resourceApi.findNearbyResources(userLocation, radius) : [],
    {
      enabled: !!userLocation,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
    }
  )

  // Filter resources based on search and filters
  const filteredResources = resources?.filter(resource => {
    const matchesSearch = searchQuery === '' ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.location.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type)
    const matchesOpen = !showOpenOnly || (resource.availability && resource.availability.isOpen)

    return matchesSearch && matchesType && matchesOpen
  }) || []

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        if (!userLocation) return 0
        const distA = Math.sqrt(
          Math.pow(a.location.latitude - userLocation.latitude, 2) +
          Math.pow(a.location.longitude - userLocation.longitude, 2)
        )
        const distB = Math.sqrt(
          Math.pow(b.location.latitude - userLocation.latitude, 2) +
          Math.pow(b.location.longitude - userLocation.longitude, 2)
        )
        return distA - distB
      case 'name':
        return a.name.localeCompare(b.name)
      case 'type':
        return a.type.localeCompare(b.type)
      default:
        return 0
    }
  })

  const toggleResourceType = (type: ResourceType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  const getDirectionsUrl = (resource: EmergencyResource) => {
    if (!userLocation) return '#'
    const origin = `${userLocation.latitude},${userLocation.longitude}`
    const destination = `${resource.location.latitude},${resource.location.longitude}`
    return `https://www.google.com/maps/dir/${origin}/${destination}`
  }

  if (!userLocation) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Location Required</h2>
          <p className="text-gray-600 mb-6">
            Set your location in the dashboard to find nearby emergency resources.
          </p>
          <a href="/" className="btn-primary">Go to Dashboard</a>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <MapPin className="h-8 w-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Resources</h1>
          <p className="text-gray-600">Find nearby shelters, hospitals, and emergency services</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="resource-search"
              name="searchQuery"
              type="text"
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Radius */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Radius:</label>
            <select
              id="resource-radius"
              name="radius"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="resource-sort"
              name="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="distance">Distance</option>
              <option value="name">Name</option>
              <option value="type">Type</option>
            </select>
          </div>

          {/* Open Only Toggle */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              id="open-only"
              name="showOpenOnly"
              type="checkbox"
              checked={showOpenOnly}
              onChange={(e) => setShowOpenOnly(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Open only</span>
          </label>
        </div>

        {/* Resource Type Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {resourceTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => toggleResourceType(type.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTypes.includes(type.value)
                  ? 'bg-primary-100 text-primary-800 border border-primary-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map and Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resource List */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : sortedResources.length > 0 ? (
            <div className="space-y-4">
              {sortedResources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isSelected={selectedResource?.id === resource.id}
                  onSelect={() => setSelectedResource(resource)}
                  getDirectionsUrl={getDirectionsUrl}
                />
              ))}
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Resources Found</h3>
                <p className="text-gray-600 mb-4">
                  No emergency resources match your current search criteria.
                  Try adjusting your filters or increasing the search radius.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedTypes([])
                    setShowOpenOnly(false)
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="lg:col-span-1">
          <div className="card sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resource Map ({sortedResources.length} found)
            </h3>
            <ResourceMap
              resources={sortedResources}
              userLocation={userLocation}
              selectedResource={selectedResource}
              onResourceSelect={(resource) => setSelectedResource(resource)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ResourceCard({
  resource,
  isSelected,
  onSelect,
  getDirectionsUrl
}: {
  resource: EmergencyResource
  isSelected: boolean
  onSelect: () => void
  getDirectionsUrl: (resource: EmergencyResource) => string
}) {
  const getResourceTypeLabel = (type: ResourceType) => {
    const labels: Record<ResourceType, string> = {
      shelter: 'Emergency Shelter',
      hospital: 'Hospital',
      fire_station: 'Fire Station',
      police_station: 'Police Station',
      evacuation_center: 'Evacuation Center',
      supply_depot: 'Supply Depot',
      communication_hub: 'Communication Hub'
    }
    return labels[type]
  }

  const getResourceIcon = (type: ResourceType) => {
    const icons: Record<ResourceType, string> = {
      shelter: '🏠',
      hospital: '🏥',
      fire_station: '🚒',
      police_station: '🚔',
      evacuation_center: '🏫',
      supply_depot: '📦',
      communication_hub: '📡'
    }
    return icons[type]
  }

  return (
    <div
      className={`card cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-4">
        <div className="text-3xl">{getResourceIcon(resource.type)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {resource.name}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              resource.availability?.isOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {resource.availability?.isOpen ? 'Open' : 'Closed'}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-2">{getResourceTypeLabel(resource.type)}</p>

          {resource.location.address && (
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{resource.location.address}</span>
            </div>
          )}

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
            {resource.contact.phone && (
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <a
                  href={`tel:${resource.contact.phone}`}
                  className="text-primary-600 hover:text-primary-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  {resource.contact.phone}
                </a>
              </div>
            )}

            {resource.operatingHours && (
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{resource.operatingHours.monday}</span>
              </div>
            )}
          </div>

          {resource.availability && resource.capacity && (
            <div className="flex items-center space-x-2 text-sm mb-3">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">
                {resource.availability.currentOccupancy} / {resource.capacity} capacity
              </span>
            </div>
          )}

          <div className="flex space-x-2">
            <a
              href={getDirectionsUrl(resource)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Navigation className="h-4 w-4" />
              <span>Directions</span>
            </a>

            {resource.contact.phone && (
              <a
                href={`tel:${resource.contact.phone}`}
                className="flex items-center space-x-1 text-sm bg-gray-100 text-gray-700 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="h-4 w-4" />
                <span>Call</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
