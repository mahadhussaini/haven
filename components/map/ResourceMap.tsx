'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Navigation, Phone, Clock, Users } from 'lucide-react'
import type { EmergencyResource, ResourceType, Location } from '@/types'

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface ResourceMapProps {
  resources: EmergencyResource[]
  userLocation?: Location
  selectedResource?: EmergencyResource
  onResourceSelect: (resource: EmergencyResource) => void
}

export function ResourceMap({ resources, userLocation, selectedResource, onResourceSelect }: ResourceMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [L, setL] = useState<typeof import('leaflet') | null>(null)

  useEffect(() => {
    setIsClient(true)
    // Dynamically import Leaflet
    import('leaflet').then((leaflet) => {
      setL(leaflet.default)

      // Fix for default markers in Next.js
      delete (leaflet.default.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      })
    })
  }, [])

  const getResourceIcon = (type: ResourceType) => {
    if (!L) return undefined

    const iconHtml = getResourceIconHtml(type)
    return L.divIcon({
      html: iconHtml,
      className: 'custom-resource-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })
  }

  const getResourceIconHtml = (type: ResourceType) => {
    const icons: Record<ResourceType, string> = {
      shelter: '🏠',
      hospital: '🏥',
      fire_station: '🚒',
      police_station: '🚔',
      evacuation_center: '🏫',
      supply_depot: '📦',
      communication_hub: '📡'
    }

    const isSelected = selectedResource?.id === resources.find(r => r.type === type)?.id
    const baseClasses = 'text-2xl flex items-center justify-center w-8 h-8 rounded-full border-2'

    if (isSelected) {
      return `<div class="${baseClasses} bg-blue-500 border-blue-600 text-white">${icons[type]}</div>`
    }

    const colorClasses: Record<ResourceType, string> = {
      shelter: 'bg-green-100 border-green-300 text-green-600',
      hospital: 'bg-red-100 border-red-300 text-red-600',
      fire_station: 'bg-orange-100 border-orange-300 text-orange-600',
      police_station: 'bg-blue-100 border-blue-300 text-blue-600',
      evacuation_center: 'bg-purple-100 border-purple-300 text-purple-600',
      supply_depot: 'bg-yellow-100 border-yellow-300 text-yellow-600',
      communication_hub: 'bg-indigo-100 border-indigo-300 text-indigo-600'
    }

    return `<div class="${baseClasses} ${colorClasses[type]}">${icons[type]}</div>`
  }

  const getCenter = () => {
    if (userLocation) {
      return [userLocation.latitude, userLocation.longitude] as [number, number]
    }
    if (resources.length > 0) {
      return [resources[0].location.latitude, resources[0].location.longitude] as [number, number]
    }
    return [40.7128, -74.0060] as [number, number] // Default to NYC
  }

  const getDirectionsUrl = (resource: EmergencyResource) => {
    if (!userLocation) return '#'
    const origin = `${userLocation.latitude},${userLocation.longitude}`
    const destination = `${resource.location.latitude},${resource.location.longitude}`
    return `https://www.google.com/maps/dir/${origin}/${destination}`
  }

  if (!isClient || !L) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={getCenter()}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker */}
        {userLocation && (
          <Marker
            position={[userLocation.latitude, userLocation.longitude]}
            icon={L.divIcon({
              html: '<div class="text-2xl">📍</div>',
              className: 'custom-user-icon',
              iconSize: [24, 24],
              iconAnchor: [12, 24],
            })}
          >
            <Popup>
              <div className="text-center">
                <div className="font-semibold text-gray-900">Your Location</div>
                <div className="text-sm text-gray-600">
                  {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Resource Markers */}
        {resources.map((resource) => (
          <Marker
            key={resource.id}
            position={[resource.location.latitude, resource.location.longitude]}
            icon={getResourceIcon(resource.type)}
            eventHandlers={{
              click: () => onResourceSelect(resource),
            }}
          >
            <Popup>
              <ResourcePopup resource={resource} getDirectionsUrl={getDirectionsUrl} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

function ResourcePopup({ resource, getDirectionsUrl }: { resource: EmergencyResource; getDirectionsUrl: (resource: EmergencyResource) => string }) {
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

  return (
    <div className="min-w-64">
      <div className="font-semibold text-gray-900 mb-2">{resource.name}</div>
      <div className="text-sm text-gray-600 mb-2">{getResourceTypeLabel(resource.type)}</div>

      {resource.location.address && (
        <div className="flex items-start space-x-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{resource.location.address}</span>
        </div>
      )}

      {resource.contact.phone && (
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          <Phone className="h-4 w-4 flex-shrink-0" />
          <a
            href={`tel:${resource.contact.phone}`}
            className="text-primary-600 hover:text-primary-700"
          >
            {resource.contact.phone}
          </a>
        </div>
      )}

      {resource.operatingHours && (
        <div className="flex items-start space-x-2 text-sm text-gray-600 mb-2">
          <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <span>{resource.operatingHours.monday}</span>
        </div>
      )}

      {resource.availability && (
        <div className="flex items-center space-x-2 text-sm mb-2">
          <Users className="h-4 w-4 flex-shrink-0" />
          <span className={`font-medium ${resource.availability.isOpen ? 'text-green-600' : 'text-red-600'}`}>
            {resource.availability.isOpen ? 'Open' : 'Closed'}
          </span>
          {resource.capacity && (
            <span className="text-gray-600">
              ({resource.availability.currentOccupancy}/{resource.capacity})
            </span>
          )}
        </div>
      )}

      <div className="flex space-x-2 mt-3">
        <a
          href={getDirectionsUrl(resource)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-sm bg-primary-600 text-white px-3 py-1 rounded hover:bg-primary-700 transition-colors"
        >
          <Navigation className="h-3 w-3" />
          <span>Directions</span>
        </a>
      </div>
    </div>
  )
}
