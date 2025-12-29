import { NextRequest, NextResponse } from 'next/server'
import type { RiskAssessment, Location, DisasterType } from '@/types'
import { analyzeRiskWithAI } from '@/lib/openai'

// POST /api/risk - Assess risk for a location
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { latitude, longitude } = body

    // Validate required parameters
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { error: 'Invalid latitude or longitude parameters' },
        { status: 400 }
      )
    }

    // Validate coordinate ranges
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: 'Coordinates out of valid range' },
        { status: 400 }
      )
    }

    const location: Location = { latitude, longitude }

    // Try to get AI-enhanced risk analysis
    let aiAnalysis = null
    try {
      // Generate mock historical data for AI analysis
      const historicalData = [
        'Historical flooding in the region',
        'Moderate earthquake activity',
        'Wildfire risk in summer months',
        'Urban area with infrastructure'
      ]

      aiAnalysis = await analyzeRiskWithAI(`${latitude}, ${longitude}`, historicalData)
    } catch (error) {
      console.warn('AI risk analysis failed, using statistical assessment:', error)
    }

    // Generate risk assessment based on location and AI analysis
    const riskAssessment = generateRiskAssessment(location, aiAnalysis)

    return NextResponse.json(riskAssessment)

  } catch (error) {
    console.error('Risk assessment API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to generate risk assessment
function generateRiskAssessment(location: Location, aiAnalysis?: string | null): RiskAssessment {
  // Base risk factors influenced by location
  const latitude = location.latitude
  const longitude = location.longitude

  // Simple location-based risk calculation (in a real app, this would use GIS data, historical records, etc.)
  const floodRisk = Math.abs(latitude) < 30 ? 0.8 : Math.abs(latitude) > 60 ? 0.2 : 0.5
  const earthquakeRisk = Math.abs(latitude) > 30 ? 0.7 : 0.3
  const hurricaneRisk = Math.abs(latitude) < 30 && Math.abs(longitude) < 100 ? 0.6 : 0.2
  const wildfireRisk = Math.abs(latitude) > 30 ? 0.5 : 0.2

  // Calculate overall risk
  const overallRisk = (floodRisk * 0.3 + earthquakeRisk * 0.3 + hurricaneRisk * 0.2 + wildfireRisk * 0.2) * 100

  const risks = [
    {
      type: DisasterType.FLOOD,
      probability: floodRisk * 100,
      impact: floodRisk * 100,
      riskScore: floodRisk * 100,
      factors: [
        'Proximity to water bodies',
        'Historical flooding patterns',
        'Elevation and topography',
        'Urban drainage systems'
      ],
      mitigationStrategies: [
        'Elevate critical infrastructure',
        'Install flood barriers',
        'Improve drainage systems',
        'Purchase flood insurance'
      ],
    },
    {
      type: DisasterType.EARTHQUAKE,
      probability: earthquakeRisk * 100,
      impact: earthquakeRisk * 100,
      riskScore: earthquakeRisk * 100,
      factors: [
        'Seismic activity in the region',
        'Building codes and construction standards',
        'Soil composition',
        'Population density'
      ],
      mitigationStrategies: [
        'Retrofitting older buildings',
        'Emergency preparedness training',
        'Securing heavy furniture',
        'Having emergency supplies'
      ],
    },
    {
      type: DisasterType.HURRICANE,
      probability: hurricaneRisk * 100,
      impact: hurricaneRisk * 100,
      riskScore: hurricaneRisk * 100,
      factors: [
        'Coastal proximity',
        'Historical storm patterns',
        'Wind exposure',
        'Storm surge potential'
      ],
      mitigationStrategies: [
        'Reinforcing roof and windows',
        'Creating emergency evacuation plans',
        'Securing outdoor property',
        'Stocking hurricane supplies'
      ],
    },
    {
      type: DisasterType.WILDFIRE,
      probability: wildfireRisk * 100,
      impact: wildfireRisk * 100,
      riskScore: wildfireRisk * 100,
      factors: [
        'Vegetation type and density',
        'Weather patterns',
        'Human activity',
        'Topography'
      ],
      mitigationStrategies: [
        'Creating defensible space',
        'Using fire-resistant materials',
        'Developing evacuation routes',
        'Maintaining emergency water supply'
      ],
    },
  ]

  // Generate recommendations based on AI analysis or defaults
  let recommendations: string[] = []
  if (aiAnalysis) {
    // Parse AI recommendations (simplified)
    const aiLines = aiAnalysis.split('\n').filter(line =>
      line.includes('recommend') || line.includes('prepare') || line.includes('plan')
    )
    recommendations = aiLines.slice(0, 4).map(line => line.replace(/^[-•]\s*/, ''))
  }

  if (recommendations.length === 0) {
    recommendations = [
      'Create an emergency kit with 72 hours of supplies',
      'Develop a family communication plan',
      'Learn about local evacuation routes',
      'Consider appropriate insurance coverage',
      'Stay informed about local weather and alerts'
    ]
  }

  return {
    location,
    overallRisk,
    risks,
    recommendations,
    lastUpdated: new Date().toISOString(),
  }
}
