import { create } from 'zustand'
import { Report } from '../types'
import { mockReports } from '../mock-data'

interface ReportState {
  reports: Report[]
  filteredReports: Report[]
  searchQuery: string
  selectedMood: string | null
  dateFilter: { start: string; end: string } | null

  // Queries
  getReportById: (id: string) => Report | undefined
  getReportsByEmployeeId: (employeeId: string) => Report[]
  setSearchQuery: (query: string) => void
  setSelectedMood: (mood: string | null) => void
  setDateFilter: (start: string, end: string) => void
  clearFilters: () => void

  // Mutations
  createReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateReport: (id: string, updates: Partial<Report>) => void
  deleteReport: (id: string) => void
}

export const useReportStore = create<ReportState>((set, get) => ({
  reports: mockReports,
  filteredReports: mockReports,
  searchQuery: '',
  selectedMood: null,
  dateFilter: null,

  getReportById: (id: string) => {
    return get().reports.find((r) => r.id === id)
  },

  getReportsByEmployeeId: (employeeId: string) => {
    return get().reports.filter((r) => r.employeeId === employeeId)
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
    applyFilters(get(), set)
  },

  setSelectedMood: (mood: string | null) => {
    set({ selectedMood: mood })
    applyFilters(get(), set)
  },

  setDateFilter: (start: string, end: string) => {
    set({ dateFilter: { start, end } })
    applyFilters(get(), set)
  },

  clearFilters: () => {
    set({ searchQuery: '', selectedMood: null, dateFilter: null, filteredReports: get().reports })
  },

  createReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newReport: Report = {
      ...report,
      id: `report-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((state) => ({
      reports: [...state.reports, newReport],
      filteredReports: [...state.filteredReports, newReport],
    }))
  },

  updateReport: (id: string, updates: Partial<Report>) => {
    set((state) => ({
      reports: state.reports.map((r) =>
        r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
      ),
    }))
    applyFilters(get(), set)
  },

  deleteReport: (id: string) => {
    set((state) => ({
      reports: state.reports.filter((r) => r.id !== id),
    }))
    applyFilters(get(), set)
  },
}))

function applyFilters(
  state: ReturnType<typeof useReportStore.getState>,
  set: any
) {
  let filtered = state.reports

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase()
    filtered = filtered.filter((r) =>
      r.accomplishments.toLowerCase().includes(query) ||
      r.challenges.toLowerCase().includes(query) ||
      r.tasks.some((t) => t.toLowerCase().includes(query))
    )
  }

  if (state.selectedMood) {
    filtered = filtered.filter((r) => r.mood === state.selectedMood)
  }

  if (state.dateFilter) {
    filtered = filtered.filter(
      (r) => r.date >= state.dateFilter!.start && r.date <= state.dateFilter!.end
    )
  }

  set({ filteredReports: filtered })
}
