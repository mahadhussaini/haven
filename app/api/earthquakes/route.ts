import { NextRequest, NextResponse } from 'next/server'
import type { DisasterAlert } from '@/types'

// Helper functions for earthquake processing
function mapEarthquakeSeverity(magnitude: number): string {
  if (magnitude >= 7) return 'extreme'
  if (magnitude >= 6) return 'high'
  if (magnitude >= 4) return 'moderate'
  return 'low'
}

function getEarthquakeInstructions(magnitude: number): string[] {
  if (magnitude >= 6) {
    return [
      'Drop, cover, and hold on immediately',
      'Stay away from windows and heavy objects',
      'If outdoors, move to open area away from buildings',
      'After shaking stops, check for injuries and hazards',
      'Be prepared for aftershocks',
    ]
  }
  return [
    'Drop, cover, and hold on if you feel strong shaking',
    'Check for damage after shaking stops',
    'Be aware of potential aftershocks',
  ]
}

// GET /api/earthquakes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const feed = searchParams.get('feed') || 'significant_day' // Options: significant_day, all_day, etc.

    // Validate feed parameter
    const validFeeds = ['significant_day', 'all_day', 'significant_week', 'all_week', 'significant_month']
    if (!validFeeds.includes(feed)) {
      return NextResponse.json(
        { error: 'Invalid feed parameter. Must be one of: significant_day, all_day, significant_week, all_week, significant_month' },
        { status: 400 }
      )
    }

    const usgsUrl = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feed}.geojson`

    const response = await fetch(usgsUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      console.error('USGS Earthquake API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch earthquake data' },
        { status: 500 }
      )
    }

    const data = await response.json()

    const earthquakes: DisasterAlert[] = data.features.map((quake: {
      id: string
      properties: { mag: number; title: string; time: number }
      geometry: { coordinates: [number, number, number] }
    }) => ({
      id: quake.id,
      type: 'earthquake' as const,
      severity: mapEarthquakeSeverity(quake.properties.mag),
      title: quake.properties.title,
      description: `Magnitude ${quake.properties.mag} earthquake`,
      location: {
        latitude: quake.geometry.coordinates[1],
        longitude: quake.geometry.coordinates[0],
      },
      affectedArea: {
        north: quake.geometry.coordinates[1] + 1,
        south: quake.geometry.coordinates[1] - 1,
        east: quake.geometry.coordinates[0] + 1,
        west: quake.geometry.coordinates[0] - 1,
      },
      startTime: new Date(quake.properties.time).toISOString(),
      instructions: getEarthquakeInstructions(quake.properties.mag),
      source: 'USGS',
      isActive: true,
      urgency: 'immediate' as const,
    }))

    return NextResponse.json({
      earthquakes,
      metadata: {
        count: earthquakes.length,
        feed,
        lastUpdated: new Date().toISOString(),
        source: 'USGS Earthquake Hazards Program'
      }
    })

  } catch (error) {
    console.error('Earthquake API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
