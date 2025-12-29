import { NextRequest, NextResponse } from 'next/server'
import type { EmergencyResource, Location } from '@/types'
import { ResourceType } from '@/types'

// GET /api/resources?lat={lat}&lon={lon}&radius={radius}&type={type}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '')
    const lon = parseFloat(searchParams.get('lon') || '')
    const radius = parseFloat(searchParams.get('radius') || '10') // Default 10km radius
    const type = searchParams.get('type') as ResourceType | null

    // Validate required parameters
    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { error: 'Invalid latitude or longitude parameters' },
        { status: 400 }
      )
    }

    // Validate coordinate ranges
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      return NextResponse.json(
        { error: 'Coordinates out of valid range' },
        { status: 400 }
      )
    }

    // Validate radius
    if (isNaN(radius) || radius <= 0 || radius > 100) {
      return NextResponse.json(
        { error: 'Radius must be between 0 and 100 km' },
        { status: 400 }
      )
    }

    // Validate resource type if provided
    if (type && !Object.values(ResourceType).includes(type)) {
      return NextResponse.json(
        { error: `Invalid resource type. Must be one of: ${Object.values(ResourceType).join(', ')}` },
        { status: 400 }
      )
    }

    const location: Location = { latitude: lat, longitude: lon }

    // In a real implementation, this would integrate with:
    // - Google Places API
    // - Local government databases
    // - Emergency services APIs
    // - Crowdsourced data
    // For now, return mock data with realistic variations based on location

    const resources = generateNearbyResources(location, radius, type)

    return NextResponse.json({
      resources,
      metadata: {
        location,
        radius,
        type: type || 'all',
        count: resources.length,
        searchTimestamp: new Date().toISOString(),
        note: 'This is mock data. In production, integrate with real emergency services APIs.'
      }
    })

  } catch (error) {
    console.error('Resources API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to generate mock nearby resources
function generateNearbyResources(
  location: Location,
  radius: number,
  filterType?: ResourceType | null
): EmergencyResource[] {
  const allResourceTypes = Object.values(ResourceType)

  // Generate 3-8 resources within the radius
  const numResources = Math.floor(Math.random() * 6) + 3
  const resources: EmergencyResource[] = []

  for (let i = 0; i < numResources; i++) {
    // Random type if not filtered
    const resourceType = filterType || allResourceTypes[Math.floor(Math.random() * allResourceTypes.length)]

    // Generate random location within radius (simplified calculation)
    const angle = Math.random() * 2 * Math.PI
    const distance = Math.random() * radius * 0.8 // Keep within 80% of radius
    const latOffset = (distance / 111.32) * Math.cos(angle) // ~111.32 km per degree latitude
    const lonOffset = (distance / (111.32 * Math.cos(location.latitude * Math.PI / 180))) * Math.sin(angle)

    const resourceLocation: Location = {
      latitude: location.latitude + latOffset,
      longitude: location.longitude + lonOffset,
      address: generateAddress()
    }

    const resource = createMockResource(i + 1, resourceType, resourceLocation)
    resources.push(resource)
  }

  // Sort by distance
  return resources.sort((a, b) => {
    const distA = calculateDistance(location, a.location)
    const distB = calculateDistance(location, b.location)
    return distA - distB
  })
}

// Helper function to create mock resource
function createMockResource(
  id: number,
  type: ResourceType,
  location: Location
): EmergencyResource {
  const names = {
    [ResourceType.SHELTER]: ['City Emergency Shelter', 'Community Safe House', 'Red Cross Shelter', 'Municipal Evacuation Center'],
    [ResourceType.HOSPITAL]: ['General Hospital', 'Medical Center', 'Regional Health Clinic', 'Emergency Care Facility'],
    [ResourceType.FIRE_STATION]: ['Fire Station #', 'Fire Department', 'Emergency Response Station'],
    [ResourceType.POLICE_STATION]: ['Police Precinct', 'Law Enforcement Center', 'Public Safety Station'],
    [ResourceType.EVACUATION_CENTER]: ['Evacuation Center', 'Emergency Assembly Point', 'Safe Haven Center'],
    [ResourceType.SUPPLY_DEPOT]: ['Emergency Supply Depot', 'Relief Distribution Center', 'Aid Station'],
    [ResourceType.COMMUNICATION_HUB]: ['Emergency Communication Center', 'Information Hub', 'Alert Coordination Center']
  }

  const services = {
    [ResourceType.SHELTER]: ['Emergency shelter', 'Food', 'Medical aid', 'Communications'],
    [ResourceType.HOSPITAL]: ['Emergency medical care', 'Trauma treatment', 'Surgery', 'Pharmacy'],
    [ResourceType.FIRE_STATION]: ['Fire suppression', 'Search and rescue', 'Hazard mitigation', 'First aid'],
    [ResourceType.POLICE_STATION]: ['Law enforcement', 'Emergency coordination', 'Public safety', 'Traffic control'],
    [ResourceType.EVACUATION_CENTER]: ['Temporary housing', 'Food services', 'Medical screening', 'Family reunification'],
    [ResourceType.SUPPLY_DEPOT]: ['Food distribution', 'Water supplies', 'Medical supplies', 'Emergency kits'],
    [ResourceType.COMMUNICATION_HUB]: ['Emergency alerts', 'Information dissemination', 'Family communication', 'Resource coordination']
  }

  const nameOptions = names[type] || ['Emergency Facility']
  const name = nameOptions[Math.floor(Math.random() * nameOptions.length)] + (type === ResourceType.FIRE_STATION ? (id % 10 + 1) : '')

  const capacity = type === ResourceType.SHELTER || type === ResourceType.EVACUATION_CENTER
    ? Math.floor(Math.random() * 200) + 50
    : undefined

  return {
    id: id.toString(),
    name,
    type,
    location,
    contact: {
      phone: generatePhoneNumber(),
      email: `${name.toLowerCase().replace(/\s+/g, '')}@emergency.gov`,
      emergencyNumber: '911',
    },
    capacity,
    availability: {
      isOpen: Math.random() > 0.1, // 90% chance of being open
      capacity: capacity || 100,
      currentOccupancy: capacity ? Math.floor(Math.random() * capacity * 0.8) : Math.floor(Math.random() * 80),
      lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Within last hour
    },
    services: services[type] || ['Emergency services'],
    operatingHours: {
      monday: '24/7',
      tuesday: '24/7',
      wednesday: '24/7',
      thursday: '24/7',
      friday: '24/7',
      saturday: '24/7',
      sunday: '24/7',
      isAlwaysOpen: true,
    },
    accessibility: {
      wheelchairAccessible: Math.random() > 0.2,
      hasRamp: Math.random() > 0.3,
      hasElevator: Math.random() > 0.4,
      signLanguageSupport: Math.random() > 0.6,
      brailleSupport: Math.random() > 0.7,
    },
  }
}

// Helper functions
function generateAddress(): string {
  const streets = ['Main St', 'Oak Ave', 'Pine Rd', 'Elm Blvd', 'Maple Dr', 'Cedar Ln', 'Birch Way']
  const cities = ['City Center', 'Downtown', 'Uptown', 'Midtown', 'Northside', 'Southside']
  const streetNum = Math.floor(Math.random() * 9999) + 1
  const street = streets[Math.floor(Math.random() * streets.length)]
  const city = cities[Math.floor(Math.random() * cities.length)]

  return `${streetNum} ${street}, ${city}, State`
}

function generatePhoneNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100
  const exchange = Math.floor(Math.random() * 900) + 100
  const number = Math.floor(Math.random() * 9000) + 1000
  return `+1-${areaCode}-${exchange}-${number}`
}

function calculateDistance(loc1: Location, loc2: Location): number {
  // Simplified distance calculation using Haversine formula approximation
  const latDiff = (loc2.latitude - loc1.latitude) * 111.32 // ~111.32 km per degree
  const lonDiff = (loc2.longitude - loc1.longitude) * 111.32 * Math.cos(loc1.latitude * Math.PI / 180)
  return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff)
}
