'use client'

import { useState, useEffect } from 'react'
import { Download, Book, AlertTriangle, Heart, Shield, Phone, WifiOff } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

interface OfflineGuideProps {
  isOffline?: boolean
}

const offlineContent = {
  emergencyContacts: [
    { name: 'Emergency Services', number: '911', description: 'Police, Fire, Medical' },
    { name: 'Poison Control', number: '1-800-222-1222', description: '24/7 poison emergency' },
    { name: 'National Suicide Prevention', number: '988', description: 'Mental health crisis' },
    { name: 'Domestic Violence Hotline', number: '1-800-799-7233', description: '24/7 support' },
  ],
  survivalGuides: [
    {
      title: 'Basic First Aid',
      icon: Heart,
      content: [
        'Stop bleeding: Apply pressure with clean cloth',
        'CPR: 30 chest compressions, 2 breaths',
        'Choking: Heimlich maneuver for adults',
        'Burns: Cool with water, cover with clean cloth',
        'Broken bones: Immobilize, apply ice, seek help'
      ]
    },
    {
      title: 'Emergency Sheltering',
      icon: Shield,
      content: [
        'Find highest ground during floods',
        'Stay indoors during severe weather',
        'Use blankets for insulation',
        'Conserve body heat in groups',
        'Signal for help with bright colors'
      ]
    },
    {
      title: 'Communication',
      icon: Phone,
      content: [
        'Family meeting place: Designate safe location',
        'Out-of-area contact: Family member outside area',
        'Emergency radio: Battery or hand-crank powered',
        'Whistle signals: 3 blasts for help',
        'SOS: 3 short, 3 long, 3 short signals'
      ]
    },
    {
      title: 'Water & Food Safety',
      icon: AlertTriangle,
      content: [
        'Water: 1 gallon per person per day',
        'Purification: Boil 1 minute, or use tablets',
        'Food storage: Keep refrigerated 2 hours max',
        'Non-perishables: Canned goods, dried foods',
        'Hygiene: Hand washing prevents illness'
      ]
    }
  ],
  disasterTypes: [
    {
      name: 'Earthquake',
      icon: '🏢',
      immediate: [
        'Drop to ground, take cover, hold on',
        'Stay away from windows and heavy objects',
        'If outside, move to open area',
        'After shaking, check for injuries'
      ],
      after: [
        'Check utilities for damage',
        'Use phone only for emergencies',
        'Be prepared for aftershocks',
        'Follow evacuation orders if issued'
      ]
    },
    {
      name: 'Flood',
      icon: '🌊',
      immediate: [
        'Move to higher ground immediately',
        'Avoid walking or driving through water',
        'Do not touch electrical equipment',
        'Stay away from downed power lines'
      ],
      after: [
        'Return home only when authorities say safe',
        'Avoid floodwater - may be contaminated',
        'Take photos of damage for insurance',
        'Boil water before drinking'
      ]
    },
    {
      name: 'Hurricane',
      icon: '🌀',
      immediate: [
        'Stay indoors away from windows',
        'Close all shutters and doors',
        'Have emergency supplies ready',
        'Keep battery-powered radio on'
      ],
      after: [
        'Stay off roads until cleared',
        'Avoid downed power lines',
        'Check for structural damage',
        'Use generators outside only'
      ]
    }
  ]
}

