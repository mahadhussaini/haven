import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, isAfter, isBefore } from 'date-fns'
import type { Location, DisasterType, AlertSeverity } from '@/types'

// Utility function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Location utilities
export function calculateDistance(loc1: Location, loc2: Location): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRadians(loc2.latitude - loc1.latitude)
  const dLon = toRadians(loc2.longitude - loc1.longitude)
  const lat1 = toRadians(loc1.latitude)
  const lat2 = toRadians(loc2.latitude)

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function isLocationInBounds(location: Location, bounds: { north: number; south: number; east: number; west: number }): boolean {
  return (
    location.latitude <= bounds.north &&
    location.latitude >= bounds.south &&
    location.longitude <= bounds.east &&
    location.longitude >= bounds.west
  )
}

export function formatLocation(location: Location): string {
  if (location.city && location.country) {
    return location.state 
      ? `${location.city}, ${location.state}, ${location.country}`
      : `${location.city}, ${location.country}`
  }
  return `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`
}

// Date and time utilities
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMM dd, yyyy')
}

export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, 'MMM dd, yyyy HH:mm')
}

export function formatTimeAgo(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export function isDateInFuture(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return isAfter(dateObj, new Date())
}

export function isDateInPast(date: string | Date): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return isBefore(dateObj, new Date())
}

// Disaster and severity utilities
export function getDisasterIcon(type: DisasterType): string {
  const icons: Record<DisasterType, string> = {
    earthquake: '🏢',
    flood: '🌊',
    hurricane: '🌀',
    tornado: '🌪️',
    wildfire: '🔥',
    heatwave: '🌡️',
    blizzard: '❄️',
    tsunami: '🌊',
    volcanic: '🌋',
    drought: '🏜️',
    severe_weather: '⛈️',
  }
  return icons[type] || '⚠️'
}

export function getDisasterColor(type: DisasterType): string {
  const colors: Record<DisasterType, string> = {
    earthquake: 'brown',
    flood: 'blue',
    hurricane: 'purple',
    tornado: 'gray',
    wildfire: 'red',
    heatwave: 'orange',
    blizzard: 'cyan',
    tsunami: 'teal',
    volcanic: 'red',
    drought: 'yellow',
    severe_weather: 'indigo',
  }
  return colors[type] || 'gray'
}

export function getSeverityColor(severity: AlertSeverity): string {
  const colors: Record<AlertSeverity, string> = {
    low: 'green',
    moderate: 'yellow',
    high: 'orange',
    extreme: 'red',
  }
  return colors[severity]
}

export function getSeverityIcon(severity: AlertSeverity): string {
  const icons: Record<AlertSeverity, string> = {
    low: 'ℹ️',
    moderate: '⚠️',
    high: '⚡',
    extreme: '🚨',
  }
  return icons[severity]
}

// Risk calculation utilities
export function calculateOverallRisk(risks: Array<{ probability: number; impact: number }>): number {
  if (risks.length === 0) return 0
  
  const totalRisk = risks.reduce((sum, risk) => {
    return sum + (risk.probability * risk.impact) / 100
  }, 0)
  
  return Math.min(totalRisk / risks.length, 100)
}

export function getRiskLevel(score: number): 'Low' | 'Moderate' | 'High' | 'Extreme' {
  if (score >= 75) return 'Extreme'
  if (score >= 50) return 'High'
  if (score >= 25) return 'Moderate'
  return 'Low'
}

export function getRiskColor(score: number): string {
  if (score >= 75) return 'red'
  if (score >= 50) return 'orange'
  if (score >= 25) return 'yellow'
  return 'green'
}

// Weather utilities
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9
}

export function metersPerSecondToMph(mps: number): number {
  return mps * 2.237
}

export function metersPerSecondToKmh(mps: number): number {
  return mps * 3.6
}

export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function getUVLevel(uvIndex: number): string {
  if (uvIndex <= 2) return 'Low'
  if (uvIndex <= 5) return 'Moderate'
  if (uvIndex <= 7) return 'High'
  if (uvIndex <= 10) return 'Very High'
  return 'Extreme'
}

// Data validation utilities
export function isValidCoordinate(lat: number, lon: number): boolean {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

// Storage utilities
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  } catch (error) {
    console.error('Error setting localStorage:', error)
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    }
  } catch (error) {
    console.error('Error getting localStorage:', error)
  }
  return defaultValue
}

export function removeLocalStorage(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  } catch (error) {
    console.error('Error removing localStorage:', error)
  }
}

// Offline utilities
export function isOnline(): boolean {
  return typeof window !== 'undefined' ? navigator.onLine : true
}

export function addOfflineEventListeners(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', onOffline)
    
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }
  return () => {}
}

// Emergency contact utilities
export function formatEmergencyNumber(number: string, countryCode?: string): string {
  // Format emergency numbers based on country
  if (countryCode === 'US' || !countryCode) {
    return '911'
  }
  // Add more country-specific emergency numbers as needed
  return number
}

// Cache utilities
export function getCacheKey(...parts: string[]): string {
  return parts.join(':')
}

export function isExpired(timestamp: string, ttlMinutes: number): boolean {
  const now = new Date()
  const cacheTime = new Date(timestamp)
  const diffMinutes = (now.getTime() - cacheTime.getTime()) / (1000 * 60)
  return diffMinutes > ttlMinutes
}

// Error handling utilities
export function createErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return 'An unexpected error occurred'
}

export function logError(error: unknown, context?: string): void {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error)
}

// Debounce utility
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Generate unique IDs
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
