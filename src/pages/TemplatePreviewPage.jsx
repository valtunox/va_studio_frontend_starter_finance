import { lazy, Suspense } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Lazy-load each template so they're only fetched when selected.
 * These map to the templates/ directory at the repo root.
 */
const templateMap = {
  saas: lazy(() => import('../../templates/saas/App.jsx')),
  portfolio: lazy(() => import('../../templates/portfolio/App.jsx')),
  ecommerce: lazy(() => import('../../templates/ecommerce/App.jsx')),
  blog: lazy(() => import('../../templates/blog/App.jsx')),
  crm: lazy(() => import('../../templates/crm/App.jsx')),
  erp: lazy(() => import('../../templates/erp/App.jsx')),
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-slate-500">Loading template...</p>
      </div>
    </div>
  )
}

export default function TemplatePreviewPage() {
  const { templateId } = useParams()
  const navigate = useNavigate()

  const TemplateComponent = templateMap[templateId]

  if (!TemplateComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Template not found</h2>
          <p className="text-slate-500 mb-4">The template "{templateId}" does not exist.</p>
          <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Floating back button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard')}
          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-lg"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Template preview */}
      <Suspense fallback={<LoadingFallback />}>
        <TemplateComponent />
      </Suspense>
    </div>
  )
}
