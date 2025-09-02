'use client'

import { useState } from 'react'
import { useQuery } from 'react-query'
import { Shield, AlertTriangle, CheckCircle, Clock, Users, MapPin } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { aiApi } from '@/lib/api'
import type { EmergencyPlan, EmergencyPhase, EmergencyAction, DisasterType } from '@/types'

interface EmergencyPlanGeneratorProps {
  disasterType: DisasterType
  onPlanGenerated?: (plan: EmergencyPlan) => void
}

export function EmergencyPlanGenerator({ disasterType, onPlanGenerated }: EmergencyPlanGeneratorProps) {
  const { userLocation } = useAppStore()

  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set())

  const { data: emergencyPlan, isLoading, refetch } = useQuery(
    ['emergencyPlan', disasterType, userLocation],
    () => aiApi.generateEmergencyPlan(disasterType, userLocation!),
    {
      enabled: !!userLocation,
      onSuccess: (plan) => {
        onPlanGenerated?.(plan)
      }
    }
  )

  const toggleAction = (actionId: string) => {
    const newCompleted = new Set(completedActions)
    if (newCompleted.has(actionId)) {
      newCompleted.delete(actionId)
    } else {
      newCompleted.add(actionId)
    }
    setCompletedActions(newCompleted)
  }

  const getProgressForPhase = (phase: EmergencyPhase) => {
    const completed = phase.actions.filter(action => completedActions.has(action.id)).length
    return Math.round((completed / phase.actions.length) * 100)
  }

  if (!userLocation) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Location Required</h3>
          <p className="text-gray-600">Set your location to generate personalized emergency plans.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!emergencyPlan) {
    return (
      <div className="card">
        <div className="text-center py-8">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Plan Generation Failed</h3>
          <p className="text-gray-600 mb-4">Unable to generate emergency plan. Please try again.</p>
          <button
            onClick={() => refetch()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Plan Header */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {disasterType.charAt(0).toUpperCase() + disasterType.slice(1)} Emergency Plan
              </h2>
              <p className="text-gray-600">Personalized response plan for your location</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Generated</div>
            <div className="text-sm font-medium">{new Date(emergencyPlan.lastUpdated).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Emergency Phases */}
      {emergencyPlan.phases.map((phase: EmergencyPhase, phaseIndex: number) => (
        <EmergencyPhaseCard
          key={phaseIndex}
          phase={phase}
          progress={getProgressForPhase(phase)}
          completedActions={completedActions}
          onToggleAction={toggleAction}
        />
      ))}

      {/* Plan Summary */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {emergencyPlan.phases.reduce((total: number, phase: EmergencyPhase) => total + phase.actions.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Actions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {completedActions.size}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((completedActions.size / emergencyPlan.phases.reduce((total: number, phase: EmergencyPhase) => total + phase.actions.length, 0)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmergencyPhaseCard({
  phase,
  progress,
  completedActions,
  onToggleAction
}: {
  phase: EmergencyPhase
  progress: number
  completedActions: Set<string>
  onToggleAction: (actionId: string) => void
}) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getPhaseIcon = (phaseType: string) => {
    switch (phaseType) {
      case 'before': return <Shield className="h-5 w-5 text-blue-600" />
      case 'during': return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'after': return <CheckCircle className="h-5 w-5 text-green-600" />
      default: return <Shield className="h-5 w-5 text-gray-600" />
    }
  }

  const getPhaseColor = (phaseType: string) => {
    switch (phaseType) {
      case 'before': return 'blue'
      case 'during': return 'red'
      case 'after': return 'green'
      default: return 'gray'
    }
  }

  const phaseColor = getPhaseColor(phase.phase)

  return (
    <div className="card">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          {getPhaseIcon(phase.phase)}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{phase.title}</h3>
            <p className="text-sm text-gray-600">{phase.timeline}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{progress}% Complete</div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className={`bg-${phaseColor}-600 h-2 rounded-full transition-all duration-300`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="text-gray-400">
            {isExpanded ? '−' : '+'}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {phase.actions.map((action) => (
            <EmergencyActionItem
              key={action.id}
              action={action}
              isCompleted={completedActions.has(action.id)}
              onToggle={() => onToggleAction(action.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function EmergencyActionItem({
  action,
  isCompleted,
  onToggle
}: {
  action: EmergencyAction
  isCompleted: boolean
  onToggle: () => void
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'red'
      case 'high': return 'orange'
      case 'medium': return 'yellow'
      case 'low': return 'green'
      default: return 'gray'
    }
  }

  const priorityColor = getPriorityColor(action.priority)

  return (
    <div className={`border rounded-lg p-4 transition-all duration-200 ${
      isCompleted ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={onToggle}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            isCompleted
              ? 'bg-green-600 border-green-600 text-white'
              : 'border-gray-300 hover:border-primary-500'
          }`}
        >
          {isCompleted && <CheckCircle className="h-3 w-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h4 className={`font-medium ${isCompleted ? 'text-green-800' : 'text-gray-900'}`}>
              {action.description}
            </h4>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${priorityColor}-100 text-${priorityColor}-800 ml-2`}>
              {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)}
            </span>
          </div>

          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{action.estimatedTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{action.category}</span>
            </div>
          </div>

          {action.requiredResources && action.requiredResources.length > 0 && (
            <div className="mt-2">
              <div className="text-xs text-gray-500 mb-1">Required Resources:</div>
              <div className="flex flex-wrap gap-1">
                {action.requiredResources.map((resource, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
