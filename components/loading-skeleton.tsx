export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="h-24 bg-muted animate-pulse rounded-lg"
        />
      ))}
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 p-6 bg-card rounded-lg">
      <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
      <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
      <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
    </div>
  )
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-10 bg-muted animate-pulse rounded" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 bg-muted animate-pulse rounded" />
      ))}
    </div>
  )
}
