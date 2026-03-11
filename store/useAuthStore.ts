import { create } from 'zustand'
import { User } from '@/lib/types'
import { mockUsers, getUserByEmail } from '@/lib/mock-data/users'

interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
  login: (email: string) => boolean
  logout: () => void
  getCurrentUser: () => User | null
  isManager: () => boolean
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  currentUser: null,
  isAuthenticated: false,

  login: (email: string) => {
    const user = getUserByEmail(email)
    if (user) {
      set({ currentUser: user, isAuthenticated: true })
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
      return true
    }
    return false
  },

  logout: () => {
    set({ currentUser: null, isAuthenticated: false })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser')
    }
  },

  getCurrentUser: () => {
    return get().currentUser
  },

  isManager: () => {
    return get().currentUser?.role === 'MANAGER'
  },

  initializeAuth: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('currentUser')
      if (stored) {
        try {
          const user = JSON.parse(stored)
          set({ currentUser: user, isAuthenticated: true })
        } catch (error) {
          console.error('Failed to initialize auth:', error)
        }
      }
    }
  },
}))
