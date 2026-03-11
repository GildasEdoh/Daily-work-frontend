export type UserRole = 'employee' | 'manager' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department: string
  avatar?: string
}

export interface Report {
  id: string
  employeeId: string
  date: string
  tasks: string[]
  accomplishments: string
  challenges: string
  nextDay: string
  mood: 'great' | 'good' | 'neutral' | 'bad'
  createdAt: string
  updatedAt: string
}

export interface Analytics {
  totalReports: number
  reportsThisMonth: number
  averageMood: number
  completionRate: number
  reportsTimeline: Array<{
    date: string
    count: number
  }>
  moodDistribution: Array<{
    mood: string
    count: number
  }>
  departmentStats: Array<{
    department: string
    reports: number
    average_mood: number
  }>
}
