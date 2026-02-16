import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Settings, LogOut, MessageSquare,
  Package, Palette, Globe, ShoppingCart, BookOpen, BarChart3, Building2,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { healthApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const TEMPLATES = [
  {
    id: 'saas',
    name: 'SaaS Dashboard',
    description: 'Admin dashboard with analytics, user management, and billing.',
    icon: BarChart3,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Personal portfolio with projects showcase and contact form.',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Online store with product catalog, cart, and checkout.',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'blog',
    name: 'Blog / CMS',
    description: 'Content management with posts, categories, and tags.',
    icon: BookOpen,
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship management with contacts and deals.',
    icon: Users,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'erp',
    name: 'ERP',
    description: 'Enterprise resource planning with inventory and HR modules.',
    icon: Building2,
    color: 'from-rose-500 to-red-500',
  },
]

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'Projects', href: '/dashboard' },
  { icon: MessageSquare, label: 'AI Chat', href: '/dashboard' },
  { icon: Settings, label: 'Settings', href: '/dashboard' },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [backendStatus, setBackendStatus] = useState('checking')

  useEffect(() => {
    healthApi.check()
      .then(() => setBackendStatus('connected'))
      .catch(() => setBackendStatus('disconnected'))
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleSelectTemplate = (templateId) => {
    navigate(`/preview/${templateId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            VA Studio
          </span>
        </div>

        <nav className="p-4 space-y-1 flex-1">
          {sidebarLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-medium">
              {user?.full_name?.[0] || user?.email?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors w-full mt-1"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
              backendStatus === 'connected'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : backendStatus === 'disconnected'
                ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                backendStatus === 'connected' ? 'bg-emerald-500' :
                backendStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
              Backend: {backendStatus === 'connected' ? 'Connected (5112)' :
                        backendStatus === 'disconnected' ? 'Disconnected' : 'Checking...'}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Welcome{user?.full_name ? `, ${user.full_name}` : ''}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Select a template to start building your app with AI.
            </p>
          </div>

          {/* Template Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template) => {
              const Icon = template.icon
              return (
                <Card
                  key={template.id}
                  className="group cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${template.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {template.name}
                    </CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      Select Template
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