export function OfflineGuide({ isOffline }: OfflineGuideProps) {
  const { } = useAppStore()
  const [downloaded, setDownloaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    // Check if content is already downloaded
    const checkDownloaded = async () => {
      if ('serviceWorker' in navigator && 'caches' in window) {
        try {
          const cache = await caches.open('disaster-guide-v1')
          const response = await cache.match('/offline-guide')
          setDownloaded(!!response)
        } catch (error) {
          console.log('Cache check failed:', error)
        }
      }
    }
    checkDownloaded()
  }, [])

  const downloadOfflineContent = async () => {
    if ('serviceWorker' in navigator && 'caches' in window) {
      try {
        const cache = await caches.open('disaster-guide-v1')
        await cache.put('/offline-guide', new Response(JSON.stringify(offlineContent)))
        setDownloaded(true)
      } catch (error) {
        console.error('Download failed:', error)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Offline Status Banner */}
      {isOffline && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <WifiOff className="h-5 w-5 text-yellow-600" />
            <div>
              <h3 className="font-semibold text-yellow-800">Offline Mode</h3>
              <p className="text-sm text-yellow-700">Access cached emergency information</p>
            </div>
          </div>
        </div>
      )}

      {/* Download Banner */}
      {!downloaded && !isOffline && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Download className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-800">Download Offline Guide</h3>
                <p className="text-sm text-blue-700">Access emergency information without internet</p>
              </div>
            </div>
            <button
              onClick={downloadOfflineContent}
              className="btn-primary"
            >
              Download
            </button>
          </div>
        </div>
      )}

      {/* Emergency Contacts */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Phone className="h-6 w-6 text-red-600" />
          <h2 className="text-xl font-semibold text-gray-900">Emergency Contacts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offlineContent.emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-900">{contact.name}</div>
                <div className="text-sm text-gray-600">{contact.description}</div>
              </div>
              <div className="text-lg font-bold text-red-600">{contact.number}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Survival Guides */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Book className="h-6 w-6 text-primary-600" />
          <h2 className="text-xl font-semibold text-gray-900">Survival Guides</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offlineContent.survivalGuides.map((guide, index) => {
            const IconComponent = guide.icon
            return (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <IconComponent className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                </div>
                <ul className="space-y-2">
                  {guide.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                      <span className="text-primary-600 font-semibold mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Disaster Response Guides */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Disaster Response</h2>
        </div>
        <div className="space-y-6">
          {offlineContent.disasterTypes.map((disaster, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-2xl">{disaster.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900">{disaster.name}</h3>
                <button
                  onClick={() => setActiveSection(activeSection === disaster.name ? null : disaster.name)}
                  className="ml-auto text-primary-600 hover:text-primary-700 font-medium text-sm"
                >
                  {activeSection === disaster.name ? 'Hide' : 'Show'} Guide
                </button>
              </div>

              {activeSection === disaster.name && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-700 mb-2">During Event</h4>
                    <ul className="space-y-2">
                      {disaster.immediate.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                          <span className="text-red-600 font-bold mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-700 mb-2">After Event</h4>
                    <ul className="space-y-2">
                      {disaster.after.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start space-x-2 text-sm text-gray-700">
                          <span className="text-blue-600 font-bold mt-1">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Personal Emergency Plan Template */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Personal Emergency Plan</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Family Communication Plan</h3>
            <div className="space-y-2 text-sm text-yellow-700">
              <div><strong>Meeting Place:</strong> ________________________________</div>
              <div><strong>Out-of-Area Contact:</strong> ___________________________</div>
              <div><strong>Emergency Kit Location:</strong> _______________________</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Emergency Supplies</h3>
              <ul className="space-y-1 text-sm text-blue-700">
                <li>☐ Water (1 gallon/person/day)</li>
                <li>☐ Non-perishable food (3 days)</li>
                <li>☐ First aid kit</li>
                <li>☐ Flashlight and batteries</li>
                <li>☐ Emergency radio</li>
                <li>☐ Important documents</li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Important Information</h3>
              <ul className="space-y-1 text-sm text-green-700">
                <li>☐ Home address: ________________</li>
                <li>☐ Insurance info: _______________</li>
                <li>☐ Medical conditions: ___________</li>
                <li>☐ Emergency contacts: __________</li>
                <li>☐ Utility shut-off locations: ____</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Tips */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Offline Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Stay Informed</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Keep battery-powered or hand-crank radio</li>
              <li>• Monitor local emergency broadcasts</li>
              <li>• Check community bulletin boards</li>
              <li>• Listen for official announcements</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Conserve Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Use phone only for emergencies</li>
              <li>• Limit appliance use during outages</li>
              <li>• Share resources with neighbors</li>
              <li>• Keep refrigerator closed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
