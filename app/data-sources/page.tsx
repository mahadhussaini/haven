'use client'

import { useState } from 'react'
import { Database, Globe, TrendingUp, Shield, Clock, ExternalLink, Info } from 'lucide-react'

interface DataSource {
  id: string
  name: string
  description: string
  category: string
  updateFrequency: string
  coverage: string
  reliability: 'High' | 'Medium' | 'Low'
  website: string
  apiAccess: boolean
  cost: string
  dataTypes: string[]
  lastUpdated: string
}

const dataSources: DataSource[] = [
  {
    id: 'openweather',
    name: 'OpenWeatherMap',
    description: 'Global weather data provider offering current conditions, forecasts, and historical data',
    category: 'Weather & Climate',
    updateFrequency: 'Every 10 minutes',
    coverage: 'Global',
    reliability: 'High',
    website: 'https://openweathermap.org',
    apiAccess: true,
    cost: 'Free tier available',
    dataTypes: ['Temperature', 'Humidity', 'Wind', 'Precipitation', 'Air Quality'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'usgs',
    name: 'US Geological Survey',
    description: 'Official US government agency providing earthquake, volcano, and natural hazard data',
    category: 'Geological Hazards',
    updateFrequency: 'Real-time',
    coverage: 'United States & Global',
    reliability: 'High',
    website: 'https://www.usgs.gov',
    apiAccess: true,
    cost: 'Free',
    dataTypes: ['Earthquakes', 'Volcanoes', 'Landslides', 'Geological Maps'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'nasa',
    name: 'NASA Earth Data',
    description: 'Satellite and space-based observations of Earth systems and climate change',
    category: 'Satellite & Climate',
    updateFrequency: 'Daily to Monthly',
    coverage: 'Global',
    reliability: 'High',
    website: 'https://earthdata.nasa.gov',
    apiAccess: true,
    cost: 'Free',
    dataTypes: ['Satellite Imagery', 'Climate Data', 'Ocean Data', 'Atmospheric Data'],
    lastUpdated: '2024-01-10'
  },
  {
    id: 'undrr',
    name: 'UNDRR (UN Disaster Risk Reduction)',
    description: 'United Nations agency focused on disaster risk reduction and resilience building',
    category: 'Disaster Management',
    updateFrequency: 'Weekly',
    coverage: 'Global',
    reliability: 'High',
    website: 'https://www.undrr.org',
    apiAccess: false,
    cost: 'Free',
    dataTypes: ['Disaster Reports', 'Risk Assessments', 'Policy Guidelines', 'Best Practices'],
    lastUpdated: '2024-01-12'
  },
  {
    id: 'reliefweb',
    name: 'ReliefWeb',
    description: 'Humanitarian information service providing disaster and emergency updates',
    category: 'Humanitarian',
    updateFrequency: 'Real-time',
    coverage: 'Global',
    reliability: 'High',
    website: 'https://reliefweb.int',
    apiAccess: true,
    cost: 'Free',
    dataTypes: ['Disaster Alerts', 'Humanitarian Reports', 'Emergency Updates', 'Resource Information'],
    lastUpdated: '2024-01-15'
  },
  {
    id: 'noaa',
    name: 'NOAA (National Oceanic and Atmospheric Administration)',
    description: 'US government agency providing weather, climate, and ocean data',
    category: 'Weather & Ocean',
    updateFrequency: 'Real-time to Daily',
    coverage: 'United States & Global',
    reliability: 'High',
    website: 'https://www.noaa.gov',
    apiAccess: true,
    cost: 'Free',
    dataTypes: ['Weather Forecasts', 'Climate Data', 'Ocean Conditions', 'Severe Weather'],
    lastUpdated: '2024-01-14'
  },
  {
    id: 'european-copernicus',
    name: 'European Copernicus Programme',
    description: 'European Union\'s Earth observation program providing environmental data',
    category: 'Environmental Monitoring',
    updateFrequency: 'Daily to Weekly',
    coverage: 'Global',
    reliability: 'High',
    website: 'https://www.copernicus.eu',
    apiAccess: true,
    cost: 'Free',
    dataTypes: ['Environmental Data', 'Climate Monitoring', 'Emergency Management', 'Land Use'],
    lastUpdated: '2024-01-13'
  },
  {
    id: 'world-bank',
    name: 'World Bank Climate Data',
    description: 'Global development bank providing climate and development indicators',
    category: 'Development & Climate',
    updateFrequency: 'Monthly to Annual',
    coverage: 'Global',
    reliability: 'High',
    website: 'https://climateknowledgeportal.worldbank.org',
    apiAccess: true,
    cost: 'Free',
    dataTypes: ['Climate Indicators', 'Development Data', 'Risk Assessments', 'Economic Impact'],
    lastUpdated: '2024-01-08'
  }
]

export default function DataSourcesPage() {
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = ['all', ...Array.from(new Set(dataSources.map(source => source.category)))]

  const filteredSources = dataSources.filter(source => {
    const matchesCategory = activeCategory === 'all' || source.category === activeCategory
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         source.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'High': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'Low': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Weather & Climate': '🌤️',
      'Geological Hazards': '🌋',
      'Satellite & Climate': '🛰️',
      'Disaster Management': '🚨',
      'Humanitarian': '🤝',
      'Weather & Ocean': '🌊',
      'Environmental Monitoring': '🌍',
      'Development & Climate': '📊'
    }
    return icons[category] || '📌'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Database className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Data Sources</h1>
          <p className="text-gray-600">Comprehensive information about our data providers and sources</p>
        </div>
      </div>

      {/* Data Overview */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Data Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">{dataSources.length}</div>
            <div className="text-sm text-blue-700">Data Sources</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-sm text-green-700">Categories</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-sm text-purple-700">Data Updates</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-sm text-orange-700">Free Access</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">Data Quality Standards</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Official government sources</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Real-time updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span>Historical data available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search data sources..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredSources.map((source) => (
          <div 
            key={source.id} 
            className="card cursor-pointer hover:shadow-lg transition-all duration-200"
            onClick={() => setSelectedSource(source)}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{getCategoryIcon(source.category)}</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getReliabilityColor(source.reliability)}`}>
                  {source.reliability}
                </span>
                {source.apiAccess && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                    API
                  </span>
                )}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {source.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {source.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Update Frequency</span>
                <span className="font-medium">{source.updateFrequency}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Coverage</span>
                <span className="font-medium">{source.coverage}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Cost</span>
                <span className="font-medium">{source.cost}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last Updated: {source.lastUpdated}</span>
              <span className="text-blue-600">Click for details →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Source Details */}
      {selectedSource && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-4xl">{getCategoryIcon(selectedSource.category)}</span>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{selectedSource.name}</h2>
                <p className="text-gray-600">{selectedSource.category}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedSource(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700">{selectedSource.description}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Data Types</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSource.dataTypes.map((type, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Technical Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Update Frequency</span>
                    <span className="text-sm font-medium">{selectedSource.updateFrequency}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Coverage</span>
                    <span className="text-sm font-medium">{selectedSource.coverage}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Reliability</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getReliabilityColor(selectedSource.reliability)}`}>
                      {selectedSource.reliability}
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">API Access</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      selectedSource.apiAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedSource.apiAccess ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Access Information</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-sm text-blue-800">
                      <strong>Cost:</strong> {selectedSource.cost}
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-sm text-green-800">
                      <strong>Last Updated:</strong> {selectedSource.lastUpdated}
                    </div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-800">
                      <strong>Category:</strong> {selectedSource.category}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">External Links</h3>
                <div className="space-y-3">
                  <a
                    href={selectedSource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600">Visit Official Website</span>
                  </a>
                  
                  {selectedSource.apiAccess && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-green-800">
                        <Info className="h-4 w-4" />
                        <span className="text-sm">API documentation available on official website</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Data Quality</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Official government source</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Regular updates and maintenance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Quality assurance processes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Documentation and metadata</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Integration */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Data Integration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">How We Use This Data</h5>
                <ul className="space-y-1">
                  <li>• Real-time monitoring and alerts</li>
                  <li>• Risk assessment calculations</li>
                  <li>• Historical trend analysis</li>
                  <li>• Emergency response planning</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Data Processing</h5>
                <ul className="space-y-1">
                  <li>• Automated data validation</li>
                  <li>• Quality control checks</li>
                  <li>• Format standardization</li>
                  <li>• Real-time aggregation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Categories Overview */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.filter(cat => cat !== 'all').map((category) => {
            const sourceCount = dataSources.filter(source => source.category === category).length
            return (
              <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">{getCategoryIcon(category)}</div>
                <div className="font-semibold text-gray-900">{category}</div>
                <div className="text-sm text-gray-600">{sourceCount} data source{sourceCount !== 1 ? 's' : ''}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Data Usage Guidelines */}
      <div className="card mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Data Usage Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Attribution Requirements</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Credit original data sources</li>
              <li>• Include source URLs when possible</li>
              <li>• Respect data provider terms of service</li>
              <li>• Maintain data integrity and accuracy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Usage Restrictions</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Non-commercial use only</li>
              <li>• Educational and preparedness purposes</li>
              <li>• No redistribution without permission</li>
              <li>• Follow fair use guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
