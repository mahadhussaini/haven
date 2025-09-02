'use client'

import { useQuery } from 'react-query'
import { Thermometer, Wind, Eye, Gauge, Sun, CloudRain } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { weatherApi } from '@/lib/api'
import { celsiusToFahrenheit, getUVLevel } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

export function WeatherWidget() {
  const { userLocation, userPreferences } = useAppStore()

  const { data: weatherData, isLoading } = useQuery(
    ['currentWeather', userLocation],
    () => userLocation ? weatherApi.getCurrentWeather(userLocation.latitude, userLocation.longitude) : null,
    {
      enabled: !!userLocation,
      refetchInterval: 10 * 60 * 1000, // 10 minutes
    }
  )

  const { data: forecastData } = useQuery(
    ['weatherForecast', userLocation],
    () => userLocation ? weatherApi.getForecast(userLocation.latitude, userLocation.longitude) : [],
    {
      enabled: !!userLocation,
      refetchInterval: 30 * 60 * 1000, // 30 minutes
    }
  )

  const useMetric = userPreferences?.units !== 'imperial'

  if (!userLocation) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <CloudRain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Weather Information</h3>
          <p className="text-gray-600">Set your location to view current weather and forecasts.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!weatherData) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <CloudRain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Unable to load weather data. Please try again later.</p>
        </div>
      </div>
    )
  }

  const temperature = useMetric ? weatherData.temperature : celsiusToFahrenheit(weatherData.temperature)
  const tempUnit = useMetric ? '°C' : '°F'

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Current Weather</h2>
        <div className="text-xs sm:text-sm text-gray-500">
          {new Date(weatherData.timestamp).toLocaleTimeString()}
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="text-4xl sm:text-5xl lg:text-6xl">{weatherData.icon}</div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">
              {Math.round(temperature)}{tempUnit}
            </div>
            <div className="text-sm sm:text-base lg:text-lg text-gray-600 capitalize">
              {weatherData.description}
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right">
          <div className="text-xs sm:text-sm text-gray-500 mb-1">Feels like</div>
          <div className="text-base sm:text-lg font-semibold">
            {Math.round(temperature + (weatherData.humidity / 100) * 2)}{tempUnit}
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <WeatherMetric
          icon={<Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />}
          label="Humidity"
          value={`${weatherData.humidity}%`}
        />
        <WeatherMetric
          icon={<Wind className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />}
          label="Wind Speed"
          value={`${weatherData.windSpeed} m/s`}
        />
        <WeatherMetric
          icon={<Gauge className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />}
          label="Pressure"
          value={`${weatherData.pressure} hPa`}
        />
        <WeatherMetric
          icon={<Eye className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />}
          label="Visibility"
          value={`${weatherData.visibility} km`}
        />
      </div>

      {/* UV Index */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
            <span className="font-medium text-yellow-800 text-sm sm:text-base">UV Index</span>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xl sm:text-2xl font-bold text-yellow-800">{weatherData.uvIndex || 0}</div>
            <div className="text-xs sm:text-sm text-yellow-600">{getUVLevel(weatherData.uvIndex || 0)}</div>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      {forecastData && forecastData.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">5-Day Forecast</h3>
          <div className="h-40 sm:h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecastData}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                  fontSize={10}
                  interval="preserveStartEnd"
                />
                <YAxis
                  domain={['dataMin - 5', 'dataMax + 5']}
                  fontSize={10}
                  tickFormatter={(value) => `${Math.round(value)}°`}
                  width={30}
                />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                  formatter={(value: number) => [`${Math.round(value)}°C`, 'Temperature']}
                />
                <Line
                  type="monotone"
                  dataKey="high"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                  name="High"
                />
                <Line
                  type="monotone"
                  dataKey="low"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  name="Low"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

function WeatherMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500 uppercase tracking-wide truncate">{label}</div>
        <div className="text-sm font-semibold text-gray-900 truncate">{value}</div>
      </div>
    </div>
  )
}
