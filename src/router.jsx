import { createBrowserRouter, Navigate } from 'react-router-dom'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import TemplatePreviewPage from '@/pages/TemplatePreviewPage'
import { ProtectedRoute, PublicOnlyRoute } from '@/components/RouteGuards'

/**
 * Application routes.
 *
 * - /login, /register — public only (redirects to /dashboard if logged in)
 * - /dashboard — protected (redirects to /login if not logged in)
 * - /preview/:templateId — protected, shows the selected template
 * - / — redirects to /dashboard
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicOnlyRoute>
        <RegisterPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/preview/:templateId',
    element: (
      <ProtectedRoute>
        <TemplatePreviewPage />
      </ProtectedRoute>
    ),
  },
])

export default router
