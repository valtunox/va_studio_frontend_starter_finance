import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5112/api/v1'

/**
 * Axios instance pre-configured for the VA Studio backend.
 */
const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

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
