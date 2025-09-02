'use client'

import { useState } from 'react'
import { Code, Database, Globe, Key, Zap, Download, Copy } from 'lucide-react'

interface ApiEndpoint {
  method: string
  path: string
  description: string
  parameters: { name: string; type: string; required: boolean; description: string }[]
  response: { status: number; description: string; example: string }
  rateLimit: string
}

const apiEndpoints: ApiEndpoint[] = [
  {
    method: 'GET',
    path: '/api/weather',
    description: 'Get current weather data for a specific location',
    parameters: [
      { name: 'lat', type: 'number', required: true, description: 'Latitude coordinate' },
      { name: 'lon', type: 'number', required: true, description: 'Longitude coordinate' },
      { name: 'units', type: 'string', required: false, description: 'Units (metric/imperial)' }
    ],
    response: {
      status: 200,
      description: 'Weather data retrieved successfully',
      example: `{
  "temperature": 22.5,
  "humidity": 65,
  "description": "Partly cloudy",
  "wind_speed": 12.3
}`
    },
    rateLimit: '100 requests/hour'
  },
  {
    method: 'GET',
    path: '/api/alerts',
    description: 'Get disaster alerts for a specific region',
    parameters: [
      { name: 'region', type: 'string', required: true, description: 'Region or country code' },
      { name: 'type', type: 'string', required: false, description: 'Alert type filter' },
      { name: 'severity', type: 'string', required: false, description: 'Severity level filter' }
    ],
    response: {
      status: 200,
      description: 'Alerts retrieved successfully',
      example: `[
  {
    "id": "alert_001",
    "type": "flood",
    "severity": "high",
    "location": "Coastal Region",
    "description": "Flash flood warning in effect"
  }
]`
    },
    rateLimit: '50 requests/hour'
  },
  {
    method: 'POST',
    path: '/api/risk-assessment',
    description: 'Generate risk assessment for a location',
    parameters: [
      { name: 'latitude', type: 'number', required: true, description: 'Location latitude' },
      { name: 'longitude', type: 'number', required: true, description: 'Location longitude' },
      { name: 'assessment_type', type: 'string', required: false, description: 'Type of assessment' }
    ],
    response: {
      status: 200,
      description: 'Risk assessment generated successfully',
      example: `{
  "overall_risk": 65,
  "flood_risk": 80,
  "earthquake_risk": 45,
  "recommendations": ["Evacuate immediately", "Secure loose items"]
}`
    },
    rateLimit: '25 requests/hour'
  },
  {
    method: 'GET',
    path: '/api/resources',
    description: 'Find emergency resources near a location',
    parameters: [
      { name: 'lat', type: 'number', required: true, description: 'Latitude coordinate' },
      { name: 'lon', type: 'number', required: true, description: 'Longitude coordinate' },
      { name: 'radius', type: 'number', required: false, description: 'Search radius in km' },
      { name: 'type', type: 'string', required: false, description: 'Resource type filter' }
    ],
    response: {
      status: 200,
      description: 'Resources found successfully',
      example: `[
  {
    "name": "City Emergency Shelter",
    "type": "shelter",
    "distance": 2.1,
    "coordinates": [40.7128, -74.0060]
  }
]`
    },
    rateLimit: '75 requests/hour'
  }
]

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(identifier)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800'
      case 'POST': return 'bg-blue-100 text-blue-800'
      case 'PUT': return 'bg-yellow-100 text-yellow-800'
      case 'DELETE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Code className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600">Integrate disaster resilience data into your applications</p>
        </div>
      </div>

      {/* API Overview */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Globe className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">API Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-semibold text-blue-900">Global Coverage</div>
            <div className="text-sm text-blue-700">Worldwide disaster and climate data</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-green-900">Real-time Updates</div>
            <div className="text-sm text-green-700">Live data from multiple sources</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">🔒</div>
            <div className="font-semibold text-purple-900">Secure Access</div>
            <div className="text-sm text-purple-700">API key authentication required</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-3">Base URL</h3>
          <div className="flex items-center space-x-3">
            <code className="bg-gray-800 text-green-400 px-3 py-2 rounded text-sm font-mono">
              https://haven-api.vercel.app/api
            </code>
            <button
              onClick={() => copyToClipboard('https://haven-api.vercel.app/api', 'base-url')}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Copy className="h-4 w-4" />
              <span>{copiedCode === 'base-url' ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Authentication */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Key className="h-6 w-6 text-yellow-600" />
          <h2 className="text-xl font-semibold text-gray-900">Authentication</h2>
        </div>
        
        <p className="text-gray-700 mb-4">
          All API requests require authentication using an API key. Include your API key in the request headers:
        </p>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 text-sm">Request Header</span>
            <button
              onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
              className="flex items-center space-x-2 px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition-colors"
            >
              <Copy className="h-3 w-3" />
              <span>{copiedCode === 'auth-header' ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <code className="text-green-400 text-sm font-mono">
            Authorization: Bearer YOUR_API_KEY
          </code>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">Getting Your API Key</h4>
          <ol className="text-sm text-yellow-800 space-y-1">
            <li>1. Sign up for a developer account</li>
            <li>2. Navigate to your dashboard</li>
            <li>3. Generate a new API key</li>
            <li>4. Keep your key secure and never share it publicly</li>
          </ol>
        </div>
      </div>

      {/* Rate Limiting */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Zap className="h-6 w-6 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-900">Rate Limiting</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Free Tier</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 1,000 requests per month</li>
              <li>• 100 requests per hour</li>
              <li>• Basic data access</li>
              <li>• Community support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Pro Tier</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 100,000 requests per month</li>
              <li>• 1,000 requests per hour</li>
              <li>• Premium data sources</li>
              <li>• Priority support</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-800">
            <span className="text-sm">💡</span>
            <span className="text-sm">Rate limits are applied per API key. Exceeding limits will result in 429 (Too Many Requests) responses.</span>
          </div>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Database className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-semibold text-gray-900">Available Endpoints</h2>
        </div>
        
        <div className="space-y-4">
          {apiEndpoints.map((endpoint) => (
            <div 
              key={endpoint.path}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setSelectedEndpoint(endpoint)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                </div>
                <span className="text-xs text-gray-500">{endpoint.rateLimit}</span>
              </div>
              <p className="text-gray-600 text-sm">{endpoint.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Endpoint Details */}
      {selectedEndpoint && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getMethodColor(selectedEndpoint.method)}`}>
                {selectedEndpoint.method}
              </span>
              <code className="text-lg font-mono text-gray-900">{selectedEndpoint.path}</code>
            </div>
            <button
              onClick={() => setSelectedEndpoint(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{selectedEndpoint.description}</p>
            </div>

            {/* Parameters */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Parameters</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Required</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedEndpoint.parameters.map((param, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm font-mono text-gray-900">{param.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{param.type}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">
                          <span className={`px-2 py-1 rounded text-xs ${
                            param.required ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {param.required ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Response */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Response</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    selectedEndpoint.response.status === 200 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedEndpoint.response.status}
                  </span>
                  <span className="text-sm text-gray-600">{selectedEndpoint.response.description}</span>
                </div>
                
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 text-sm">Response Example</span>
                    <button
                      onClick={() => copyToClipboard(selectedEndpoint.response.example, 'response-example')}
                      className="flex items-center space-x-2 px-2 py-1 bg-gray-700 text-white rounded text-xs hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                      <span>{copiedCode === 'response-example' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{selectedEndpoint.response.example}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Rate Limit */}
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Rate Limit</h3>
              <p className="text-gray-700">{selectedEndpoint.rateLimit}</p>
            </div>
          </div>
        </div>
      )}

      {/* SDKs and Libraries */}
      <div className="card mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Download className="h-6 w-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-900">SDKs & Libraries</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">JavaScript/Node.js</h3>
            <div className="space-y-2">
              <code className="block text-sm bg-gray-100 p-2 rounded">npm install haven-api-client</code>
              <p className="text-sm text-gray-600">Official Node.js client library</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Python</h3>
            <div className="space-y-2">
              <code className="block text-sm bg-gray-100 p-2 rounded">pip install haven-api</code>
              <p className="text-sm text-gray-600">Official Python client library</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">React Hook</h3>
            <div className="space-y-2">
              <code className="block text-sm bg-gray-100 p-2 rounded">npm install use-haven-api</code>
              <p className="text-sm text-gray-600">React hook for easy integration</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Postman Collection</h3>
            <div className="space-y-2">
              <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">Download Collection</a>
              <p className="text-sm text-gray-600">Ready-to-use API testing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error Codes */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Error Codes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status Code</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Error</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-gray-900">400</td>
                <td className="px-4 py-2 text-sm text-gray-900">Bad Request</td>
                <td className="px-4 py-2 text-sm text-gray-600">Invalid parameters or request format</td>
                <td className="px-4 py-2 text-sm text-gray-600">Check parameter types and values</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-gray-900">401</td>
                <td className="px-4 py-2 text-sm text-gray-900">Unauthorized</td>
                <td className="px-4 py-2 text-sm text-gray-600">Missing or invalid API key</td>
                <td className="px-4 py-2 text-sm text-gray-600">Verify API key in headers</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-gray-900">429</td>
                <td className="px-4 py-2 text-sm text-gray-900">Too Many Requests</td>
                <td className="px-4 py-2 text-sm text-gray-600">Rate limit exceeded</td>
                <td className="px-4 py-2 text-sm text-gray-600">Wait or upgrade plan</td>
              </tr>
              <tr>
                <td className="px-4 py-2 text-sm font-mono text-gray-900">500</td>
                <td className="px-4 py-2 text-sm text-gray-900">Internal Server Error</td>
                <td className="px-4 py-2 text-sm text-gray-600">Server-side error</td>
                <td className="px-4 py-2 text-sm text-gray-600">Retry later or contact support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Support */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Support & Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Documentation</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">Getting Started Guide</a></li>
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">API Reference</a></li>
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">Code Examples</a></li>
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">Best Practices</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">Developer Forum</a></li>
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">GitHub Repository</a></li>
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">Discord Community</a></li>
              <li>• <a href="#" className="text-blue-600 hover:text-blue-700">Stack Overflow</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
