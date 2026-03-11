'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { DailyReport } from '@/lib/types'
import { useAuthStore } from '@/store/useAuthStore'
import { X, Plus } from 'lucide-react'

const reportSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  tasksCompleted: z.array(z.string().min(1, 'Task cannot be empty')).min(1, 'Add at least one task'),
  challenges: z.array(z.string().min(1, 'Challenge cannot be empty')).min(0),
  project: z.string().min(1, 'Select a project'),
  workDuration: z.number().min(0.5, 'Minimum 0.5 hours').max(24, 'Maximum 24 hours'),
})

type ReportFormData = z.infer<typeof reportSchema>

interface ReportFormProps {
  initialData?: DailyReport
  isEditing?: boolean
  onSubmit: (data: any) => void
  isLoading?: boolean
}

const projects = [
  'Dashboard Redesign',
  'API Integration',
  'Design System',
  'Backend Infrastructure',
  'DevOps Infrastructure',
  'Documentation',
  'Q2 Marketing',
  'Customer Insights',
  'Reports System',
  'Other',
]

export function ReportForm({
  initialData,
  isEditing = false,
  onSubmit,
  isLoading = false,
}: ReportFormProps) {
  const { currentUser } = useAuthStore()
  const [tasksInput, setTasksInput] = useState('')
  const [challengesInput, setChallengesInput] = useState('')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      tasksCompleted: initialData?.tasksCompleted || [],
      challenges: initialData?.challenges || [],
      project: initialData?.project || '',
      workDuration: initialData?.workDuration || 8,
    },
  })

  const tasks = watch('tasksCompleted')
  const challenges = watch('challenges')

  const addTask = () => {
    if (tasksInput.trim()) {
      setValue('tasksCompleted', [...tasks, tasksInput.trim()])
      setTasksInput('')
    }
  }

  const removeTask = (index: number) => {
    setValue(
      'tasksCompleted',
      tasks.filter((_, i) => i !== index)
    )
  }

  const addChallenge = () => {
    if (challengesInput.trim()) {
      setValue('challenges', [...challenges, challengesInput.trim()])
      setChallengesInput('')
    }
  }

  const removeChallenge = (index: number) => {
    setValue(
      'challenges',
      challenges.filter((_, i) => i !== index)
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Report Title
        </label>
        <input
          type="text"
          {...register('title')}
          placeholder="Enter report title"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.title && (
          <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          placeholder="Describe what you worked on today"
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        {errors.description && (
          <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Project Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Project
        </label>
        <select
          {...register('project')}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a project</option>
          {projects.map(project => (
            <option key={project} value={project}>
              {project}
            </option>
          ))}
        </select>
        {errors.project && (
          <p className="text-sm text-destructive mt-1">{errors.project.message}</p>
        )}
      </div>

      {/* Work Duration */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Work Duration (hours)
        </label>
        <input
          type="number"
          step="0.5"
          {...register('workDuration', { valueAsNumber: true })}
          placeholder="8"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.workDuration && (
          <p className="text-sm text-destructive mt-1">{errors.workDuration.message}</p>
        )}
      </div>

      {/* Tasks Completed */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Tasks Completed
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tasksInput}
            onChange={e => setTasksInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addTask()
              }
            }}
            placeholder="Add a task"
            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={addTask}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {tasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between bg-secondary p-3 rounded-lg">
              <span className="text-foreground text-sm">{task}</span>
              <button
                type="button"
                onClick={() => removeTask(index)}
                className="text-destructive hover:opacity-80"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        {errors.tasksCompleted && (
          <p className="text-sm text-destructive mt-2">{errors.tasksCompleted.message}</p>
        )}
      </div>

      {/* Challenges */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Challenges (Optional)
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={challengesInput}
            onChange={e => setChallengesInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addChallenge()
              }
            }}
            placeholder="Add a challenge"
            className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={addChallenge}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {challenges.map((challenge, index) => (
            <div key={index} className="flex items-center justify-between bg-secondary p-3 rounded-lg">
              <span className="text-foreground text-sm">{challenge}</span>
              <button
                type="button"
                onClick={() => removeChallenge(index)}
                className="text-destructive hover:opacity-80"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Saving...' : isEditing ? 'Update Report' : 'Create Report'}
      </button>
    </form>
  )
}
