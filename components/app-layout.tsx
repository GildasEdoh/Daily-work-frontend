'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'
import { Header } from './header'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/'

  if (isAuthPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
