'use client'

import Link from 'next/link'
import { DailyReport } from '@/lib/types'
import { Trash2, Edit2 } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'

interface ReportTableProps {
  reports: DailyReport[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function ReportTable({ reports, onEdit, onDelete }: ReportTableProps) {
  const { currentUser, isManager } = useAuthStore()

  if (reports.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No reports found</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto bg-card rounded-lg border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
              Title
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
              Author
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
              Project
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
              Date
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
              Duration
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => {
            const canEdit = isManager() || currentUser?.id === report.authorId
            return (
              <tr
                key={report.id}
                className="border-b border-border hover:bg-secondary transition-colors"
              >
                <td className="px-6 py-4">
                  <Link
                    href={`/reports/${report.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {report.title}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">{report.authorName}</td>
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-foreground">
                    {report.project}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(report.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  {report.workDuration}h
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {canEdit && (
                      <>
                        {onEdit && (
                          <button
                            onClick={() => onEdit(report.id)}
                            className="p-2 hover:bg-secondary rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} className="text-muted-foreground" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this report?')) {
                                onDelete(report.id)
                              }
                            }}
                            className="p-2 hover:bg-secondary rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
