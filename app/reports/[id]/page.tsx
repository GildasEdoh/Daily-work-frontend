'use client'

import { useRouter, useParams } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { useReportStore } from '@/store/useReportStore'
import { useAuthStore } from '@/store/useAuthStore'
import { ReportForm } from '@/components/reports/report-form'
import { EmptyState } from '@/components/empty-state'
import { toast } from 'sonner'
import Link from 'next/link'
import { ChevronLeft, Edit2, Trash2, Calendar, Clock, User, FileText } from 'lucide-react'
import { useState } from 'react'

export default function ReportDetailPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { getReportById, updateReport, deleteReport } = useReportStore()
  const { currentUser, isManager } = useAuthStore()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const report = getReportById(id)
  const canEdit = isManager() || currentUser?.id === report?.authorId

  if (!report) {
    return (
      <MainLayout>
        <EmptyState
          title="Report not found"
          description="The report you are looking for does not exist or has been deleted."
          icon={<FileText size={48} />}
          action={
            <Link href="/reports">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                Back to Reports
              </button>
            </Link>
          }
        />
      </MainLayout>
    )
  }

  const handleUpdate = async (data: any) => {
    setIsLoading(true)
    try {
      updateReport(id, {
        ...data,
        updatedAt: new Date(),
      })
      toast.success('Report updated successfully!')
      setIsEditing(false)
    } catch (error) {
      toast.error('Failed to update report')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      deleteReport(id)
      toast.success('Report deleted successfully!')
      router.push('/reports')
    }
  }

  if (isEditing && canEdit) {
    return (
      <MainLayout>
        <div className="space-y-6">
          <Link href={`/reports/${id}`}>
            <button className="flex items-center gap-2 text-primary hover:underline mb-4 font-medium">
              <ChevronLeft size={18} />
              Cancel Edit
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Edit Report</h1>
          <div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
            <ReportForm
              initialData={report}
              isEditing={true}
              onSubmit={handleUpdate}
              isLoading={isLoading}
            />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <Link href="/reports">
            <button className="flex items-center gap-2 text-primary hover:underline mb-4 font-medium">
              <ChevronLeft size={18} />
              Back to Reports
            </button>
          </Link>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{report.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  {report.authorName}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(report.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {report.workDuration}h
                </div>
                <div className="px-2 py-1 bg-secondary rounded-full text-xs font-medium">
                  {report.project}
                </div>
              </div>
            </div>
            {canEdit && (
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Edit report"
                >
                  <Edit2 size={20} className="text-primary" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  title="Delete report"
                >
                  <Trash2 size={20} className="text-destructive" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Description</h2>
              <p className="text-foreground whitespace-pre-wrap">{report.description}</p>
            </div>

            {/* Tasks Completed */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Tasks Completed ({report.tasksCompleted.length})
              </h2>
              <ul className="space-y-2">
                {report.tasksCompleted.map((task, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            {report.challenges.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Challenges ({report.challenges.length})
                </h2>
                <ul className="space-y-2">
                  {report.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <span className="text-destructive font-bold mt-0.5">!</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Report Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Work Duration</p>
                  <p className="text-2xl font-bold text-foreground">{report.workDuration}h</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Project</p>
                  <p className="text-foreground font-medium">{report.project}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Author</p>
                  <p className="text-foreground font-medium">{report.authorName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Created</p>
                  <p className="text-foreground font-medium">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {report.updatedAt && report.updatedAt !== report.createdAt && (
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Updated</p>
                    <p className="text-foreground font-medium">
                      {new Date(report.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
