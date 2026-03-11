'use client'

import { useAuthStore } from '@/lib/store/auth-store'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const { user } = useAuthStore()

  return (
    <header className="border-b border-border bg-card p-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <p className="font-semibold text-card-foreground">{user?.name}</p>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Avatar>
          <AvatarFallback>{user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
