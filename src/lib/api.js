import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5112/api/v1'

/**
 * Axios instance pre-configured for the VA Studio backend.
 * Automatically attaches JWT tokens and handles refresh.
 */
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses — attempt token refresh once
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(`${API_URL}/auth/refresh`, null, {
          params: { refresh_token: refreshToken },
        })

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)

        api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
        processQueue(null, data.access_token)

        originalRequest.headers.Authorization = `Bearer ${data.access_token}`
        return api(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// ── Auth API ──────────────────────────────────────────────

export const authApi = {
  login: (email, password) =>
    api.post('/auth/login', null, { params: { email, password } }),

  register: (data) =>
    api.post('/auth/register', {
      email: data.email,
      password: data.password,
      full_name: data.name,
      username: data.email.split('@')[0],
    }),

  me: () => api.get('/auth/me'),

  logout: () => api.post('/auth/logout'),

  forgotPassword: (email) =>
    api.post('/auth/forgot-password', null, { params: { email } }),

  resetPassword: (token, newPassword) =>
    api.post('/auth/reset-password', { token, new_password: newPassword }),

  refresh: (refreshToken) =>
    api.post('/auth/refresh', null, { params: { refresh_token: refreshToken } }),
}

// ── Health API ────────────────────────────────────────────

export const healthApi = {
  check: () => axios.get(`${API_URL.replace('/api/v1', '')}/health`),
  ready: () => axios.get(`${API_URL.replace('/api/v1', '')}/health/ready`),
}

// ── Projects API ──────────────────────────────────────────

export const projectsApi = {
  list: () => api.get('/projects/'),
  get: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects/', data),
  update: (id, data) => api.patch(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
  getPublic: () => api.get('/projects/public'),
}

// ── AI / Chat API ─────────────────────────────────────────

export const aiApi = {
  chat: (message, agent = 'default', conversationId = null) =>
    api.post('/ai/chat', { message, agent, conversation_id: conversationId }),

  agents: () => api.get('/ai/agents'),

  status: () => api.get('/ai/status'),

  deleteConversation: (id) => api.delete(`/ai/conversations/${id}`),
}

// ── Templates API (maps to available frontend templates) ──

export const templatesApi = {
  list: () => api.get('/templates/'),
}

export default api
