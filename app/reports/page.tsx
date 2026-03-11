'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { useAuthStore } from '@/store/useAuthStore'
import { useReportStore } from '@/store/useReportStore'
import { ReportTable } from '@/components/reports/report-table'
import { SearchFilterPanel } from '@/components/reports/search-filter-panel'
import { EmptyState } from '@/components/empty-state'
import { FileText, Plus } from 'lucide-react'
import { FilterParams } from '@/lib/types'

export default function ReportsPage() {
  const { isManager } = useAuthStore()
  const { getReports, filterReports, deleteReport } = useReportStore()
  const [filters, setFilters] = useState<FilterParams>({})

  const allReports = getReports()
  const filteredReports = filterReports(filters)

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isManager() ? 'All Reports' : 'Team Reports'}
            </h1>
            <p className="text-muted-foreground">
              {isManager()
                ? 'View and manage reports from all employees'
                : 'Browse reports from your team members'}
            </p>
          </div>
          {!isManager() && (
            <Link href="/reports/create">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-semibold">
                <Plus size={20} />
                Create Report
              </button>
            </Link>
          )}
        </div>

        {/* Search and Filters */}
        <SearchFilterPanel onFilter={setFilters} />

        {/* Reports Table */}
        {filteredReports.length > 0 ? (
          <ReportTable reports={filteredReports} onDelete={deleteReport} />
        ) : (
          <EmptyState
            title={allReports.length === 0 ? 'No reports yet' : 'No matching reports'}
            description={
              allReports.length === 0
                ? 'Reports will appear here once they are created'
                : 'Try adjusting your filters to find the reports you are looking for'
            }
            icon={<FileText size={48} />}
          />
        )}
      </div>
    </MainLayout>
  )
}
