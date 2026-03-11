'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { useReportStore } from '@/lib/store/report-store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { X, Plus } from 'lucide-react'

interface ReportFormProps {
  initialDate?: string
}

export function ReportForm({ initialDate }: ReportFormProps) {
  const router = useRouter()
  const { user } = useAuthStore()
  const { createReport } = useReportStore()

  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0])
  const [tasks, setTasks] = useState<string[]>([''])
  const [accomplishments, setAccomplishments] = useState('')
  const [challenges, setChallenges] = useState('')
  const [nextDay, setNextDay] = useState('')
  const [mood, setMood] = useState<'great' | 'good' | 'neutral' | 'bad'>('good')
  const [isLoading, setIsLoading] = useState(false)

  const addTask = () => setTasks([...tasks, ''])
  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index))
  }
  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks]
    newTasks[index] = value
    setTasks(newTasks)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('You must be logged in')
      return
    }

    if (!date || !accomplishments || !challenges || !nextDay) {
      toast.error('Please fill in all required fields')
      return
    }

    const validTasks = tasks.filter((t) => t.trim())
    if (validTasks.length === 0) {
      toast.error('Please add at least one task')
      return
    }

    setIsLoading(true)
    try {
      createReport({
        employeeId: user.id,
        date,
        tasks: validTasks,
        accomplishments,
        challenges,
        nextDay,
        mood,
      })
      toast.success('Report created successfully')
      router.push('/my-reports')
    } catch (error) {
      toast.error('Failed to create report')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Daily Report</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mood</label>
              <Select value={mood} onValueChange={(v: any) => setMood(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="great">Great 😄</SelectItem>
                  <SelectItem value="good">Good 😊</SelectItem>
                  <SelectItem value="neutral">Neutral 😐</SelectItem>
                  <SelectItem value="bad">Bad 😞</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium">Tasks Completed</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTask}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Enter a task"
                    value={task}
                    onChange={(e) => updateTask(index, e.target.value)}
                  />
                  {tasks.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTask(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Accomplishments</label>
            <Textarea
              placeholder="What did you accomplish today?"
              value={accomplishments}
              onChange={(e) => setAccomplishments(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Challenges</label>
            <Textarea
              placeholder="What challenges did you face?"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Next Day Plan</label>
            <Textarea
              placeholder="What are your plans for tomorrow?"
              value={nextDay}
              onChange={(e) => setNextDay(e.target.value)}
              rows={3}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Creating...' : 'Create Report'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
