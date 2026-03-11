'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { AnalyticsData } from '@/lib/types'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

interface ChartsProps {
  data: AnalyticsData
}

export function ReportsPerDayChart({ data }: { data: AnalyticsData['reportsPerDay'] }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Reports Per Day (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
          />
          <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ReportsPerEmployeeChart({ data }: { data: AnalyticsData['reportsPerEmployee'] }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Reports Per Employee</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
          />
          <YAxis tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
          <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export function HoursPerProjectChart({ data }: { data: AnalyticsData['hoursPerProject'] }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Hours Per Project</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="hours"
            nameKey="project"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-border)',
            }}
            labelStyle={{ color: 'var(--color-foreground)' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
