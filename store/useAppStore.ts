import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { 
  Location, 
  UserPreferences, 
  DisasterAlert, 
  WeatherData,
  RiskAssessment,
  EmergencyResource
} from '@/types'

interface AppState {
  // User data
  userLocation: Location | null
  userPreferences: UserPreferences | null
  
  // App state
  isOnline: boolean
  isLoading: boolean
  
  // Data cache
  weatherData: WeatherData | null
  activeAlerts: DisasterAlert[]
  riskAssessment: RiskAssessment | null
  nearbyResources: EmergencyResource[]
  
  // UI state
  selectedAlert: DisasterAlert | null
  showOfflineMessage: boolean
  
  // Actions
  setUserLocation: (location: Location) => void
  setUserPreferences: (preferences: UserPreferences) => void
  setOnlineStatus: (isOnline: boolean) => void
  setLoading: (isLoading: boolean) => void
  setWeatherData: (data: WeatherData | null) => void
  setActiveAlerts: (alerts: DisasterAlert[]) => void
  addAlert: (alert: DisasterAlert) => void
  removeAlert: (alertId: string) => void
  setRiskAssessment: (assessment: RiskAssessment | null) => void
  setNearbyResources: (resources: EmergencyResource[]) => void
  setSelectedAlert: (alert: DisasterAlert | null) => void
  setShowOfflineMessage: (show: boolean) => void
  clearCache: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      userLocation: null,
      userPreferences: null,
      isOnline: true,
      isLoading: false,
      weatherData: null,
      activeAlerts: [],
      riskAssessment: null,
      nearbyResources: [],
      selectedAlert: null,
      showOfflineMessage: false,

      // Actions
      setUserLocation: (location: Location) => {
        set({ userLocation: location })
      },

      setUserPreferences: (preferences: UserPreferences) => {
        set({ userPreferences: preferences })
      },

      setOnlineStatus: (isOnline: boolean) => {
        set({ 
          isOnline,
          showOfflineMessage: !isOnline 
        })
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading })
      },

      setWeatherData: (data: WeatherData | null) => {
        set({ weatherData: data })
      },

      setActiveAlerts: (alerts: DisasterAlert[]) => {
        set({ activeAlerts: alerts })
      },

      addAlert: (alert: DisasterAlert) => {
        const { activeAlerts } = get()
        const existingIndex = activeAlerts.findIndex(a => a.id === alert.id)
        
        if (existingIndex >= 0) {
          // Update existing alert
          const updatedAlerts = [...activeAlerts]
          updatedAlerts[existingIndex] = alert
          set({ activeAlerts: updatedAlerts })
        } else {
          // Add new alert
          set({ activeAlerts: [...activeAlerts, alert] })
        }
      },

      removeAlert: (alertId: string) => {
        const { activeAlerts } = get()
        set({ 
          activeAlerts: activeAlerts.filter(a => a.id !== alertId),
          selectedAlert: get().selectedAlert?.id === alertId ? null : get().selectedAlert
        })
      },

      setRiskAssessment: (assessment: RiskAssessment | null) => {
        set({ riskAssessment: assessment })
      },

      setNearbyResources: (resources: EmergencyResource[]) => {
        set({ nearbyResources: resources })
      },

      setSelectedAlert: (alert: DisasterAlert | null) => {
        set({ selectedAlert: alert })
      },

      setShowOfflineMessage: (show: boolean) => {
        set({ showOfflineMessage: show })
      },

      clearCache: () => {
        set({
          weatherData: null,
          activeAlerts: [],
          riskAssessment: null,
          nearbyResources: [],
          selectedAlert: null,
        })
      },
    }),
    {
      name: 'haven-app-storage',
      partialize: (state) => ({
        userLocation: state.userLocation,
        userPreferences: state.userPreferences,
        // Don't persist real-time data
      }),
    }
  )
)

// Selectors for computed state
export const useUserLocation = () => useAppStore(state => state.userLocation)
export const useUserPreferences = () => useAppStore(state => state.userPreferences)
export const useOnlineStatus = () => useAppStore(state => state.isOnline)
export const useAppLoading = () => useAppStore(state => state.isLoading)
export const useWeatherData = () => useAppStore(state => state.weatherData)
export const useActiveAlerts = () => useAppStore(state => state.activeAlerts)
export const useRiskAssessment = () => useAppStore(state => state.riskAssessment)
export const useNearbyResources = () => useAppStore(state => state.nearbyResources)
export const useSelectedAlert = () => useAppStore(state => state.selectedAlert)
export const useShowOfflineMessage = () => useAppStore(state => state.showOfflineMessage)

// Computed selectors
export const useHighPriorityAlerts = () => {
  return useAppStore(state => 
    state.activeAlerts.filter(alert => 
      alert.severity === 'high' || alert.severity === 'extreme'
    )
  )
}

export const useLocationBasedAlerts = () => {
  return useAppStore(state => {
    if (!state.userLocation) return []
    
    return state.activeAlerts.filter(alert => {
      // Simple distance check - in real app would use proper geospatial calculations
      const distance = Math.sqrt(
        Math.pow(alert.location.latitude - state.userLocation!.latitude, 2) +
        Math.pow(alert.location.longitude - state.userLocation!.longitude, 2)
      )
      return distance < 1 // Within roughly 100km
    })
  })
}

export const useUserSettings = () => {
  return useAppStore(state => ({
    location: state.userLocation,
    preferences: state.userPreferences,
    setLocation: state.setUserLocation,
    setPreferences: state.setUserPreferences,
  }))
}

export const useEmergencyData = () => {
  return useAppStore(state => ({
    alerts: state.activeAlerts,
    weather: state.weatherData,
    resources: state.nearbyResources,
    riskAssessment: state.riskAssessment,
  }))
}
