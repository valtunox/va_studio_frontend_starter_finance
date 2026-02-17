import { useState } from 'react'
import {
  Users, Phone, Mail, LayoutDashboard, Building2, Settings, Menu, X, Plus,
  Search, Filter, ChevronDown, MoreHorizontal, ArrowUpRight, ArrowDownRight,
  TrendingUp, DollarSign, UserPlus, Target, Calendar, Clock, Star,
  CheckCircle2, Circle, AlertCircle, Bell, ChevronRight, BarChart3,
  PieChart, Activity, Briefcase, Globe, MessageSquare, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
  { icon: Users, label: 'Contacts', href: '#contacts' },
  { icon: Building2, label: 'Companies', href: '#' },
  { icon: Target, label: 'Deals', href: '#deals' },
  { icon: FileText, label: 'Tasks', href: '#' },
  { icon: BarChart3, label: 'Reports', href: '#' },
  { icon: MessageSquare, label: 'Messages', href: '#', badge: 5 },
  { icon: Settings, label: 'Settings', href: '#' },
]

const stats = [
  { label: 'Total Revenue', value: '$284,500', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'New Contacts', value: '1,248', change: '+8.2%', trend: 'up', icon: UserPlus, color: 'blue' },
  { label: 'Active Deals', value: '64', change: '+15.3%', trend: 'up', icon: Target, color: 'violet' },
  { label: 'Conversion Rate', value: '24.8%', change: '-2.1%', trend: 'down', icon: TrendingUp, color: 'amber' },
]

const pipeline = [
  { stage: 'Lead', count: 24, value: '$48,000', color: 'bg-slate-400' },
  { stage: 'Qualified', count: 18, value: '$126,000', color: 'bg-blue-500' },
  { stage: 'Proposal', count: 12, value: '$210,000', color: 'bg-violet-500' },
  { stage: 'Negotiation', count: 8, value: '$184,000', color: 'bg-amber-500' },
  { stage: 'Closed Won', count: 6, value: '$284,500', color: 'bg-emerald-500' },
]

