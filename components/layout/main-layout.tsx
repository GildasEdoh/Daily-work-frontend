'use client'

import { ReactNode, useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useReportStore } from '@/store/useReportStore'
import { useRouter } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Navbar } from './navbar'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated, initializeAuth } = useAuthStore()
  const { initializeReports } = useReportStore()
  const router = useRouter()

  useEffect(() => {
    initializeAuth()
    initializeReports()
  }, [initializeAuth, initializeReports])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen flex-col md:flex-row bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-0 ml-0 mt-16 md:mt-0">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
