import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-muted rounded-lg">
            <AlertCircle size={48} className="text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          The page you are looking for does not exist. It may have been moved or deleted.
        </p>
        <Link href="/dashboard">
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
            Go back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  )
}
