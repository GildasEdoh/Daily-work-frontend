export type UserRole = 'EMPLOYEE' | 'MANAGER'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
}

export interface DailyReport {
  id: string
  title: string
  description: string
  tasksCompleted: string[]
  challenges: string[]
  project: string
  workDuration: number // in hours
  images: string[] // image URLs
  authorId: string
  authorName: string
  createdAt: Date
  updatedAt: Date
}

export interface FilterParams {
  search?: string
  project?: string
  author?: string
  dateRange?: {
    from: Date
    to: Date
  }
  sortBy?: 'date' | 'duration' | 'project'
  sortOrder?: 'asc' | 'desc'
}

export interface AnalyticsData {
  totalReports: number
  averageDuration: number
  activeProjects: number
  reportsPerDay: Array<{ date: string; count: number }>
  reportsPerEmployee: Array<{ name: string; count: number }>
  hoursPerProject: Array<{ project: string; hours: number }>
}
