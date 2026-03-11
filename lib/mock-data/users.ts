import { User } from '../types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@company.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'EMPLOYEE',
    department: 'Design',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'EMPLOYEE',
    department: 'Engineering',
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    role: 'EMPLOYEE',
    department: 'Marketing',
  },
  {
    id: '5',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@company.com',
    role: 'MANAGER',
    department: 'Engineering',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    role: 'MANAGER',
    department: 'Operations',
  },
]

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id)
}

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email)
}
