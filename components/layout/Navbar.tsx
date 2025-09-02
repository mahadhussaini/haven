'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Shield, MapPin, Book, AlertTriangle, Users, Wind, Signal } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { userLocation, activeAlerts } = useAppStore()
  
  const criticalAlerts = activeAlerts.filter(alert => 
    alert.severity === 'extreme' || alert.severity === 'high'
  )

  const navItems = [
    { href: '/', label: 'Dashboard', icon: Shield },
    { href: '/alerts', label: 'Alerts', icon: AlertTriangle, badge: criticalAlerts.length },
    { href: '/emergency', label: 'Emergency', icon: MapPin },
    { href: '/resources', label: 'Resources', icon: Book },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/climate', label: 'Climate', icon: Wind },
    { href: '/offline', label: 'Offline', icon: Signal },
  ]

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/logo.svg"
              alt="Haven - Disaster & Climate Resilience Platform"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                Haven
              </h1>
              <p className="text-xs text-gray-500 sm:block">
                Disaster & Climate Resilience
              </p>
            </div>
          </Link>

          {/* Location Display */}
          {userLocation && (
            <div className="hidden lg:flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate max-w-[200px]">
                {userLocation.city ?
                  `${userLocation.city}, ${userLocation.country}` :
                  `${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}`
                }
              </span>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-2 xl:px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-gray-100 text-gray-700 hover:text-gray-900 whitespace-nowrap"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="hidden xl:inline">{item.label}</span>
                <span className="xl:hidden">{item.label.split(' ')[0]}</span>
                {item.badge && item.badge > 0 && (
                  <span className="bg-danger-500 text-white text-xs rounded-full px-1.5 xl:px-2 py-0.5 min-w-[1.2rem] xl:min-w-[1.5rem] text-center flex-shrink-0">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="px-4 py-3 space-y-2 max-h-[70vh] overflow-y-auto">
              {/* Mobile Location Display */}
              {userLocation && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg mb-3">
                  <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {userLocation.city || 'Current Location'}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {userLocation.city ?
                        userLocation.country :
                        `${userLocation.latitude.toFixed(2)}, ${userLocation.longitude.toFixed(2)}`
                      }
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Items */}
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-colors",
                      "text-gray-700 hover:text-gray-900 hover:bg-gray-100 active:bg-gray-200"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-danger-500 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center flex-shrink-0 ml-2">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Quick Actions */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/emergency"
                    className="flex flex-col items-center justify-center p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mb-2">
                      <AlertTriangle className="h-4 w-4 text-primary-600" />
                    </div>
                    <span className="text-xs font-medium text-primary-700 text-center">Emergency</span>
                  </Link>
                  <Link
                    href="/resources"
                    className="flex flex-col items-center justify-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-blue-700 text-center">Resources</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Critical Alert Banner */}
      {criticalAlerts.length > 0 && (
        <div className="bg-danger-600 text-white px-4 py-2">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 animate-pulse" />
              <span className="font-medium">
                {criticalAlerts.length} critical alert{criticalAlerts.length > 1 ? 's' : ''} in your area
              </span>
            </div>
            <Link
              href="/alerts"
              className="text-sm underline hover:no-underline"
            >
              View Details
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
