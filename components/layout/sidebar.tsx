'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const pathname = usePathname()
  const { currentUser, logout, isManager } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(path)
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'My Reports', path: '/my-reports', icon: FileText },
    ...(isManager ? [{ label: 'Analytics', path: '/analytics', icon: BarChart3 }] : []),
  ]

  const handleLogout = () => {
    logout()
    window.location.href = '/login'
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg hover:bg-secondary"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out ${
          isOpen ? 'left-0' : '-left-64 md:left-0'
        } z-40 flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Daily Tracking</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(({ label, path, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive(path)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info and Logout */}
        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div className="px-2">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {currentUser?.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser?.role}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
