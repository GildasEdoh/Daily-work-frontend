'use client'

import Link from 'next/link'
import { DailyReport } from '@/lib/types'
import { Trash2, Edit2, ChevronRight } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

interface ReportCardProps {
  report: DailyReport
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ReportCard({ report, onEdit, onDelete }: ReportCardProps) {
  const { currentUser, isManager } = useAuthStore()
  const canEdit = isManager() || currentUser?.id === report.authorId

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link href={`/reports/${report.id}`}>
            <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
              {report.title}
            </h3>
          </Link>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <span>{report.authorName}</span>
            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
            <span className="px-2 py-1 bg-secondary rounded text-xs font-medium">
              {report.project}
            </span>
          </div>
        </div>
        {canEdit && (
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(report.id)}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Edit report"
              >
                <Edit2 size={18} className="text-muted-foreground" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this report?')) {
                    onDelete(report.id)
                  }
                }}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                title="Delete report"
              >
                <Trash2 size={18} className="text-destructive" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-foreground mb-4 line-clamp-2">{report.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-t border-b border-border">
        <div>
          <p className="text-xs text-muted-foreground">Work Duration</p>
          <p className="text-sm font-semibold text-foreground">{report.workDuration}h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Tasks Completed</p>
          <p className="text-sm font-semibold text-foreground">{report.tasksCompleted.length}</p>
        </div>
      </div>

      {/* Tasks */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
          Tasks Completed
        </p>
        <ul className="text-sm space-y-1">
          {report.tasksCompleted.slice(0, 3).map((task, i) => (
            <li key={i} className="text-foreground flex items-start gap-2">
              <span className="mt-1">•</span>
              <span className="line-clamp-1">{task}</span>
            </li>
          ))}
          {report.tasksCompleted.length > 3 && (
            <li className="text-muted-foreground text-xs">
              +{report.tasksCompleted.length - 3} more
            </li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <Link href={`/reports/${report.id}`}>
        <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-primary hover:bg-secondary rounded-lg transition-colors group">
          View Details
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  )
}
