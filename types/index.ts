// Location and Geography Types
export interface Location {
  latitude: number
  longitude: number
  city?: string
  country?: string
  state?: string
  address?: string
}

export interface GeographicBounds {
  north: number
  south: number
  east: number
  west: number
}

// Weather and Climate Types
export interface WeatherData {
  temperature: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: number
  visibility: number
  uvIndex: number
  description: string
  icon: string
  timestamp: string
}

export interface WeatherForecast {
  date: string
  high: number
  low: number
  description: string
  icon: string
  precipitation: number
  windSpeed: number
}

export interface ClimateData {
  averageTemperature: number
  precipitation: number
  humidity: number
  extremeEvents: ClimateEvent[]
  trends: ClimateTrend[]
}

export interface ClimateTrend {
  metric: string
  change: number
  period: string
  confidence: number
}

// Disaster and Risk Types
export interface DisasterAlert {
  id: string
  type: DisasterType
  severity: AlertSeverity
  title: string
  description: string
  location: Location
  affectedArea: GeographicBounds
  startTime: string
  endTime?: string
  instructions: string[]
  source: string
  isActive: boolean
  urgency: 'immediate' | 'expected' | 'future'
}

export enum DisasterType {
  EARTHQUAKE = 'earthquake',
  FLOOD = 'flood',
  HURRICANE = 'hurricane',
  TORNADO = 'tornado',
  WILDFIRE = 'wildfire',
  HEATWAVE = 'heatwave',
  BLIZZARD = 'blizzard',
  TSUNAMI = 'tsunami',
  VOLCANIC = 'volcanic',
  DROUGHT = 'drought',
  SEVERE_WEATHER = 'severe_weather'
}

export enum AlertSeverity {
  LOW = 'low',
  MODERATE = 'moderate',
  HIGH = 'high',
  EXTREME = 'extreme'
}

export interface RiskAssessment {
  location: Location
  overallRisk: number
  risks: DisasterRisk[]
  recommendations: string[]
  lastUpdated: string
}

export interface DisasterRisk {
  type: DisasterType
  probability: number
  impact: number
  riskScore: number
  factors: string[]
  mitigationStrategies: string[]
}

// Emergency Response Types
export interface EmergencyPlan {
  id: string
  disasterType: DisasterType
  phases: EmergencyPhase[]
  location?: Location
  lastUpdated: string
}

export interface EmergencyPhase {
  phase: 'before' | 'during' | 'after'
  title: string
  actions: EmergencyAction[]
  timeline: string
  priority: number
}

export interface EmergencyAction {
  id: string
  description: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high' | 'critical'
  category: string
  estimatedTime: string
  requiredResources: string[]
}

// Resource and Infrastructure Types
export interface EmergencyResource {
  id: string
  name: string
  type: ResourceType
  location: Location
  contact: ContactInfo
  capacity?: number
  availability: ResourceAvailability
  services: string[]
  operatingHours: OperatingHours
  accessibility: AccessibilityInfo
}

export enum ResourceType {
  SHELTER = 'shelter',
  HOSPITAL = 'hospital',
  FIRE_STATION = 'fire_station',
  POLICE_STATION = 'police_station',
  EVACUATION_CENTER = 'evacuation_center',
  SUPPLY_DEPOT = 'supply_depot',
  COMMUNICATION_HUB = 'communication_hub'
}

export interface ContactInfo {
  phone: string
  email?: string
  website?: string
  emergencyNumber?: string
}

export interface ResourceAvailability {
  isOpen: boolean
  capacity: number
  currentOccupancy: number
  lastUpdated: string
}

export interface OperatingHours {
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
  isAlwaysOpen: boolean
}

export interface AccessibilityInfo {
  wheelchairAccessible: boolean
  hasRamp: boolean
  hasElevator: boolean
  signLanguageSupport: boolean
  brailleSupport: boolean
}

// Climate Resilience Types
export interface ResilienceRecommendation {
  id: string
  title: string
  description: string
  category: ResilienceCategory
  difficulty: 'easy' | 'moderate' | 'hard'
  impact: 'low' | 'medium' | 'high'
  timeframe: string
  cost: CostRange
  steps: string[]
  benefits: string[]
  resources: ResourceLink[]
}

export enum ResilienceCategory {
  ENERGY_EFFICIENCY = 'energy_efficiency',
  WATER_CONSERVATION = 'water_conservation',
  SUSTAINABLE_TRANSPORT = 'sustainable_transport',
  WASTE_REDUCTION = 'waste_reduction',
  GREEN_INFRASTRUCTURE = 'green_infrastructure',
  COMMUNITY_RESILIENCE = 'community_resilience',
  EMERGENCY_PREPAREDNESS = 'emergency_preparedness'
}

export interface CostRange {
  min: number
  max: number
  currency: string
}

export interface ResourceLink {
  title: string
  url: string
  type: 'guide' | 'video' | 'tool' | 'article'
}

// Community and Communication Types
export interface CommunityPost {
  id: string
  author: UserProfile
  title: string
  content: string
  category: string
  location?: Location
  timestamp: string
  likes: number
  comments: Comment[]
  tags: string[]
  attachments: Attachment[]
  isEmergency: boolean
}

export interface UserProfile {
  id: string
  name: string
  avatar?: string
  location?: Location
  expertise: string[]
  reputation: number
  isVerified: boolean
}

export interface Comment {
  id: string
  author: UserProfile
  content: string
  timestamp: string
  likes: number
  replies: Comment[]
}

export interface Attachment {
  id: string
  name: string
  url: string
  type: 'image' | 'document' | 'video' | 'audio'
  size: number
}

// Climate Event Types
export interface ClimateEvent {
  id: string
  type: string
  date: string
  location: Location
  severity: number
  description: string
  impact: string
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
  timestamp: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// User Preferences and Settings
export interface UserPreferences {
  location: Location
  language: string
  units: 'metric' | 'imperial'
  notifications: NotificationSettings
  alertTypes: DisasterType[]
  theme: 'light' | 'dark' | 'auto'
}

export interface NotificationSettings {
  email: boolean
  sms: boolean
  push: boolean
  emergency: boolean
  severity: AlertSeverity[]
}

// Training and Education Types
export interface TrainingModule {
  id: string
  title: string
  description: string
  category: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  lessons: Lesson[]
  quiz?: Quiz
  certificate?: boolean
}

export interface Lesson {
  id: string
  title: string
  content: string
  type: 'text' | 'video' | 'interactive' | 'simulation'
  duration: number
  resources: ResourceLink[]
}

export interface Quiz {
  id: string
  questions: Question[]
  passingScore: number
  timeLimit?: number
}

export interface Question {
  id: string
  question: string
  type: 'multiple_choice' | 'true_false' | 'short_answer'
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
}
