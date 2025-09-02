'use client'

import { useState } from 'react'
import { Calculator, Leaf, TrendingUp, Target, BarChart3, Zap, Home, Car, Utensils } from 'lucide-react'

interface CarbonFootprintData {
  transportation: number
  home: number
  food: number
  waste: number
  total: number
}

interface EnergyAuditData {
  lighting: number
  heating: number
  appliances: number
  insulation: number
  total: number
}

export default function ClimateToolsPage() {
  const [activeTool, setActiveTool] = useState<'carbon' | 'energy' | 'water' | 'waste'>('carbon')
  const [carbonData, setCarbonData] = useState<CarbonFootprintData>({
    transportation: 0,
    home: 0,
    food: 0,
    waste: 0,
    total: 0
  })
  const [energyData, setEnergyAuditData] = useState<EnergyAuditData>({
    lighting: 0,
    heating: 0,
    appliances: 0,
    insulation: 0,
    total: 0
  })

  const calculateCarbonFootprint = () => {
    const total = carbonData.transportation + carbonData.home + carbonData.food + carbonData.waste
    setCarbonData(prev => ({ ...prev, total }))
  }

  const calculateEnergyAudit = () => {
    const total = energyData.lighting + energyData.heating + energyData.appliances + energyData.insulation
    setEnergyAuditData(prev => ({ ...prev, total }))
  }

  const getCarbonRating = (total: number) => {
    if (total < 10) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (total < 20) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' }
    if (total < 30) return { level: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-50' }
  }

  const getEnergyRating = (total: number) => {
    if (total < 50) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-50' }
    if (total < 100) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-50' }
    if (total < 150) return { level: 'Average', color: 'text-yellow-600', bgColor: 'bg-yellow-50' }
    return { level: 'Poor', color: 'text-red-600', bgColor: 'bg-red-50' }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <Calculator className="h-8 w-8 text-green-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Climate Tools</h1>
          <p className="text-gray-600">Interactive calculators and assessment tools for climate action</p>
        </div>
      </div>

      {/* Tool Selection */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTool('carbon')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTool === 'carbon'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Carbon Footprint
        </button>
        <button
          onClick={() => setActiveTool('energy')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTool === 'energy'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Energy Audit
        </button>
        <button
          onClick={() => setActiveTool('water')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTool === 'water'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Water Calculator
        </button>
        <button
          onClick={() => setActiveTool('waste')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTool === 'waste'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Waste Assessment
        </button>
      </div>

      {/* Carbon Footprint Calculator */}
      {activeTool === 'carbon' && (
        <div className="space-y-8">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Leaf className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Carbon Footprint Calculator</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Transportation */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span>Transportation</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Miles driven per year</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        transportation: parseFloat(e.target.value) * 0.4 
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Flights per year</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        transportation: prev.transportation + (parseFloat(e.target.value) * 2.5) 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Home Energy */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                  <Home className="h-5 w-5 text-purple-600" />
                  <span>Home Energy</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Monthly electricity bill ($)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        home: parseFloat(e.target.value) * 0.8 
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Monthly gas bill ($)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        home: prev.home + (parseFloat(e.target.value) * 0.6) 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Food */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-orange-600" />
                  <span>Food Consumption</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Meat consumption (servings/week)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        food: parseFloat(e.target.value) * 0.3 
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Dairy consumption (servings/week)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        food: prev.food + (parseFloat(e.target.value) * 0.1) 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Waste */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-red-600" />
                  <span>Waste Generation</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Waste bags per week</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        waste: parseFloat(e.target.value) * 0.2 
                      }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Recycling rate (%)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setCarbonData(prev => ({ 
                        ...prev, 
                        waste: prev.waste * (1 - parseFloat(e.target.value) / 100) 
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={calculateCarbonFootprint}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Calculate Carbon Footprint
              </button>
            </div>

            {carbonData.total > 0 && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {carbonData.total.toFixed(1)} tons CO₂/year
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${getCarbonRating(carbonData.total).bgColor} ${getCarbonRating(carbonData.total).color}`}>
                    {getCarbonRating(carbonData.total).level} Rating
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{carbonData.transportation.toFixed(1)}</div>
                    <div className="text-sm text-blue-700">Transportation</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{carbonData.home.toFixed(1)}</div>
                    <div className="text-sm text-purple-700">Home Energy</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{carbonData.food.toFixed(1)}</div>
                    <div className="text-sm text-orange-700">Food</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{carbonData.waste.toFixed(1)}</div>
                    <div className="text-sm text-red-700">Waste</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reduction Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Transportation</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Use public transportation or carpool</li>
                  <li>• Switch to electric or hybrid vehicles</li>
                  <li>• Walk or bike for short trips</li>
                  <li>• Maintain proper tire pressure</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Home Energy</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Switch to LED lighting</li>
                  <li>• Improve home insulation</li>
                  <li>• Use energy-efficient appliances</li>
                  <li>• Install solar panels</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Food Choices</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Reduce meat consumption</li>
                  <li>• Choose local and seasonal produce</li>
                  <li>• Minimize food waste</li>
                  <li>• Support sustainable farming</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Waste Management</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Increase recycling and composting</li>
                  <li>• Choose products with less packaging</li>
                  <li>• Repair instead of replace</li>
                  <li>• Buy second-hand items</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Energy Audit Tool */}
      {activeTool === 'energy' && (
        <div className="space-y-8">
          <div className="card">
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-900">Home Energy Audit</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Lighting */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Lighting Efficiency</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">LED bulbs usage (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setEnergyAuditData(prev => ({ 
                        ...prev, 
                        lighting: 100 - parseFloat(e.target.value) 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Heating */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Heating & Cooling</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Thermostat efficiency (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                      onChange={(e) => setEnergyAuditData(prev => ({ 
                        ...prev, 
                        heating: (11 - parseFloat(e.target.value)) * 10 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Appliances */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Appliance Efficiency</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Energy Star appliances (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                      onChange={(e) => setEnergyAuditData(prev => ({ 
                        ...prev, 
                        appliances: 100 - parseFloat(e.target.value) 
                      }))}
                    />
                  </div>
                </div>
              </div>

              {/* Insulation */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Insulation Quality</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Insulation rating (1-10)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="5"
                      onChange={(e) => setEnergyAuditData(prev => ({ 
                        ...prev, 
                        insulation: (11 - parseFloat(e.target.value)) * 10 
                      }))}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={calculateEnergyAudit}
                className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Calculate Energy Score
              </button>
            </div>

            {energyData.total > 0 && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {energyData.total.toFixed(0)}/400
                  </div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium ${getEnergyRating(energyData.total).bgColor} ${getEnergyRating(energyData.total).color}`}>
                    {getEnergyRating(energyData.total).level} Rating
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{energyData.lighting.toFixed(0)}</div>
                    <div className="text-sm text-blue-700">Lighting</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{energyData.heating.toFixed(0)}</div>
                    <div className="text-sm text-red-700">Heating</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg font-bold text-purple-600">{energyData.appliances.toFixed(0)}</div>
                    <div className="text-sm text-purple-700">Appliances</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-600">{energyData.insulation.toFixed(0)}</div>
                    <div className="text-sm text-orange-700">Insulation</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Water Calculator */}
      {activeTool === 'water' && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Water Usage Calculator</h2>
          </div>
          <p className="text-gray-600 mb-6">Calculate your daily water consumption and find ways to conserve.</p>
          
          <div className="text-center py-12">
            <div className="text-4xl mb-4">💧</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">Water usage calculator will be available in the next update</p>
          </div>
        </div>
      )}

      {/* Waste Assessment */}
      {activeTool === 'waste' && (
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Waste Assessment Tool</h2>
          </div>
          <p className="text-gray-600 mb-6">Assess your waste generation and find reduction strategies.</p>
          
          <div className="text-center py-12">
            <div className="text-4xl mb-4">♻️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">Waste assessment tool will be available in the next update</p>
          </div>
        </div>
      )}

      {/* Climate Impact Overview */}
      <div className="card mt-8">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">Climate Impact Overview</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">🌍</div>
            <div className="font-semibold text-green-900">Global Average</div>
            <div className="text-sm text-green-700">4.8 tons CO₂/person/year</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-blue-900">Paris Agreement Target</div>
            <div className="text-sm text-blue-700">2.0 tons CO₂/person/year by 2050</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-semibold text-purple-900">Renewable Energy</div>
            <div className="text-sm text-purple-700">26% of global electricity</div>
          </div>
        </div>
      </div>
    </div>
  )
}
