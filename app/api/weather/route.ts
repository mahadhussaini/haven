import { NextRequest, NextResponse } from 'next/server'
import type { WeatherData, WeatherForecast } from '@/types'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

if (!OPENWEATHER_API_KEY) {
  throw new Error('OPENWEATHER_API_KEY environment variable is not configured')
}

// Helper function to validate coordinates
function validateCoordinates(lat: number, lon: number): boolean {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180
}

// GET /api/weather?lat={lat}&lon={lon}&type={current|forecast}
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = parseFloat(searchParams.get('lat') || '')
    const lon = parseFloat(searchParams.get('lon') || '')
    const type = searchParams.get('type') || 'current'

    // Validate required parameters
    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { error: 'Invalid latitude or longitude parameters' },
        { status: 400 }
      )
    }

    // Validate coordinate ranges
    if (!validateCoordinates(lat, lon)) {
      return NextResponse.json(
        { error: 'Coordinates out of valid range' },
        { status: 400 }
      )
    }

    // Validate type parameter
    if (!['current', 'forecast'].includes(type)) {
      return NextResponse.json(
        { error: 'Type must be either "current" or "forecast"' },
        { status: 400 }
      )
    }

    const baseUrl = 'https://api.openweathermap.org/data/2.5'
    const apiKey = OPENWEATHER_API_KEY

    if (type === 'current') {
      // Get current weather
      const url = `${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

      const response = await fetch(url, {
        next: { revalidate: 300 }, // Cache for 5 minutes
      })

      if (!response.ok) {
        console.error('OpenWeatherMap API error:', response.status, response.statusText)
        return NextResponse.json(
          { error: 'Failed to fetch weather data' },
          { status: 500 }
        )
      }

      const data = await response.json()

      const weatherData: WeatherData = {
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

      return NextResponse.json(weatherData)

    } else {
      // Get weather forecast
      const url = `${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

      const response = await fetch(url, {
        next: { revalidate: 1800 }, // Cache for 30 minutes
      })

      if (!response.ok) {
        console.error('OpenWeatherMap API error:', response.status, response.statusText)
        return NextResponse.json(
          { error: 'Failed to fetch forecast data' },
          { status: 500 }
        )
      }

      const data = await response.json()

      const forecastData: WeatherForecast[] = data.list.slice(0, 5).map((item: {
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

      return NextResponse.json(forecastData)
    }

  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
