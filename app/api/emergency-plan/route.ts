import { NextRequest, NextResponse } from 'next/server'
import type { EmergencyPlan, Location } from '@/types'
import { DisasterType } from '@/types'
import { generateEmergencyPlanWithAI } from '@/lib/openai'

// POST /api/emergency-plan - Generate AI-powered emergency plan
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { disasterType, latitude, longitude } = body

    // Validate required parameters
    if (!disasterType || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json(
        { error: 'Missing required parameters: disasterType, latitude, longitude' },
        { status: 400 }
      )
    }

    // Validate disaster type
    const validTypes = Object.values(DisasterType)
    if (!validTypes.includes(disasterType)) {
      return NextResponse.json(
        { error: `Invalid disaster type. Must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: 'Coordinates out of valid range' },
        { status: 400 }
      )
    }

    const location: Location = { latitude, longitude }

    // Generate AI-powered emergency plan
    const aiPlanText = await generateEmergencyPlanWithAI(disasterType, `${latitude}, ${longitude}`)

    if (!aiPlanText) {
      // Fallback to template if AI fails
      console.warn('AI emergency plan generation failed, using template')
      const templatePlan = createEmergencyPlanTemplate(disasterType, location)
      return NextResponse.json(templatePlan)
    }

    // Parse AI response into structured EmergencyPlan
    const emergencyPlan = parseAIPlanResponse(aiPlanText, disasterType, location)

    return NextResponse.json(emergencyPlan)

  } catch (error) {
    console.error('Emergency plan API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to parse AI response into EmergencyPlan format
function parseAIPlanResponse(aiResponse: string, disasterType: DisasterType, location: Location): EmergencyPlan {
  const phases: EmergencyPlan['phases'] = []
  let phaseIndex = 1

  // Split response by phases (basic parsing)
  const phaseSections = aiResponse.split(/(?=Phase|Preparation|Response|Recovery)/i)

  phaseSections.forEach((section, index) => {
    if (section.trim().length < 20) return // Skip empty sections

    const phase = index === 0 ? 'before' : index === 1 ? 'during' : 'after'
    const title = section.includes('Preparation') ? 'Preparation Phase' :
                  section.includes('Response') ? 'Response Phase' : 'Recovery Phase'

    // Extract actions from the section (simplified)
    const actions: EmergencyPlan['phases'][0]['actions'] = []
    const lines = section.split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))

    lines.forEach((line, actionIndex) => {
      const description = line.replace(/^[-•]\s*/, '').trim()
      if (description && description.length > 10) { // Filter out very short descriptions
        actions.push({
          id: `${phaseIndex}-${actionIndex + 1}`,
          description,
          isCompleted: false,
          priority: phase === 'during' ? 'critical' : 'high',
          category: phase === 'before' ? 'supplies' : phase === 'during' ? 'safety' : 'communication',
          estimatedTime: phase === 'during' ? 'Immediate' : '30 minutes',
          requiredResources: [],
        })
      }
    })

    if (actions.length > 0) {
      phases.push({
        phase,
        title,
        actions,
        timeline: phase === 'before' ? '1-2 weeks before potential event' :
                 phase === 'during' ? 'During the event' : 'After the event',
        priority: phaseIndex,
      })
      phaseIndex++
    }
  })

  // Ensure we have at least basic phases if parsing failed
  if (phases.length === 0) {
    return createEmergencyPlanTemplate(disasterType, location)
  }

  return {
    id: `plan-${Date.now()}`,
    disasterType,
    phases,
    location,
    lastUpdated: new Date().toISOString(),
  }
}

// Fallback template for emergency plans
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