const contacts = [
  { id: 1, name: 'Alice Johnson', company: 'Acme Corp', email: 'alice@acme.com', phone: '+1 555-0101', status: 'customer', value: '$45,000', lastContact: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face' },
  { id: 2, name: 'Bob Williams', company: 'TechStart Inc', email: 'bob@techstart.io', phone: '+1 555-0102', status: 'lead', value: '$28,000', lastContact: '1 day ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face' },
  { id: 3, name: 'Carol Davis', company: 'Global Solutions', email: 'carol@global.com', phone: '+1 555-0103', status: 'customer', value: '$62,000', lastContact: '3 hours ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face' },
  { id: 4, name: 'David Kim', company: 'InnovateTech', email: 'david@innovate.co', phone: '+1 555-0104', status: 'prospect', value: '$15,000', lastContact: '5 days ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face' },
  { id: 5, name: 'Emma Wilson', company: 'DataFlow Ltd', email: 'emma@dataflow.io', phone: '+1 555-0105', status: 'lead', value: '$33,500', lastContact: '12 hours ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face' },
  { id: 6, name: 'Frank Chen', company: 'CloudNine', email: 'frank@cloudnine.com', phone: '+1 555-0106', status: 'customer', value: '$78,000', lastContact: '30 min ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face' },
]

const recentDeals = [
  { id: 1, name: 'Enterprise License - Acme', value: '$45,000', stage: 'Negotiation', probability: 75, contact: 'Alice Johnson' },
  { id: 2, name: 'Annual Plan - TechStart', value: '$28,000', stage: 'Proposal', probability: 60, contact: 'Bob Williams' },
  { id: 3, name: 'Custom Solution - Global', value: '$62,000', stage: 'Closed Won', probability: 100, contact: 'Carol Davis' },
  { id: 4, name: 'Starter Pack - InnovateTech', value: '$15,000', stage: 'Qualified', probability: 40, contact: 'David Kim' },
]

const activities = [
  { id: 1, type: 'call', text: 'Call with Alice Johnson - Acme Corp', time: '30 min ago', icon: Phone },
  { id: 2, type: 'email', text: 'Proposal sent to Bob Williams', time: '2 hours ago', icon: Mail },
  { id: 3, type: 'deal', text: 'Deal closed: Global Solutions - $62K', time: '3 hours ago', icon: CheckCircle2 },
  { id: 4, type: 'meeting', text: 'Meeting scheduled with DataFlow Ltd', time: '5 hours ago', icon: Calendar },
  { id: 5, type: 'note', text: 'Follow-up note added for InnovateTech', time: '1 day ago', icon: FileText },
]

const tasks = [
  { id: 1, text: 'Follow up with Alice on contract renewal', due: 'Today', priority: 'high', done: false },
  { id: 2, text: 'Prepare proposal for TechStart expansion', due: 'Tomorrow', priority: 'medium', done: false },
  { id: 3, text: 'Schedule demo with InnovateTech team', due: 'Feb 20', priority: 'low', done: false },
  { id: 4, text: 'Send onboarding docs to CloudNine', due: 'Today', priority: 'high', done: true },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const statusColors = {
    customer: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    lead: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    prospect: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  }

  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-amber-500',
    low: 'text-slate-400',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <Target className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-display">CRM Pro</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, href, active, badge }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center">{badge}</span>
              )}
            </a>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">JD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">john@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-400">
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search contacts, deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-72 pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Button className="bg-violet-600 hover:bg-violet-700 rounded-lg">
              <Plus className="w-4 h-4 mr-2" /> New Contact
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold font-display">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Welcome back, John. Here's what's happening today.</p>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(({ label, value, change, trend, icon: Icon, color }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
                    <div className={`w-9 h-9 rounded-lg bg-${color}-100 dark:bg-${color}-900/20 flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 text-${color}-600 dark:text-${color}-400`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display">{value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>{change}</span>
                    <span className="text-xs text-slate-400 ml-1">vs last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pipeline */}
          <Card id="deals" className="border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Sales Pipeline</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">View All Deals</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                {pipeline.map((stage) => (
                  <div key={stage.stage} className="flex-1">
                    <div className={`h-2 rounded-full ${stage.color}`} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {pipeline.map((stage) => (
                  <div key={stage.stage} className="text-center">
                    <p className="text-xs text-slate-500 mb-1">{stage.stage}</p>
                    <p className="text-sm font-bold">{stage.count}</p>
                    <p className="text-xs text-slate-400">{stage.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Contacts Table */}
            <div id="contacts" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Recent Contacts</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Contact</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Value</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Last Contact</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.map((c) => (
                          <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-3">
                                <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                  <p className="font-medium text-sm">{c.name}</p>
                                  <p className="text-xs text-slate-500">{c.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{c.company}</td>
                            <td className="py-3 px-2">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusColors[c.status]}`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-right font-medium hidden sm:table-cell">{c.value}</td>
                            <td className="py-3 px-2 text-right text-xs text-slate-500 hidden lg:table-cell">{c.lastContact}</td>
                            <td className="py-3 px-2">
                              <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Activity Feed */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.map(({ id, type, text, time, icon: Icon }) => (
                      <div key={id} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm leading-snug">{text}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tasks */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-display">Tasks</CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs text-violet-600">
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <div key={task.id} className={`flex items-start gap-3 ${task.done ? 'opacity-50' : ''}`}>
                        <button className="mt-0.5 shrink-0">
                          {task.done
                            ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            : <Circle className={`w-5 h-5 ${priorityColors[task.priority]}`} />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${task.done ? 'line-through' : ''}`}>{task.text}</p>
                          <p className="text-xs text-slate-400 mt-0.5">Due: {task.due}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default App
