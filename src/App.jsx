/**
 * VA Studio - Main Application Entry Point
 *
 * Public-first architecture: no login required.
 *
 * Routes:
 *   /                          → Welcome page (template gallery + hero)
 *   /preview/:templateId       → Live template preview (ecommerce, saas, portfolio, etc.)
 *
 * All 8 templates are loaded dynamically via React.lazy + code-splitting.
 * The welcome page serves as the entry point where users browse templates,
 * chat with AI, and request customizations — all without signing in.
 *
 * @module App
 * @version 1.0.0
 * @see {@link ../templates/} for individual template implementations
 * @see {@link ./pages/WelcomePage.jsx} for the template gallery
 * @see {@link ./lib/api.js} for backend API client
 */

import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, useParams, Link } from 'react-router-dom'
import WelcomePage from './pages/WelcomePage'

/* ------------------------------------------------------------------ */
/*  Lazy-loaded template components (code-split per template)          */
/* ------------------------------------------------------------------ */

const templates = {
  ecommerce: lazy(() => import('../templates/ecommerce/App.jsx')),
  saas: lazy(() => import('../templates/saas/App.jsx')),
  portfolio: lazy(() => import('../templates/portfolio/App.jsx')),
  blog: lazy(() => import('../templates/blog/App.jsx')),
  crm: lazy(() => import('../templates/crm/App.jsx')),
  erp: lazy(() => import('../templates/erp/App.jsx')),
  social: lazy(() => import('../templates/social/App.jsx')),
  dashboard: lazy(() => import('../templates/dashboard/App.jsx')),
}

/* ------------------------------------------------------------------ */
/*  Template Preview (resolves :templateId → component)                */
/* ------------------------------------------------------------------ */

function TemplateLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900" />
          <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Loading template...</p>
      </div>
    </div>
  )
}

function TemplatePreview() {
  const { templateId } = useParams()
  const Component = templates[templateId]

  if (!Component) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
        <div className="text-center max-w-md">
          <p className="text-7xl font-black text-slate-200 dark:text-slate-800 font-display mb-2">404</p>
          <h1 className="text-2xl font-bold font-display mb-3 text-slate-900 dark:text-white">Template Not Found</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            The template "<span className="font-mono text-indigo-600 dark:text-indigo-400">{templateId}</span>" doesn't exist.
            Available: {Object.keys(templates).join(', ')}.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25"
          >
            ← Browse All Templates
          </Link>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<TemplateLoader />}>
      <Component />
    </Suspense>
  )
}

/* ------------------------------------------------------------------ */
/*  Router                                                             */
/*                                                                     */
/*  /                     → Welcome page with template gallery         */
/*  /preview/:templateId  → Live preview of a specific template        */
/* ------------------------------------------------------------------ */

const router = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/preview/:templateId', element: <TemplatePreview /> },
])

/**
 * Root application component.
 * Renders the router which handles all page navigation.
 */
export default function App() {
  return <RouterProvider router={router} />
}
