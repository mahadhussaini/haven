'use client'

import { useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

export function OfflineIndicator() {
  const { isOnline, showOfflineMessage, setOnlineStatus, setShowOfflineMessage } = useAppStore()

  useEffect(() => {
    const handleOnline = () => {
      setOnlineStatus(true)
      toast.success('Connection restored', {
        icon: '🌐',
        duration: 3000,
      })
    }

    const handleOffline = () => {
      setOnlineStatus(false)
      toast.error('Connection lost - Offline mode activated', {
        icon: '📱',
        duration: 5000,
      })
    }

    // Set initial status
    setOnlineStatus(navigator.onLine)

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [setOnlineStatus])

  if (isOnline && !showOfflineMessage) {
    return null
  }

  return (
    <div className="offline-indicator">
      {!isOnline && (
        <div className={cn(
          "flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg",
          "border border-gray-600"
        )}>
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">Offline Mode</span>
        </div>
      )}
      
      {showOfflineMessage && isOnline && (
        <div className={cn(
          "flex items-center justify-between space-x-3 bg-success-600 text-white px-4 py-2 rounded-lg shadow-lg",
          "border border-success-500"
        )}>
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4" />
            <span className="text-sm font-medium">Back Online</span>
          </div>
          <button
            onClick={() => setShowOfflineMessage(false)}
            className="text-white hover:text-success-200 transition-colors"
          >
            <span className="sr-only">Dismiss</span>
            ×
          </button>
        </div>
      )}
    </div>
  )
}
