'use client'

import { useRouter } from 'next/navigation'
import { MainLayout } from '@/components/layout/main-layout'
import { ReportForm } from '@/components/reports/report-form'
import { useReportStore } from '@/store/useReportStore'
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function CreateReportPage() {
  const router = useRouter()
  const { createReport } = useReportStore()
  const { currentUser } = useAuthStore()

  const handleSubmit = async (data: any) => {
    try {
      createReport({
        ...data,
        authorId: currentUser?.id || '',
        authorName: currentUser?.name || '',
      })
      toast.success('Report created successfully!')
      router.push('/my-reports')
    } catch (error) {
      toast.error('Failed to create report')
      console.error(error)
    }
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Daily Report</h1>
          <p className="text-muted-foreground">
            Share what you worked on, tasks completed, and any challenges faced today.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
          <ReportForm onSubmit={handleSubmit} />
        </div>
      </div>
    </MainLayout>
  )
}
