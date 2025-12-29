import OpenAI from 'openai'

// Custom error class for OpenAI API errors
export class OpenAIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'OpenAIError'
  }
}

// Singleton instance of OpenAI client
let openaiClient: OpenAI | null = null

/**
 * Get or create OpenAI client instance
 * Validates API key and handles configuration
 */
export function getOpenAIClient(): OpenAI {
  // Return existing instance if already created
  if (openaiClient) {
    return openaiClient
  }

  const apiKey = process.env.OPENAI_API_KEY

  // Validate API key presence
  if (!apiKey) {
    throw new OpenAIError(
      'OpenAI API key is missing. Please set the OPENAI_API_KEY environment variable in your .env.local file.',
      500
    )
  }

  // Validate API key format (basic check)
  if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
    throw new OpenAIError(
      'Invalid OpenAI API key format. Please ensure you have a valid API key from https://platform.openai.com/api-keys',
      400
    )
  }

  try {
    // Create and configure OpenAI client
    openaiClient = new OpenAI({
      apiKey: apiKey,
      // Add timeout and other configurations as needed
      timeout: 30000, // 30 seconds
      maxRetries: 3,
    })

    return openaiClient
  } catch (error) {
    throw new OpenAIError(
      `Failed to initialize OpenAI client: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    )
  }
}

/**
 * Check if OpenAI API key is configured and valid
 */
export function validateOpenAIConfig(): { isValid: boolean; error?: string } {
  try {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return {
        isValid: false,
        error: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.'
      }
    }

    if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
      return {
        isValid: false,
        error: 'OpenAI API key appears to be invalid. Please check your API key format.'
      }
    }

    return { isValid: true }
  } catch (error) {
    return {
      isValid: false,
      error: `Configuration validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

/**
 * Safe wrapper for OpenAI API calls with error handling
 */
export async function safeOpenAICall<T>(
  operation: () => Promise<T>,
  fallbackMessage: string = 'AI service temporarily unavailable'
): Promise<T | null> {
  try {
    getOpenAIClient() // Ensure client is initialized
    return await operation()
  } catch (error) {
    console.error('OpenAI API call failed:', error)

    // Log specific error types for debugging
    if (error instanceof OpenAIError) {
      console.error(`OpenAI Error (${error.statusCode}):`, error.message)
    }

    // In development, throw the error for debugging
    if (process.env.NODE_ENV === 'development') {
      throw error
    }

    // In production, return null with fallback message
    console.warn(fallbackMessage)
    return null
  }
}

/**
 * Generate emergency plan using OpenAI
 */
export async function generateEmergencyPlanWithAI(
  disasterType: string,
  location: string
): Promise<string | null> {
  return safeOpenAICall(async () => {
    const client = getOpenAIClient()

    const prompt = `Create a detailed emergency response plan for a ${disasterType} disaster in ${location}.
    Include the following phases:
    1. Preparation Phase (before the disaster)
    2. Response Phase (during the disaster)
    3. Recovery Phase (after the disaster)

    For each phase, provide specific, actionable steps that residents should take.
    Format the response as a clear, organized plan with bullet points and priorities.`

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: 'You are an emergency preparedness expert providing clear, actionable advice for disaster response.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || null
  }, 'Unable to generate emergency plan with AI. Using default template.')
}

/**
 * Generate resilience recommendations using OpenAI
 */
export async function generateResilienceRecommendationsWithAI(
  location: string,
  riskFactors: string[]
): Promise<string | null> {
  return safeOpenAICall(async () => {
    const client = getOpenAIClient()

    const prompt = `Based on the location ${location} and risk factors: ${riskFactors.join(', ')},
    provide 3-5 specific, actionable climate resilience recommendations.
    Each recommendation should include:
    - Title
    - Description of the benefit
    - Difficulty level (easy, moderate, difficult)
    - Estimated cost range
    - Implementation timeframe

    Focus on practical, community-level solutions.`

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: 'You are a climate resilience expert providing practical recommendations for community adaptation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7,
    })

    return response.choices[0]?.message?.content || null
  }, 'Unable to generate resilience recommendations with AI. Using default suggestions.')
}

/**
 * Analyze risk assessment using OpenAI
 */
export async function analyzeRiskWithAI(
  location: string,
  historicalData: string[]
): Promise<string | null> {
  return safeOpenAICall(async () => {
    const client = getOpenAIClient()

    const prompt = `Analyze the disaster risk for ${location} based on this historical data: ${historicalData.join(', ')}.
    Provide a risk assessment that includes:
    1. Overall risk level (Low, Moderate, High, Extreme)
    2. Key risk factors
    3. Recommended preparedness actions
    4. Long-term resilience strategies

    Be specific and actionable in your recommendations.`

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: [
        {
          role: 'system',
          content: 'You are a disaster risk analyst providing evidence-based risk assessments.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 600,
      temperature: 0.6,
    })

    return response.choices[0]?.message?.content || null
  }, 'Unable to perform AI risk analysis. Using statistical assessment.')
}
