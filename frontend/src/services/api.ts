const API_BASE_URL = 'http://localhost:8000'

// Get token from localStorage
const getToken = () => localStorage.getItem('token')

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })
  
  if (!response.ok) {
    if (response.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
      throw new Error('Oturum süreniz doldu')
    }
    
    const error = await response.json().catch(() => ({ detail: 'Bir hata oluştu' }))
    throw new Error(error.detail || 'Bir hata oluştu')
  }
  
  return response.json()
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest<{ access_token: string; token_type: string }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    )
    return response
  },
  
  getMe: async () => {
    return apiRequest<{ email: string; name: string; role: string }>('/api/auth/me')
  },
}

// Employees API
export const employeesAPI = {
  getAll: async () => {
    return apiRequest<any[]>('/api/employees')
  },
  
  getDetail: async (id: number) => {
    return apiRequest<any>(`/api/employees/${id}`)
  },
}

// Leaves API
export const leavesAPI = {
  getAll: async (status?: string) => {
    const query = status ? `?status=${status}` : ''
    return apiRequest<any[]>(`/api/leaves${query}`)
  },
  
  create: async (data: any) => {
    return apiRequest<any>('/api/leaves', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  update: async (id: number, data: any) => {
    return apiRequest<any>(`/api/leaves/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
  
  getBalance: async (employeeId: number) => {
    return apiRequest<any>(`/api/leaves/balances/${employeeId}`)
  },
}

// Expenses API
export const expensesAPI = {
  getAll: async (status?: string) => {
    const query = status ? `?status=${status}` : ''
    return apiRequest<any[]>(`/api/expenses${query}`)
  },
  
  create: async (data: any) => {
    return apiRequest<any>('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
  
  update: async (id: number, data: any) => {
    return apiRequest<any>(`/api/expenses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  },
  
  getSummary: async (employeeId: number) => {
    return apiRequest<any>(`/api/expenses/summary/${employeeId}`)
  },
}

