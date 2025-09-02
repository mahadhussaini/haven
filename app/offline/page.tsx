'use client'

import { useEffect, useState } from 'react'
import { Download, WifiOff, Wifi, Battery, Clock } from 'lucide-react'
import { OfflineGuide } from '@/components/offline/OfflineGuide'
import { useAppStore } from '@/store/useAppStore'

export default function OfflinePage() {
  const { isOnline, setOnlineStatus } = useAppStore()
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    // Monitor online status
    const handleOnline = () => setOnlineStatus(true)
    const handleOffline = () => setOnlineStatus(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Set initial status
    setOnlineStatus(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])

  const handleDownloadAll = async () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Download className="h-8 w-8 text-primary-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Offline Emergency Guide</h1>
          <p className="text-gray-600">Essential survival information available without internet</p>
        </div>
      </div>

      {/* Connection Status */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isOnline ? (
              <Wifi className="h-6 w-6 text-green-600" />
            ) : (
              <WifiOff className="h-6 w-6 text-red-600" />
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {isOnline ? 'Online' : 'Offline Mode'}
              </h2>
              <p className="text-sm text-gray-600">
                {isOnline
                  ? 'Connected to internet - full functionality available'
                  : 'No internet connection - using cached data'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Battery className="h-4 w-4" />
              <span>Battery: 85%</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>Last Sync: 2h ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Download Status */}
      {isOnline && (
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Download Emergency Content</h2>
              <p className="text-sm text-gray-600">Prepare for offline access to critical information</p>
            </div>
            {!isDownloading && downloadProgress === 0 && (
              <button
                onClick={handleDownloadAll}
                className="btn-primary"
              >
                Download All
              </button>
            )}
          </div>

          {isDownloading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Downloading emergency guides...</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {downloadProgress === 100 && !isDownloading && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="text-green-600">✓</div>
                <div>
                  <div className="font-semibold text-green-800">Download Complete</div>
                  <div className="text-sm text-green-700">Emergency content is ready for offline access</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Offline Warning */}
      {!isOnline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <WifiOff className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">Offline Mode Active</h3>
              <p className="text-sm text-yellow-700">
                You&apos;re viewing cached emergency information. Some features may be limited.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Offline Guide Content */}
      <OfflineGuide isOffline={!isOnline} />

      {/* Storage Info */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Storage Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">2.3 MB</div>
            <div className="text-sm text-gray-600">Emergency Guides</div>
            <div className="text-xs text-gray-500 mt-1">Offline survival information</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">1.8 MB</div>
            <div className="text-sm text-gray-600">Map Data</div>
            <div className="text-xs text-gray-500 mt-1">Cached resource locations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">0.9 MB</div>
            <div className="text-sm text-gray-600">Weather Data</div>
            <div className="text-xs text-gray-500 mt-1">Recent forecasts and alerts</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Total cached: <strong>4.9 MB</strong></span>
              <span className="text-gray-600">Last updated: <strong>2 hours ago</strong></span>
            </div>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Update Cache
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Mode */}
      <div className="card mt-8 bg-danger-50 border-danger-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-danger-100 rounded-lg">
              <Download className="h-6 w-6 text-danger-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-danger-900">Emergency Mode</h2>
              <p className="text-sm text-danger-700">
                Quick access to critical information during emergencies
              </p>
            </div>
          </div>
          <button className="bg-danger-600 text-white px-4 py-2 rounded-lg hover:bg-danger-700 transition-colors">
            Activate Emergency Mode
          </button>
        </div>
      </div>
    </div>
  )
}
