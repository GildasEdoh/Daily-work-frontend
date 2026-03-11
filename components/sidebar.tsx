'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/store/auth-store'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/reports', label: 'All Reports', icon: FileText },
  { href: '/my-reports', label: 'My Reports', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, managerOnly: true },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  const filteredItems = navItems.filter(
    (item) => !item.managerOnly || user?.role !== 'employee'
  )

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">Reports</h1>
      </div>

      <nav className="flex-1 overflow-auto p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isActive && 'bg-sidebar-primary text-sidebar-primary-foreground'
                    )}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
