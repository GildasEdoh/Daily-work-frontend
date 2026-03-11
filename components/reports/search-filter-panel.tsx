'use client'

import { useState } from 'react'
import { FilterParams } from '@/lib/types'
import { Search, X } from 'lucide-react'
import { mockReports } from '@/lib/mock-data/reports'

interface SearchFilterPanelProps {
  onFilter: (filters: FilterParams) => void
  showAuthorFilter?: boolean
  showProjectFilter?: boolean
}

const projects = Array.from(new Set(mockReports.map(r => r.project))).sort()
const authorsMap = new Map<string, { id: string; name: string }>()
mockReports.forEach(r => {
  authorsMap.set(r.authorId, { id: r.authorId, name: r.authorName })
})
const authors = Array.from(authorsMap.values()).sort((a, b) => a.name.localeCompare(b.name))

export function SearchFilterPanel({
  onFilter,
  showAuthorFilter = true,
  showProjectFilter = true,
}: SearchFilterPanelProps) {
  const [search, setSearch] = useState('')
  const [project, setProject] = useState('')
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')

  const handleFilterChange = () => {
    const filters: FilterParams = {
      search: search || undefined,
      project: project || undefined,
      author: author || undefined,
      sortBy: (sortBy as any) || undefined,
      sortOrder: (sortOrder as any) || undefined,
    }
    onFilter(filters)
  }

  const handleReset = () => {
    setSearch('')
    setProject('')
    setAuthor('')
    setSortBy('date')
    setSortOrder('desc')
    onFilter({})
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Search
          </label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value)
                handleFilterChange()
              }}
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Project Filter */}
        {showProjectFilter && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project
            </label>
            <select
              value={project}
              onChange={e => {
                setProject(e.target.value)
                handleFilterChange()
              }}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Projects</option>
              {projects.map(p => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Author Filter */}
        {showAuthorFilter && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Author
            </label>
            <select
              value={author}
              onChange={e => {
                setAuthor(e.target.value)
                handleFilterChange()
              }}
              className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Authors</option>
              {authors.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value)
              handleFilterChange()
            }}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="date">Date</option>
            <option value="duration">Duration</option>
            <option value="project">Project</option>
          </select>
        </div>
      </div>

      {/* Sort Order and Reset */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            handleFilterChange()
          }}
          className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:opacity-80 transition-opacity text-sm font-medium"
        >
          {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>

        {(search || project || author || sortBy !== 'date' || sortOrder !== 'desc') && (
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:opacity-80 transition-opacity text-sm font-medium flex items-center gap-2"
          >
            <X size={16} />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  )
}
