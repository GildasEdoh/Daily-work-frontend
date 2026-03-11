'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { useEffect } from 'react'
import { AppLayout } from './app-layout'

interface ProtectedPageProps {
  children: React.ReactNode
  requiredRole?: 'employee' | 'manager' | 'admin'
}

export function ProtectedPage({ children, requiredRole }: ProtectedPageProps) {
  const router = useRouter()
  const { user } = useAuthStore()

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else if (requiredRole && user.role === 'employee' && requiredRole === 'manager') {
      router.push('/dashboard')
    }
  }, [user, router, requiredRole])

  if (!user) {
    return null
  }

  if (requiredRole && user.role === 'employee' && requiredRole === 'manager') {
    return null
  }

  return <AppLayout>{children}</AppLayout>
}
