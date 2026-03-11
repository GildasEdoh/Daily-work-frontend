'use client'

import { useReportStore } from '@/lib/store/report-store'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

export function ReportFilters() {
  const { searchQuery, selectedMood, dateFilter, setSearchQuery, setSelectedMood, setDateFilter, clearFilters } = useReportStore()

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <Input
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mood</label>
          <Select
            value={selectedMood || ''}
            onValueChange={(v) => setSelectedMood(v || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All moods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All moods</SelectItem>
              <SelectItem value="great">Great 😄</SelectItem>
              <SelectItem value="good">Good 😊</SelectItem>
              <SelectItem value="neutral">Neutral 😐</SelectItem>
              <SelectItem value="bad">Bad 😞</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">From</label>
          <Input
            type="date"
            value={dateFilter?.start || ''}
            onChange={(e) => {
              if (e.target.value && dateFilter?.end) {
                setDateFilter(e.target.value, dateFilter.end)
              }
            }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">To</label>
          <Input
            type="date"
            value={dateFilter?.end || ''}
            onChange={(e) => {
              if (e.target.value && dateFilter?.start) {
                setDateFilter(dateFilter.start, e.target.value)
              }
            }}
          />
        </div>
      </div>

      {(searchQuery || selectedMood || dateFilter) && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear filters
        </Button>
      )}
    </div>
  )
}
