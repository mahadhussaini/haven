import { NextRequest, NextResponse } from 'next/server'
import type { ResilienceRecommendation } from '@/types'
import { ResilienceCategory } from '@/types'
import { generateResilienceRecommendationsWithAI } from '@/lib/openai'

// GET /api/resilience?lat={lat}&lon={lon} - Get AI-powered resilience recommendations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '')
    const lon = parseFloat(searchParams.get('lon') || '')

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

    // Generate AI-powered recommendations
    const riskFactors = [
      'flooding',
      'earthquake',
      'wildfire',
      'climate change impacts'
    ]

    const aiRecommendations = await generateResilienceRecommendationsWithAI(
      `${lat}, ${lon}`,
      riskFactors
    )

    if (!aiRecommendations) {
      // Fallback to default recommendations if AI fails
      console.warn('AI resilience recommendations failed, using defaults')
      const defaultRecommendations = getDefaultResilienceRecommendations()
      return NextResponse.json(defaultRecommendations)
    }

    // Parse AI response into structured ResilienceRecommendation format
    const recommendations = parseAIRecommendationsResponse(aiRecommendations)

    return NextResponse.json(recommendations)

  } catch (error) {
    console.error('Resilience API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to parse AI response into ResilienceRecommendation format
function parseAIRecommendationsResponse(aiResponse: string): ResilienceRecommendation[] {
  const recommendations: ResilienceRecommendation[] = []
  let id = 1

  // Split by numbered items or titles (basic parsing)
  const sections = aiResponse.split(/\d+\.\s+|Title:/i).filter(section => section.trim().length > 10)

  sections.forEach(section => {
    const lines = section.split('\n').map(line => line.trim()).filter(line => line.length > 0)

    if (lines.length >= 2) {
      const title = lines[0].replace(/^[-•]\s*/, '')
      const description = lines.find(line =>
        !line.includes('Difficulty:') &&
        !line.includes('Cost:') &&
        !line.includes('Timeframe:') &&
        !line.includes('Benefits:')
      ) || title

      recommendations.push({
        id: id.toString(),
        title,
        description,
        category: ResilienceCategory.ENERGY_EFFICIENCY, // Default category
        difficulty: 'moderate',
        impact: 'high',
        timeframe: '3-6 months',
        cost: { min: 1000, max: 5000, currency: 'USD' },
        steps: ['Research options', 'Get quotes', 'Schedule installation'],
        benefits: ['Improved resilience', 'Cost savings', 'Environmental benefits'],
        resources: [],
      })
      id++
    }
  })

  return recommendations.length > 0 ? recommendations : getDefaultResilienceRecommendations()
}

// Fallback default resilience recommendations
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
    {
      id: '2',
      title: 'Reinforce Roof and Windows',
      description: 'Strengthen building envelope against high winds and debris',
      category: ResilienceCategory.EMERGENCY_PREPAREDNESS,
      difficulty: 'moderate',
      impact: 'high',
      timeframe: '1-3 months',
      cost: { min: 5000, max: 15000, currency: 'USD' },
      steps: [
        'Inspect current roof condition',
        'Research impact-resistant options',
        'Get contractor quotes',
        'Schedule installation',
        'Maintain regularly'
      ],
      benefits: [
        'Protection from wind damage',
        'Reduced insurance premiums',
        'Increased property value',
        'Peace of mind during storms'
      ],
      resources: [
        {
          title: 'Wind Resistance Standards',
          url: '#',
          type: 'guide',
        },
      ],
    },
    {
      id: '3',
      title: 'Create Emergency Water Supply',
      description: 'Install rainwater harvesting or greywater systems for emergency water access',
      category: ResilienceCategory.WATER_CONSERVATION,
      difficulty: 'easy',
      impact: 'medium',
      timeframe: '1-2 months',
      cost: { min: 1000, max: 3000, currency: 'USD' },
      steps: [
        'Assess water needs',
        'Research local regulations',
        'Choose appropriate system',
        'Install with professional help',
        'Test and maintain system'
      ],
      benefits: [
        'Emergency water during outages',
        'Reduced utility bills',
        'Environmental conservation',
        'Drought preparedness'
      ],
      resources: [
        {
          title: 'Water Conservation Guide',
          url: '#',
          type: 'guide',
        },
      ],
    },
  ]
}
