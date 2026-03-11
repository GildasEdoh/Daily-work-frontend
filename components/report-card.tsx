'use client'

import Link from 'next/link'
import { Report, User } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'

const moodEmojis: Record<string, string> = {
  great: '😄',
  good: '😊',
  neutral: '😐',
  bad: '😞',
}

const moodColors: Record<string, string> = {
  great: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  good: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  neutral: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  bad: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

interface ReportCardProps {
  report: Report
  employee?: User
}

export function ReportCard({ report, employee }: ReportCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">
              {employee ? employee.name : 'Your Report'} - {format(new Date(report.date), 'MMM d, yyyy')}
            </CardTitle>
          </div>
          <Badge className={moodColors[report.mood]}>
            {moodEmojis[report.mood]} {report.mood}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-sm mb-2">Accomplishments</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {report.accomplishments}
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-2">Challenges</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {report.challenges}
          </p>
        </div>
        <div className="pt-2">
          <Link href={`/reports/${report.id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
              <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
