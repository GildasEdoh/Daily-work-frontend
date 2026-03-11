import { create } from 'zustand'
import { User } from '../types'
import { mockUsers } from '../mock-data'

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    const user = mockUsers.find((u) => u.email === email)
    if (user) {
      set({ user, isLoading: false })
    } else {
      set({ isLoading: false })
      throw new Error('Invalid credentials')
    }
  },

  logout: () => {
    set({ user: null })
  },
}))
