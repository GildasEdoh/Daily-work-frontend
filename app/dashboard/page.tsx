'use client'

import Link from 'next/link'
import { MainLayout } from '@/components/layout/main-layout'
import { useAuthStore } from '@/store/useAuthStore'
import { useReportStore } from '@/store/useReportStore'
import { ReportCard } from '@/components/reports/report-card'
import { EmptyState } from '@/components/empty-state'
import { FileText, Plus, TrendingUp, Clock, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const { currentUser, isManager } = useAuthStore()
  const { getReports, deleteReport, getAnalytics } = useReportStore()
  const analytics = getAnalytics()

  const userReports = getReports(currentUser?.id)
  const recentReports = userReports.slice(0, 3)
  const allReports = getReports()

  if (!currentUser) {
    return null
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {currentUser.name}!
          </h1>
          <p className="text-muted-foreground">
            {isManager()
              ? 'View team reports and analytics'
              : 'Track your daily work and submit reports'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                {isManager() ? 'Total Reports' : 'Your Reports'}
              </h3>
              <FileText size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {isManager() ? analytics.totalReports : userReports.length}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {isManager()
                ? 'From all employees'
                : `${analytics.totalReports} total in system`}
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Avg Duration
              </h3>
              <Clock size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {analytics.averageDuration}h
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              per report
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Active Projects
              </h3>
              <TrendingUp size={20} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">
              {analytics.activeProjects}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              in progress
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        {!isManager() && (
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle size={24} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Submit Your Daily Report
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                Keep your team updated on your progress. Reports help track productivity and identify blockers.
              </p>
              <Link href="/reports/create">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:opacity-90 transition-opacity font-medium">
                  <Plus size={18} />
                  Create New Report
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Recent Reports */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {isManager() ? 'Latest Reports' : 'Your Recent Reports'}
            </h2>
            <Link href={isManager() ? '/reports' : '/my-reports'}>
              <button className="text-primary hover:underline text-sm font-medium">
                View All →
              </button>
            </Link>
          </div>

          {(isManager() ? allReports : recentReports).length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {(isManager() ? allReports.slice(0, 2) : recentReports).map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onDelete={deleteReport}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No reports yet"
              description={
                isManager()
                  ? 'Reports submitted by your team will appear here'
                  : 'Start by creating your first daily report'
              }
              icon={<FileText size={48} />}
              action={
                !isManager() && (
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
      </div>
    </MainLayout>
  )
}
