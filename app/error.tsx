'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-destructive/10 rounded-lg">
            <AlertCircle size={48} className="text-destructive" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
