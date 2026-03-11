'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { mockUsers } from '@/lib/mock-data/users'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      if (login(email)) {
        router.push('/dashboard')
      } else {
        alert('Invalid email. Please try again with a valid user email.')
      }
      setIsLoading(false)
    }, 500)
  }

  const handleQuickLogin = (userEmail: string) => {
    setIsLoading(true)
    setTimeout(() => {
      login(userEmail)
      router.push('/dashboard')
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <LogIn className="text-primary-foreground" size={28} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Daily Reports</h1>
          <p className="text-muted-foreground">Employee report tracking system</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-lg p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Demo Users</span>
            </div>
          </div>

          {/* Quick Login Buttons */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-3">
              Click to login as:
            </p>
            {mockUsers.map(user => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleQuickLogin(user.email)}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg border border-border bg-secondary text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.role}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="bg-secondary rounded-lg p-4 text-center">
          <p className="text-xs text-muted-foreground">
            This is a demo application. No actual authentication required.
          </p>
        </div>
      </div>
    </div>
  )
}
