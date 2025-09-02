'use client'

import Link from 'next/link'
import { Github, Twitter, Mail, Phone, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.svg"
                alt="Haven - Disaster & Climate Resilience Platform"
                className="h-8 w-8"
              />
              <div>
                <h3 className="text-lg font-bold">Haven</h3>
                <p className="text-sm text-gray-400">Disaster & Climate Resilience</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering communities with AI-driven disaster preparedness, 
              early warning systems, and climate resilience tools for a safer tomorrow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/alerts" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Emergency Alerts
                </Link>
              </li>
              <li>
                <Link href="/risk-assessment" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Emergency Resources
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Community Hub
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Training Modules
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/emergency-guide" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Emergency Guide
                </Link>
              </li>
              <li>
                <Link href="/climate-tools" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Climate Tools
                </Link>
              </li>
              <li>
                <Link href="/preparedness-tips" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Preparedness Tips
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="text-gray-300 hover:text-white transition-colors text-sm">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="/data-sources" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Data Sources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Emergency */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Emergency Contacts</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-danger-400" />
                <div>
                  <p className="text-sm font-medium">Emergency Services</p>
                  <p className="text-danger-400 font-bold">911</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-primary-400" />
                <div>
                  <p className="text-sm font-medium">Disaster Hotline</p>
                  <p className="text-primary-400 font-medium">1-800-HELP</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium">Support</p>
                  <p className="text-gray-300 text-sm">help@disaster-assistant.org</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>&copy; 2024 Haven. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          
          {/* Data Sources Attribution */}
          <div className="mt-4 text-xs text-gray-500">
            <p>
              Data sources: OpenWeatherMap, USGS, NASA Earth Data, UNDRR, ReliefWeb. 
              This platform aggregates public data for educational and preparedness purposes.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
