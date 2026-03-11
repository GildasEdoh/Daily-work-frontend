'use client'

import { AnalyticsData } from '@/lib/types'
import {
  FileText,
  Clock,
  Layers,
} from 'lucide-react'

interface AnalyticsSummaryProps {
  data: AnalyticsData
}

export function AnalyticsSummary({ data }: AnalyticsSummaryProps) {
  const stats = [
    {
      label: 'Total Reports',
      value: data.totalReports,
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      label: 'Average Duration',
      value: `${data.averageDuration}h`,
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      label: 'Active Projects',
      value: data.activeProjects,
      icon: Layers,
      color: 'bg-purple-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <Icon size={24} className={stat.color.replace('bg-', 'text-')} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
