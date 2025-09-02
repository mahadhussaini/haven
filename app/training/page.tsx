'use client'

import { useState } from 'react'
import { BookOpen, Award, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface TrainingModule {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  icon: string
  completed: boolean
  progress: number
}

const trainingModules: TrainingModule[] = [
  {
    id: 'evacuation-drill',
    title: 'Emergency Evacuation Drill',
    description: 'Practice evacuation procedures for different disaster scenarios',
    duration: '15 mins',
    difficulty: 'Beginner',
    category: 'Emergency Response',
    icon: '🏃',
    completed: false,
    progress: 0
  },
  {
    id: 'first-aid-basics',
    title: 'First Aid Basics',
    description: 'Learn essential first aid skills for emergency situations',
    duration: '30 mins',
    difficulty: 'Beginner',
    category: 'Medical',
    icon: '🩹',
    completed: false,
    progress: 0
  },
  {
    id: 'fire-safety',
    title: 'Fire Safety & Prevention',
    description: 'Master fire safety protocols and prevention techniques',
    duration: '25 mins',
    difficulty: 'Beginner',
    category: 'Safety',
    icon: '🔥',
    completed: false,
    progress: 0
  },
  {
    id: 'communication-protocols',
    title: 'Emergency Communication',
    description: 'Learn effective communication during disasters',
    duration: '20 mins',
    difficulty: 'Intermediate',
    category: 'Communication',
    icon: '📻',
    completed: false,
    progress: 0
  },
  {
    id: 'shelter-in-place',
    title: 'Shelter-in-Place Procedures',
    description: 'Practice staying safe when evacuation is not possible',
    duration: '20 mins',
    difficulty: 'Intermediate',
    category: 'Safety',
    icon: '🏠',
    completed: false,
    progress: 0
  },
  {
    id: 'search-rescue',
    title: 'Basic Search & Rescue',
    description: 'Learn fundamental search and rescue techniques',
    duration: '45 mins',
    difficulty: 'Advanced',
    category: 'Emergency Response',
    icon: '🔍',
    completed: false,
    progress: 0
  }
]

export default function TrainingPage() {
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null)
  const [activeTab, setActiveTab] = useState<'modules' | 'progress' | 'certificates'>('modules')
  const [modules, setModules] = useState<TrainingModule[]>(trainingModules)

  const startTraining = (module: TrainingModule) => {
    setSelectedModule(module)
  }

  const completeModule = (moduleId: string) => {
    setModules(prev => prev.map(m => 
      m.id === moduleId 
        ? { ...m, completed: true, progress: 100 }
        : m
    ))
    setSelectedModule(null)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50'
      case 'Advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'Emergency Response': 'bg-red-50 text-red-700',
      'Medical': 'bg-blue-50 text-blue-700',
      'Safety': 'bg-orange-50 text-orange-700',
      'Communication': 'bg-purple-50 text-purple-700'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700'
  }

  const completedCount = modules.filter(m => m.completed).length
  const totalModules = modules.length
  const progressPercentage = Math.round((completedCount / totalModules) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <BookOpen className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training & Drills</h1>
          <p className="text-gray-600">Master emergency preparedness through interactive training modules</p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="card mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-yellow-600" />
            <span className="text-sm text-gray-600">{completedCount}/{totalModules} completed</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Overall Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <div className="text-sm text-green-700">Completed</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalModules - completedCount}</div>
            <div className="text-sm text-blue-700">Remaining</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{Math.round(progressPercentage)}%</div>
            <div className="text-sm text-purple-700">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">3</div>
            <div className="text-sm text-orange-700">Certificates</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'modules'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Training Modules
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'progress'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Progress Tracking
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'certificates'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Certificates
        </button>
      </div>

      {activeTab === 'modules' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div key={module.id} className="card hover:shadow-lg transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{module.icon}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                    {module.completed && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {module.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(module.category)}`}>
                    {module.category}
                  </span>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{module.duration}</span>
                  </div>
                </div>

                {module.progress > 0 && !module.completed && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => startTraining(module)}
                  disabled={module.completed}
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    module.completed
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {module.completed ? 'Completed' : 'Start Training'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Progress</h3>
            <div className="space-y-4">
              {modules.map((module) => (
                <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{module.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{module.title}</h4>
                      <p className="text-sm text-gray-600">{module.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{module.progress}%</div>
                      <div className="text-xs text-gray-500">{module.duration}</div>
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          module.completed ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${module.progress}%` }}
                      ></div>
                    </div>
                    {module.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievement Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">{completedCount}</div>
                <div className="text-sm text-green-700">Modules Completed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / totalModules)}
                </div>
                <div className="text-sm text-blue-700">Average Progress</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round((completedCount / totalModules) * 100)}%
                </div>
                <div className="text-sm text-purple-700">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.filter(m => m.completed).map((module) => (
                <div key={module.id} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">🏆</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h4>
                  <p className="text-sm text-gray-600 mb-4">Certificate of Completion</p>
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>Completed: {new Date().toLocaleDateString()}</span>
                    <span>Duration: {module.duration}</span>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors">
                    Download Certificate
                  </button>
                </div>
              ))}
            </div>
            
            {completedCount === 0 && (
              <div className="text-center py-12">
                <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">No Certificates Yet</h4>
                <p className="text-gray-600">Complete training modules to earn certificates</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Training Modal */}
      {selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedModule.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedModule.title}</h3>
                    <p className="text-sm text-gray-600">{selectedModule.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700">{selectedModule.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-medium">{selectedModule.duration}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Difficulty</div>
                    <div className="font-medium">{selectedModule.difficulty}</div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Training Overview</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Interactive scenarios and simulations</li>
                    <li>• Step-by-step instructions</li>
                    <li>• Practice exercises and drills</li>
                    <li>• Final assessment and certification</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => completeModule(selectedModule.id)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Start Training
                </button>
                <button
                  onClick={() => setSelectedModule(null)}
                  className="py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
