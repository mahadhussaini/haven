'use client'

import { useState, useEffect, useCallback } from 'react'
import { MapPin, AlertTriangle, Shield, TrendingUp, Activity } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { LocationInput } from '@/components/common/LocationInput'

interface RiskData {
  flood: number
  earthquake: number
  wildfire: number
  hurricane: number
  heatwave: number
  overall: number
}

export default function RiskAssessmentPage() {
  const { userLocation } = useAppStore()
  const [riskData, setRiskData] = useState<RiskData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(userLocation)

  const generateRiskAssessment = useCallback(async () => {
    if (!selectedLocation) return
    
    setLoading(true)
    
    // Simulate API call for risk assessment
    setTimeout(() => {
      const mockRiskData: RiskData = {
        flood: Math.floor(Math.random() * 80) + 20,
        earthquake: Math.floor(Math.random() * 60) + 10,
        wildfire: Math.floor(Math.random() * 70) + 15,
        hurricane: Math.floor(Math.random() * 50) + 5,
        heatwave: Math.floor(Math.random() * 90) + 10,
        overall: 0
      }
      
      mockRiskData.overall = Math.round(
        (mockRiskData.flood + mockRiskData.earthquake + mockRiskData.wildfire + 
         mockRiskData.hurricane + mockRiskData.heatwave) / 5
      )
      
      setRiskData(mockRiskData)
      setLoading(false)
    }, 2000)
  }, [selectedLocation])

  useEffect(() => {
    if (selectedLocation) {
      generateRiskAssessment()
    }
  }, [selectedLocation, generateRiskAssessment])

  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-50' }
    if (score >= 40) return { level: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-50' }
  }

  const getRiskRecommendations = (riskType: string, score: number) => {
    if (score >= 70) {
      return [
        'Immediate action required',
        'Develop emergency evacuation plan',
        'Stock emergency supplies',
        'Monitor local alerts regularly'
      ]
    } else if (score >= 40) {
      return [
        'Moderate risk - stay prepared',
        'Review emergency procedures',
        'Keep emergency kit updated',
        'Stay informed about local conditions'
      ]
    } else {
      return [
        'Low risk area',
        'Maintain basic preparedness',
        'Stay updated on seasonal changes',
        'Support community resilience efforts'
      ]
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <AlertTriangle className="h-8 w-8 text-orange-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Risk Assessment</h1>
          <p className="text-gray-600">Analyze disaster vulnerability for your location</p>
        </div>
      </div>

      {/* Location Input */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Select Location</h2>
        </div>
        <LocationInput
          onLocationSelect={setSelectedLocation}
          placeholder="Enter city, address, or coordinates"
        />
        {selectedLocation && (
          <div className="mt-3 text-sm text-gray-600">
            Assessing risk for: {selectedLocation.city || `${selectedLocation.latitude.toFixed(4)}, ${selectedLocation.longitude.toFixed(4)}`}
          </div>
        )}
      </div>

      {/* Risk Assessment Results */}
      {loading && (
        <div className="card text-center py-12">
          <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Analyzing disaster risks for your location...</p>
        </div>
      )}

      {riskData && (
        <div className="space-y-8">
          {/* Overall Risk Score */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Overall Risk Score</h2>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">Risk Level</span>
              </div>
            </div>
            
            <div className="text-center mb-6">
              <div className={`text-6xl font-bold mb-2 ${getRiskLevel(riskData.overall).color}`}>
                {riskData.overall}
              </div>
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${getRiskLevel(riskData.overall).bgColor} ${getRiskLevel(riskData.overall).color}`}>
                {getRiskLevel(riskData.overall).level} Risk
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getRiskRecommendations('overall', riskData.overall).map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Risk Categories */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Risk Breakdown by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { key: 'flood', label: 'Flood Risk', icon: '🌊' },
                { key: 'earthquake', label: 'Earthquake Risk', icon: '🌋' },
                { key: 'wildfire', label: 'Wildfire Risk', icon: '🔥' },
                { key: 'hurricane', label: 'Hurricane Risk', icon: '🌀' },
                { key: 'heatwave', label: 'Heatwave Risk', icon: '☀️' }
              ].map(({ key, label, icon }) => {
                const score = riskData[key as keyof RiskData] as number
                const riskInfo = getRiskLevel(score)
                return (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{icon}</span>
                        <h3 className="font-medium text-gray-900">{label}</h3>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${riskInfo.bgColor} ${riskInfo.color}`}>
                        {riskInfo.level}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Risk Score</span>
                        <span className="font-medium">{score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            score >= 70 ? 'bg-red-500' : score >= 40 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {getRiskRecommendations(key, score).slice(0, 2).map((rec, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Historical Trends */}
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Risk Trends</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Recent Changes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-700">Flood Risk</span>
                    <span className="text-sm font-medium text-blue-600">+5% this month</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">Earthquake Risk</span>
                    <span className="text-sm font-medium text-green-600">-2% this month</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-gray-700">Wildfire Risk</span>
                    <span className="text-sm font-medium text-yellow-600">+8% this month</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Seasonal Factors</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm text-gray-700">Current Season</span>
                    <span className="text-sm font-medium text-orange-600">Summer</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm text-gray-700">El Niño Status</span>
                    <span className="text-sm font-medium text-purple-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <span className="text-sm text-gray-700">Climate Zone</span>
                    <span className="text-sm font-medium text-indigo-600">Temperate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Action Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl mb-2">🚨</div>
                <h3 className="font-semibold text-red-900 mb-2">Immediate Actions</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• Create emergency kit</li>
                  <li>• Plan evacuation routes</li>
                  <li>• Set up alerts</li>
                </ul>
              </div>
              
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-semibold text-yellow-900 mb-2">This Week</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Review insurance coverage</li>
                  <li>• Secure outdoor items</li>
                  <li>• Update emergency contacts</li>
                </ul>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl mb-2">🌱</div>
                <h3 className="font-semibold text-green-900 mb-2">Long-term</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Home retrofitting</li>
                  <li>• Community planning</li>
                  <li>• Regular drills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Location Selected */}
      {!selectedLocation && !loading && (
        <div className="card text-center py-12">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Location</h3>
          <p className="text-gray-600 mb-6">Enter your location above to begin risk assessment</p>
          <div className="text-sm text-gray-500">
            <p>We&apos;ll analyze:</p>
            <ul className="mt-2 space-y-1">
              <li>• Historical disaster data</li>
              <li>• Geographic vulnerability factors</li>
              <li>• Climate change projections</li>
              <li>• Local infrastructure resilience</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
