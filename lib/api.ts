import axios from 'axios'
import { DisasterType, ResourceType, ResilienceCategory } from '@/types'
import type {
  WeatherData,
  WeatherForecast,
  DisasterAlert,
  RiskAssessment,
  EmergencyResource,
  EmergencyPlan,
  ResilienceRecommendation,
  Location
} from '@/types'

const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// API response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// Weather API Functions
export const weatherApi = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await api.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    )
    
    const data = response.data
    return {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      visibility: data.visibility / 1000, // Convert to km
      uvIndex: 0, // Need separate UV API call
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      timestamp: new Date().toISOString(),
    }
  },

  getForecast: async (lat: number, lon: number): Promise<WeatherForecast[]> => {
    const response = await api.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}&units=metric`
    )

    return response.data.list.slice(0, 5).map((item: {
      dt_txt: string
      main: { temp_max: number; temp_min: number }
      weather: Array<{ description: string; icon: string }>
      rain?: { '3h': number }
      wind: { speed: number }
    }) => ({
      date: item.dt_txt,
      high: item.main.temp_max,
      low: item.main.temp_min,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      precipitation: item.rain?.['3h'] || 0,
      windSpeed: item.wind.speed,
    }))
  },
}

// Earthquake API Functions
export const earthquakeApi = {
  getRecentEarthquakes: async (): Promise<DisasterAlert[]> => {
    try {
      const response = await api.get(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_day.geojson'
      )
      
      return response.data.features.map((quake: {
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
    } catch (error) {
      console.error('Error fetching earthquake data:', error)
      return []
    }
  },
}

// Risk Assessment API Functions
export const riskApi = {
  assessLocationRisk: async (location: Location): Promise<RiskAssessment> => {
    // This would integrate with AI services and multiple data sources
    // For now, return mock data based on location
    return {
      location,
      overallRisk: Math.random() * 100,
      risks: [
        {
          type: DisasterType.FLOOD,
          probability: Math.random() * 100,
          impact: Math.random() * 100,
          riskScore: Math.random() * 100,
          factors: ['Historical flooding', 'Proximity to water bodies', 'Elevation'],
          mitigationStrategies: ['Flood barriers', 'Elevated storage', 'Emergency evacuation plan'],
        },
        {
          type: DisasterType.EARTHQUAKE,
          probability: Math.random() * 100,
          impact: Math.random() * 100,
          riskScore: Math.random() * 100,
          factors: ['Seismic activity', 'Building codes', 'Soil composition'],
          mitigationStrategies: ['Structural reinforcement', 'Emergency supplies', 'Drop, cover, hold drills'],
        },
      ],
      recommendations: [
        'Create an emergency kit with 72 hours of supplies',
        'Develop a family communication plan',
        'Learn about local evacuation routes',
        'Consider flood insurance for your property',
      ],
      lastUpdated: new Date().toISOString(),
    }
  },
}

// Resource Finder API Functions
export const resourceApi = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findNearbyResources: async (location: Location, _radius: number = 10): Promise<EmergencyResource[]> => {
    // This would integrate with Google Places API and local emergency services
    // For now, return mock data
    return [
      {
        id: '1',
        name: 'City Emergency Shelter',
        type: ResourceType.SHELTER,
        location: {
          latitude: location.latitude + 0.01,
          longitude: location.longitude + 0.01,
          address: '123 Main St, City, State',
        },
        contact: {
          phone: '+1-555-0123',
          email: 'shelter@city.gov',
          emergencyNumber: '911',
        },
        capacity: 200,
        availability: {
          isOpen: true,
          capacity: 200,
          currentOccupancy: 45,
          lastUpdated: new Date().toISOString(),
        },
        services: ['Emergency shelter', 'Food', 'Medical aid', 'Communications'],
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
          wheelchairAccessible: true,
          hasRamp: true,
          hasElevator: true,
          signLanguageSupport: true,
          brailleSupport: false,
        },
      },
    ]
  },
}

// AI Integration Functions
export const aiApi = {
  generateEmergencyPlan: async (disasterType: DisasterType, location: Location): Promise<EmergencyPlan> => {
    // This would integrate with OpenAI or other AI services
    // For now, return structured emergency plan
    return {
      id: `plan-${Date.now()}`,
      disasterType,
      phases: [
        {
          phase: 'before',
          title: 'Preparation Phase',
          actions: [
            {
              id: '1',
              description: 'Prepare emergency kit with supplies for 72 hours',
              isCompleted: false,
              priority: 'high',
              category: 'supplies',
              estimatedTime: '2 hours',
              requiredResources: ['Food', 'Water', 'First aid kit', 'Flashlight', 'Radio'],
            },
          ],
          timeline: '1-2 weeks before potential event',
          priority: 1,
        },
        {
          phase: 'during',
          title: 'Response Phase',
          actions: [
            {
              id: '2',
              description: 'Follow evacuation orders immediately',
              isCompleted: false,
              priority: 'critical',
              category: 'safety',
              estimatedTime: 'Immediate',
              requiredResources: ['Transportation', 'Emergency kit'],
            },
          ],
          timeline: 'During the event',
          priority: 2,
        },
        {
          phase: 'after',
          title: 'Recovery Phase',
          actions: [
            {
              id: '3',
              description: 'Contact family and friends to confirm safety',
              isCompleted: false,
              priority: 'high',
              category: 'communication',
              estimatedTime: '30 minutes',
              requiredResources: ['Phone', 'Contact list'],
            },
          ],
          timeline: 'After the event',
          priority: 3,
        },
      ],
      location,
      lastUpdated: new Date().toISOString(),
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getResilienceRecommendations: async (_location: Location): Promise<ResilienceRecommendation[]> => {
    // AI-generated climate resilience recommendations
    return [
      {
        id: '1',
        title: 'Install Solar Panels',
        description: 'Reduce energy costs and carbon footprint while ensuring backup power during outages',
        category: ResilienceCategory.ENERGY_EFFICIENCY,
        difficulty: 'moderate',
        impact: 'high',
        timeframe: '3-6 months',
        cost: { min: 10000, max: 25000, currency: 'USD' },
        steps: [
          'Get energy audit',
          'Research local incentives',
          'Get quotes from installers',
          'Apply for permits',
          'Schedule installation',
        ],
        benefits: [
          'Reduced electricity bills',
          'Emergency backup power',
          'Increased home value',
          'Reduced carbon footprint',
        ],
        resources: [
          {
            title: 'Solar Installation Guide',
            url: '#',
            type: 'guide',
          },
        ],
      },
    ]
  },
}

// Helper functions
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
