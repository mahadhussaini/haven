'use client'

import { useQuery } from 'react-query'
import { AlertTriangle, MapPin, Clock, ExternalLink } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { earthquakeApi } from '@/lib/api'
import { getDisasterIcon, getSeverityColor, getSeverityIcon, formatTimeAgo } from '@/lib/utils'
import type { DisasterAlert } from '@/types'

export function LiveAlerts() {
  const { activeAlerts, addAlert } = useAppStore()

  // Fetch earthquake alerts
  useQuery(
    ['earthquakeAlerts'],
    () => earthquakeApi.getRecentEarthquakes(),
    {
      refetchInterval: 10 * 60 * 1000, // 10 minutes
      onSuccess: (data) => {
        data.forEach(alert => addAlert(alert))
      }
    }
  )

  const criticalAlerts = activeAlerts.filter(alert =>
    alert.severity === 'extreme' || alert.severity === 'high'
  )

  const recentAlerts = activeAlerts
    .filter(alert => alert.isActive)
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
    .slice(0, 5)

  return (
    <div className="card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-danger-600 flex-shrink-0" />
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Live Alerts</h2>
        </div>
        <div className="text-xs sm:text-sm text-gray-500">
          {activeAlerts.length} active alert{activeAlerts.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {criticalAlerts.length > 0 && (
        <div className="alert-danger mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="font-semibold text-sm sm:text-base">Critical Alerts</span>
            </div>
            <p className="text-xs sm:text-sm">
              {criticalAlerts.length} high-priority alert{criticalAlerts.length !== 1 ? 's' : ''} require immediate attention.
            </p>
          </div>
        </div>
      )}

      {/* Recent Alerts */}
      {recentAlerts.length > 0 ? (
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">All Clear</h3>
          <p className="text-gray-600">
            No active alerts in your area. Stay prepared and check back regularly.
          </p>
        </div>
      )}

      {/* View All Link */}
      {activeAlerts.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href="/alerts"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>View all alerts</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )
}

function AlertCard({ alert }: { alert: DisasterAlert }) {
  const severityColor = getSeverityColor(alert.severity)
  const disasterIcon = getDisasterIcon(alert.type)
  const severityIcon = getSeverityIcon(alert.severity)

  return (
    <div className={`border-l-4 border-${severityColor}-500 bg-${severityColor}-50 p-3 sm:p-4 rounded-r-lg`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">{disasterIcon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2 space-y-2 sm:space-y-0">
              <span className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">{alert.title}</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${severityColor}-100 text-${severityColor}-800 self-start sm:self-auto`}>
                {severityIcon} {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2 leading-relaxed">{alert.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">
                  {alert.location.latitude.toFixed(2)}, {alert.location.longitude.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3 flex-shrink-0" />
                <span>{formatTimeAgo(alert.startTime)}</span>
              </div>
              <span className="text-gray-400 truncate">Source: {alert.source}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:ml-4 flex-shrink-0">
          {alert.instructions && alert.instructions.length > 0 && (
            <button className="text-primary-600 hover:text-primary-700 text-xs font-medium whitespace-nowrap">
              View Instructions
            </button>
          )}
          {alert.urgency === 'immediate' && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-danger-100 text-danger-800 whitespace-nowrap">
              Immediate Action Required
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
