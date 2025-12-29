import { DisasterType, ResilienceCategory } from '@/types'
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


// Weather API Functions
export const weatherApi = {
  getCurrentWeather: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&type=current`)

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    return response.json()
  },

  getForecast: async (lat: number, lon: number): Promise<WeatherForecast[]> => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&type=forecast`)

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data')
    }

    return response.json()
  },
}

// Earthquake API Functions
export const earthquakeApi = {
  getRecentEarthquakes: async (): Promise<DisasterAlert[]> => {
    try {
      const response = await fetch('/api/earthquakes')

      if (!response.ok) {
        console.error('Failed to fetch earthquake data')
        return []
      }

      const data = await response.json()
      return data.earthquakes || []
    } catch (error) {
      console.error('Error fetching earthquake data:', error)
      return []
    }
  },
}

// Risk Assessment API Functions
export const riskApi = {
  assessLocationRisk: async (location: Location): Promise<RiskAssessment> => {
    try {
      const response = await fetch('/api/risk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to assess location risk')
      }

      return response.json()
    } catch (error) {
      console.error('Error assessing location risk:', error)
      // Fallback to basic risk assessment
      return {
        location,
        overallRisk: 50,
        risks: [
          {
            type: DisasterType.FLOOD,
            probability: 30,
            impact: 60,
            riskScore: 45,
            factors: ['General location assessment'],
            mitigationStrategies: ['Stay informed', 'Prepare emergency kit'],
          },
        ],
        recommendations: [
          'Stay informed about local conditions',
          'Prepare emergency supplies',
          'Know evacuation routes',
        ],
        lastUpdated: new Date().toISOString(),
      }
    }
  },
}

// Resource Finder API Functions
export const resourceApi = {
  findNearbyResources: async (location: Location, radius: number = 10): Promise<EmergencyResource[]> => {
    try {
      const response = await fetch(
        `/api/resources?lat=${location.latitude}&lon=${location.longitude}&radius=${radius}`
      )

      if (!response.ok) {
        throw new Error('Failed to find nearby resources')
      }

      const data = await response.json()
      return data.resources || []
    } catch (error) {
      console.error('Error finding nearby resources:', error)
      // Return empty array as fallback
      return []
    }
  },
}

// AI Integration Functions
export const aiApi = {
  generateEmergencyPlan: async (disasterType: DisasterType, location: Location): Promise<EmergencyPlan> => {
    try {
      const response = await fetch('/api/emergency-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          disasterType,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate emergency plan')
      }

      return response.json()
    } catch (error) {
      console.error('Error generating emergency plan:', error)
      // Fallback: Return structured emergency plan template
      return createEmergencyPlanTemplate(disasterType, location)
    }
  },

  getResilienceRecommendations: async (location: Location): Promise<ResilienceRecommendation[]> => {
    try {
      const response = await fetch(
        `/api/resilience?lat=${location.latitude}&lon=${location.longitude}`
      )

      if (!response.ok) {
        throw new Error('Failed to get resilience recommendations')
      }

      return response.json()
    } catch (error) {
      console.error('Error getting resilience recommendations:', error)
      // Fallback: Return default resilience recommendations
      return getDefaultResilienceRecommendations()
    }
  },
}

// Fallback Functions

function createEmergencyPlanTemplate(disasterType: DisasterType, location: Location): EmergencyPlan {
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
}

function getDefaultResilienceRecommendations(): ResilienceRecommendation[] {
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
}

