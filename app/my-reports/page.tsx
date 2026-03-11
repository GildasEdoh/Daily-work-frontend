'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { useAuthStore } from '@/store/useAuthStore'
import { useReportStore } from '@/store/useReportStore'
import { ReportCard } from '@/components/reports/report-card'
import { SearchFilterPanel } from '@/components/reports/search-filter-panel'
import { EmptyState } from '@/components/empty-state'
import { FileText, Plus } from 'lucide-react'
import { FilterParams } from '@/lib/types'

export default function MyReportsPage() {
  const { currentUser } = useAuthStore()
  const { getReports, filterReports, deleteReport } = useReportStore()
  const [filters, setFilters] = useState<FilterParams>({})

  const userReports = getReports(currentUser?.id)
  const filteredReports = filterReports(filters, currentUser?.id)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Reports</h1>
            <p className="text-muted-foreground">
              View and manage your submitted daily reports
            </p>
          </div>
          <Link href="/reports/create">
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
              <Plus size={20} />
              Create New Report
            </button>
          </Link>
        </div>

        {/* Search and Filters */}
        <SearchFilterPanel
          onFilter={setFilters}
          showAuthorFilter={false}
        />

        {/* Reports Grid */}
        {filteredReports.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredReports.map(report => (
              <ReportCard
                key={report.id}
                report={report}
                onDelete={deleteReport}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={userReports.length === 0 ? 'No reports yet' : 'No matching reports'}
            description={
              userReports.length === 0
                ? 'Start by creating your first daily report to track your work'
                : 'Try adjusting your filters to find the reports you are looking for'
            }
            icon={<FileText size={48} />}
            action={
              userReports.length === 0 && (
                <Link href="/reports/create">
                  <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                    Create Your First Report
                  </button>
                </Link>
              )
            }
          />
        )}
      </div>
    </MainLayout>
  )
}
