'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { useAuthStore } from '@/store/useAuthStore'
import { useReportStore } from '@/store/useReportStore'
import { AnalyticsSummary } from '@/components/analytics/analytics-summary'
import { ReportsPerDayChart, ReportsPerEmployeeChart, HoursPerProjectChart } from '@/components/analytics/charts'
import { EmptyState } from '@/components/empty-state'
import { BarChart3 } from 'lucide-react'

export default function AnalyticsPage() {
  const router = useRouter()
  const { isManager } = useAuthStore()
  const { getAnalytics } = useReportStore()
  const analytics = getAnalytics()

  useEffect(() => {
    if (!isManager()) {
      router.push('/dashboard')
    }
  }, [isManager, router])

  if (!isManager()) {
    return null
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into team reports and project progress
          </p>
        </div>

        {/* Summary Stats */}
        <AnalyticsSummary data={analytics} />

        {/* Charts */}
        {analytics.totalReports > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReportsPerDayChart data={analytics.reportsPerDay} />
            <ReportsPerEmployeeChart data={analytics.reportsPerEmployee} />
            <div className="lg:col-span-2">
              <HoursPerProjectChart data={analytics.hoursPerProject} />
            </div>
          </div>
        ) : (
          <EmptyState
            title="No analytics data yet"
            description="Create some reports to see analytics data here"
            icon={<BarChart3 size={48} />}
          />
        )}
      </div>
    </MainLayout>
  )
}
