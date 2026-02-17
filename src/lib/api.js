import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5112/api/v1'

/**
 * Axios instance pre-configured for the VA Studio backend.
 * Public-first: no auth token required for core endpoints.
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

// ── Templates API (Public) ────────────────────────────────

export const templatesApi = {
  list: () => api.get('/templates/'),
  get: (id) => api.get(`/templates/${id}`),
  categories: () => api.get('/templates/categories'),
  preview: (id) => api.get(`/templates/${id}/preview`),
}

// ── Chat API (Public) ─────────────────────────────────────

export const chatApi = {
  createSession: () =>
    api.post('/chat/session'),

  sendMessage: (message, sessionId = null, templateContext = null) =>
    api.post('/chat/message', {
      message,
      session_id: sessionId,
      template_context: templateContext,
    }),

  getSession: (sessionId) =>
    api.get(`/chat/session/${sessionId}`),

  getHistory: (sessionId) =>
    api.get(`/chat/session/${sessionId}/history`),

  submitTemplateRequest: (data) =>
    api.post('/chat/template-request', data),

  getRequestStatus: (requestId) =>
    api.get(`/chat/template-request/${requestId}`),
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

// ── AI / Chat API (Authenticated) ─────────────────────────

export const aiApi = {
  chat: (message, agent = 'default', conversationId = null) =>
    api.post('/ai/chat', { message, agent, conversation_id: conversationId }),

  agents: () => api.get('/ai/agents'),

  status: () => api.get('/ai/status'),

  deleteConversation: (id) => api.delete(`/ai/conversations/${id}`),
}

export default api
