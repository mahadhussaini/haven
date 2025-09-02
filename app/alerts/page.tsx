'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { AlertTriangle, MapPin, Clock, ExternalLink, Search } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { earthquakeApi } from '@/lib/api'
import { getDisasterIcon, getSeverityColor, getSeverityIcon, formatTimeAgo, formatDateTime } from '@/lib/utils'
import type { DisasterAlert, DisasterType, AlertSeverity } from '@/types'

export default function AlertsPage() {
  const { activeAlerts, addAlert } = useAppStore()
  const [selectedAlert, setSelectedAlert] = useState<DisasterAlert | null>(null)
  const [filterType, setFilterType] = useState<DisasterType | 'all'>('all')
  const [filterSeverity, setFilterSeverity] = useState<AlertSeverity | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch earthquake alerts
  useQuery(
    ['earthquakeAlerts'],
    () => earthquakeApi.getRecentEarthquakes(),
    {
      refetchInterval: 10 * 60 * 1000,
      onSuccess: (data) => {
        data.forEach(alert => addAlert(alert))
      }
    }
  )

  // Filter and search alerts
  const filteredAlerts = activeAlerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity
    const matchesSearch = searchQuery === '' ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.city?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesSeverity && matchesSearch
  })

  const sortedAlerts = filteredAlerts.sort((a, b) =>
    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  )

  const criticalAlerts = activeAlerts.filter(alert =>
    alert.severity === 'extreme' || alert.severity === 'high'
  )

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
      <div className="flex items-center space-x-2 sm:space-x-3 mb-6 sm:mb-8">
        <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-danger-600 flex-shrink-0" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Emergency Alerts</h1>
          <p className="text-gray-600 text-sm sm:text-base">Real-time disaster alerts and emergency notifications</p>
        </div>
      </div>

      {/* Critical Alerts Summary */}
      {criticalAlerts.length > 0 && (
        <div className="alert-danger mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold mb-1">Critical Alerts Active</h2>
              <p className="text-sm">
                {criticalAlerts.length} high-priority alert{criticalAlerts.length !== 1 ? 's' : ''} require immediate attention
              </p>
            </div>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="card mb-6 sm:mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              id="alert-search"
              name="searchQuery"
              type="text"
              placeholder="Search alerts..."
              className="w-full pl-9 sm:pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4">
            <select
              id="alert-type-filter"
              name="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as DisasterType | 'all')}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base btn-touch"
            >
              <option value="all">All Types</option>
              <option value="earthquake">Earthquake</option>
              <option value="flood">Flood</option>
              <option value="hurricane">Hurricane</option>
              <option value="wildfire">Wildfire</option>
              <option value="heatwave">Heatwave</option>
              <option value="severe_weather">Severe Weather</option>
            </select>

            <select
              id="alert-severity-filter"
              name="filterSeverity"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as AlertSeverity | 'all')}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base btn-touch"
            >
              <option value="all">All Severities</option>
              <option value="extreme">Extreme</option>
              <option value="high">High</option>
              <option value="moderate">Moderate</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert List and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Alert List */}
        <div className="lg:col-span-2">
          {sortedAlerts.length > 0 ? (
            <div className="space-y-4">
              {sortedAlerts.map((alert) => (
                <AlertListItem
                  key={alert.id}
                  alert={alert}
                  isSelected={selectedAlert?.id === alert.id}
                  onSelect={() => setSelectedAlert(alert)}
                />
              ))}
            </div>
          ) : (
            <div className="card">
              <div className="text-center py-12">
                <AlertTriangle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Alerts Found</h3>
                <p className="text-gray-600">
                  {searchQuery || filterType !== 'all' || filterSeverity !== 'all'
                    ? 'No alerts match your current filters.'
                    : 'No active alerts at this time. Stay prepared!'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Alert Detail View */}
        <div className="lg:col-span-1">
          {selectedAlert ? (
            <AlertDetailView alert={selectedAlert} />
          ) : (
            <div className="card sticky top-8">
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select an alert to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function AlertListItem({
  alert,
  isSelected,
  onSelect
}: {
  alert: DisasterAlert
  isSelected: boolean
  onSelect: () => void
}) {
  const severityColor = getSeverityColor(alert.severity)
  const disasterIcon = getDisasterIcon(alert.type)
  const severityIcon = getSeverityIcon(alert.severity)

  return (
    <div
      className={`card cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start space-x-3 sm:space-x-4">
        <span className="text-2xl sm:text-3xl flex-shrink-0">{disasterIcon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 space-y-2 sm:space-y-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {alert.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${severityColor}-100 text-${severityColor}-800 self-start sm:self-auto flex-shrink-0`}>
              {severityIcon} {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {alert.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">{alert.location.latitude.toFixed(2)}, {alert.location.longitude.toFixed(2)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3 flex-shrink-0" />
              <span>{formatTimeAgo(alert.startTime)}</span>
            </div>
            <span className="text-gray-400 truncate">Source: {alert.source}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function AlertDetailView({ alert }: { alert: DisasterAlert }) {
  const severityColor = getSeverityColor(alert.severity)
  const disasterIcon = getDisasterIcon(alert.type)
  const severityIcon = getSeverityIcon(alert.severity)

  return (
    <div className="card sticky top-8">
      <div className="flex items-center space-x-3 mb-4">
        <span className="text-4xl">{disasterIcon}</span>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{alert.title}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${severityColor}-100 text-${severityColor}-800`}>
              {severityIcon} {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
            </span>
            <span className="text-xs text-gray-500">{alert.type.replace('_', ' ').toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{alert.description}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>
              {alert.location.latitude.toFixed(4)}, {alert.location.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Started: {formatDateTime(alert.startTime)}</span>
            </div>
            {alert.endTime && (
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Ends: {formatDateTime(alert.endTime)}</span>
              </div>
            )}
          </div>
        </div>

        {alert.instructions && alert.instructions.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Emergency Instructions</h3>
            <div className="space-y-2">
              {alert.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-primary-600 font-semibold text-sm">{index + 1}.</span>
                  <span className="text-gray-600 text-sm">{instruction}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Source</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{alert.source}</span>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {alert.urgency === 'immediate' && (
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-danger-600" />
              <span className="font-semibold text-danger-800">Immediate Action Required</span>
            </div>
            <p className="text-danger-700 text-sm">
              This is a high-urgency alert. Follow all instructions immediately and stay informed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
