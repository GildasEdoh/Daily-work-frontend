import { create } from 'zustand'
import { DailyReport, FilterParams, AnalyticsData } from '@/lib/types'
import { mockReports } from '@/lib/mock-data/reports'

interface ReportState {
  reports: DailyReport[]
  filteredReports: DailyReport[]
  getReports: (userId?: string) => DailyReport[]
  getReportById: (id: string) => DailyReport | undefined
  createReport: (report: Omit<DailyReport, 'id' | 'createdAt' | 'updatedAt'>) => DailyReport
  updateReport: (id: string, updates: Partial<DailyReport>) => boolean
  deleteReport: (id: string) => boolean
  filterReports: (filters: FilterParams, userId?: string) => DailyReport[]
  getAnalytics: () => AnalyticsData
  initializeReports: () => void
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: [],
  filteredReports: [],

  getReports: (userId?: string) => {
    const reports = get().reports
    if (userId) {
      return reports.filter(r => r.authorId === userId)
    }
    return reports
  },

  getReportById: (id: string) => {
    return get().reports.find(r => r.id === id)
  },

  createReport: (reportData) => {
    const newReport: DailyReport = {
      ...reportData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set(state => ({
      reports: [newReport, ...state.reports],
    }))
    return newReport
  },

  updateReport: (id: string, updates) => {
    const reports = get().reports
    const index = reports.findIndex(r => r.id === id)
    if (index === -1) return false

    const updatedReport = {
      ...reports[index],
      ...updates,
      updatedAt: new Date(),
    }
    const newReports = [...reports]
    newReports[index] = updatedReport
    set({ reports: newReports })
    return true
  },

  deleteReport: (id: string) => {
    const reports = get().reports
    const index = reports.findIndex(r => r.id === id)
    if (index === -1) return false

    set({
      reports: reports.filter((_, i) => i !== index),
    })
    return true
  },

  filterReports: (filters: FilterParams, userId?: string) => {
    let reports = get().getReports(userId)

    if (filters.search) {
      const search = filters.search.toLowerCase()
      reports = reports.filter(
        r =>
          r.title.toLowerCase().includes(search) ||
          r.description.toLowerCase().includes(search) ||
          r.authorName.toLowerCase().includes(search)
      )
    }

    if (filters.project) {
      reports = reports.filter(r => r.project === filters.project)
    }

    if (filters.author) {
      reports = reports.filter(r => r.authorId === filters.author)
    }

    if (filters.dateRange) {
      reports = reports.filter(r => {
        const reportDate = new Date(r.createdAt)
        return (
          reportDate >= filters.dateRange!.from &&
          reportDate <= filters.dateRange!.to
        )
      })
    }

    // Sort reports
    const sortBy = filters.sortBy || 'date'
    const sortOrder = filters.sortOrder || 'desc'
    reports.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case 'duration':
          aValue = a.workDuration
          bValue = b.workDuration
          break
        case 'project':
          aValue = a.project.localeCompare(b.project)
          bValue = 0
          break
        case 'date':
        default:
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
      }

      if (typeof aValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }

      return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
    })

    return reports
  },

  getAnalytics: () => {
    const reports = get().reports

    if (reports.length === 0) {
      return {
        totalReports: 0,
        averageDuration: 0,
        activeProjects: 0,
        reportsPerDay: [],
        reportsPerEmployee: [],
        hoursPerProject: [],
      }
    }

    // Total reports
    const totalReports = reports.length

    // Average duration
    const averageDuration =
      reports.reduce((sum, r) => sum + r.workDuration, 0) / reports.length

    // Active projects
    const activeProjects = new Set(reports.map(r => r.project)).size

    // Reports per day (last 7 days)
    const reportsPerDay: { [key: string]: number } = {}
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      reportsPerDay[dateStr] = 0
    }

    reports.forEach(r => {
      const dateStr = new Date(r.createdAt).toISOString().split('T')[0]
      if (dateStr in reportsPerDay) {
        reportsPerDay[dateStr]++
      }
    })

    // Reports per employee
    const reportsPerEmployee: { [key: string]: number } = {}
    reports.forEach(r => {
      reportsPerEmployee[r.authorName] = (reportsPerEmployee[r.authorName] || 0) + 1
    })

    // Hours per project
    const hoursPerProject: { [key: string]: number } = {}
    reports.forEach(r => {
      hoursPerProject[r.project] = (hoursPerProject[r.project] || 0) + r.workDuration
    })

    return {
      totalReports,
      averageDuration: Math.round(averageDuration * 10) / 10,
      activeProjects,
      reportsPerDay: Object.entries(reportsPerDay).map(([date, count]) => ({
        date,
        count,
      })),
      reportsPerEmployee: Object.entries(reportsPerEmployee)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
      hoursPerProject: Object.entries(hoursPerProject)
        .map(([project, hours]) => ({ project, hours }))
        .sort((a, b) => b.hours - a.hours),
    }
  },

  initializeReports: () => {
    set({ reports: mockReports })
  },
}))
