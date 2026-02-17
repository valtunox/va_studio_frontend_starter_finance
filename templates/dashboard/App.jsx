import { useState } from 'react'
import {
  LayoutDashboard, BarChart3, TrendingUp, TrendingDown, Users, DollarSign,
  ShoppingCart, Eye, Clock, ArrowUpRight, ArrowDownRight, Menu, X, Bell,
  Search, Settings, ChevronDown, MoreHorizontal, Filter, Download,
  RefreshCw, Calendar, Globe, Activity, Target, Zap, PieChart,
  ArrowRight, CheckCircle2, AlertCircle, Info, ChevronRight,
  Layers, Monitor, Smartphone, Tablet, MapPin
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '#', active: true },
  { icon: BarChart3, label: 'Analytics', href: '#analytics' },
  { icon: Users, label: 'Audience', href: '#' },
  { icon: Globe, label: 'Acquisition', href: '#' },
  { icon: Target, label: 'Conversions', href: '#' },
  { icon: Activity, label: 'Real-time', href: '#', badge: 'Live' },
  { icon: PieChart, label: 'Reports', href: '#reports' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const kpis = [
  { label: 'Total Revenue', value: '$48,352', change: '+12.5%', trend: 'up', icon: DollarSign, sparkline: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 90] },
  { label: 'Active Users', value: '24,589', change: '+8.2%', trend: 'up', icon: Users, sparkline: [20, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55, 60] },
  { label: 'Conversion Rate', value: '3.24%', change: '+0.8%', trend: 'up', icon: Target, sparkline: [2.1, 2.3, 2.5, 2.4, 2.8, 3.0, 2.9, 3.1, 3.2, 3.0, 3.3, 3.24] },
  { label: 'Bounce Rate', value: '42.3%', change: '-3.1%', trend: 'down', icon: TrendingDown, sparkline: [50, 48, 47, 45, 46, 44, 43, 45, 44, 43, 42, 42.3] },
]

const revenueByChannel = [
  { channel: 'Organic Search', revenue: '$18,240', percent: 37.7, change: '+15.2%', color: 'bg-blue-500' },
  { channel: 'Direct', revenue: '$12,450', percent: 25.7, change: '+8.4%', color: 'bg-emerald-500' },
  { channel: 'Social Media', revenue: '$8,920', percent: 18.4, change: '+22.1%', color: 'bg-violet-500' },
  { channel: 'Email', revenue: '$5,340', percent: 11.0, change: '+5.6%', color: 'bg-amber-500' },
  { channel: 'Referral', revenue: '$3,402', percent: 7.0, change: '-2.3%', color: 'bg-pink-500' },
]

const topPages = [
  { page: '/products/wireless-headphones', views: '12,453', unique: '8,921', avgTime: '3:42', bounce: '28%' },
  { page: '/products/smart-watch', views: '9,876', unique: '7,234', avgTime: '4:15', bounce: '22%' },
  { page: '/blog/react-guide-2026', views: '8,234', unique: '6,891', avgTime: '6:30', bounce: '15%' },
  { page: '/pricing', views: '7,654', unique: '5,432', avgTime: '2:18', bounce: '35%' },
  { page: '/about', views: '5,432', unique: '4,321', avgTime: '1:45', bounce: '42%' },
  { page: '/contact', views: '4,321', unique: '3,210', avgTime: '2:05', bounce: '38%' },
]

const recentTransactions = [
  { id: 'TXN-001', customer: 'Alice Johnson', email: 'alice@acme.com', amount: '$1,250.00', status: 'completed', date: 'Feb 17, 2026', method: 'Credit Card' },
  { id: 'TXN-002', customer: 'Bob Williams', email: 'bob@tech.io', amount: '$890.00', status: 'completed', date: 'Feb 17, 2026', method: 'PayPal' },
  { id: 'TXN-003', customer: 'Carol Davis', email: 'carol@global.com', amount: '$2,100.00', status: 'pending', date: 'Feb 16, 2026', method: 'Wire Transfer' },
  { id: 'TXN-004', customer: 'David Kim', email: 'david@innovate.co', amount: '$450.00', status: 'failed', date: 'Feb 16, 2026', method: 'Credit Card' },
  { id: 'TXN-005', customer: 'Emma Wilson', email: 'emma@data.io', amount: '$3,200.00', status: 'completed', date: 'Feb 15, 2026', method: 'Credit Card' },
  { id: 'TXN-006', customer: 'Frank Chen', email: 'frank@cloud.com', amount: '$780.00', status: 'refunded', date: 'Feb 15, 2026', method: 'PayPal' },
]

const deviceBreakdown = [
  { device: 'Desktop', icon: Monitor, sessions: '14,234', percent: 58 },
  { device: 'Mobile', icon: Smartphone, sessions: '8,123', percent: 33 },
  { device: 'Tablet', icon: Tablet, sessions: '2,232', percent: 9 },
]

const topCountries = [
  { country: 'United States', sessions: '8,432', percent: 34.3 },
  { country: 'United Kingdom', sessions: '3,891', percent: 15.8 },
  { country: 'Germany', sessions: '2,654', percent: 10.8 },
  { country: 'Canada', sessions: '2,123', percent: 8.6 },
  { country: 'France', sessions: '1,876', percent: 7.6 },
]

const notifications = [
  { type: 'success', text: 'Revenue target reached for Q1', time: '2h ago' },
  { type: 'warning', text: 'Bounce rate increased on /pricing page', time: '4h ago' },
  { type: 'info', text: 'New analytics report is ready to download', time: '6h ago' },
]

const timeRanges = ['Today', '7 Days', '30 Days', '90 Days', 'Year']

/* ------------------------------------------------------------------ */
/*  MINI SPARKLINE                                                     */
/* ------------------------------------------------------------------ */

function Sparkline({ data, color = 'text-emerald-500', height = 32 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 100
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${height - ((v - min) / range) * height}`).join(' ')

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className={`w-full h-8 ${color}`} preserveAspectRatio="none">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState('30 Days')

  const txnStatusColors = {
    completed: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    failed: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    refunded: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
  }

  const notifIcons = {
    success: CheckCircle2,
    warning: AlertCircle,
    info: Info,
  }

  const notifColors = {
    success: 'text-emerald-500',
    warning: 'text-amber-500',
    info: 'text-blue-500',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold font-display">Analytics</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {sidebarLinks.map(({ icon: Icon, label, href, active, badge }) => (
            <a
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">{badge}</span>
              )}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="lg:pl-60">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    selectedRange === range
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1" /> Export
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold font-display">Dashboard Overview</h1>
              <p className="text-slate-500 text-sm mt-1">Last updated: Feb 17, 2026 at 2:45 PM</p>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map(({ label, value, change, trend, icon: Icon, sparkline }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500">{label}</span>
                    <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold font-display mb-1">{value}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-emerald-500" /> : <ArrowDownRight className="w-4 h-4 text-emerald-500" />}
                      <span className="text-sm font-medium text-emerald-600">{change}</span>
                    </div>
                    <div className="w-20">
                      <Sparkline data={sparkline} color={trend === 'up' ? 'text-emerald-500' : 'text-emerald-500'} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Revenue by Channel */}
            <div id="analytics" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Revenue by Channel</CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueByChannel.map((ch) => (
                      <div key={ch.channel} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${ch.color}`} />
                            <span className="font-medium">{ch.channel}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-medium">{ch.revenue}</span>
                            <span className={`text-xs ${ch.change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{ch.change}</span>
                          </div>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${ch.color} transition-all`} style={{ width: `${ch.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Devices */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Device Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceBreakdown.map(({ device, icon: Icon, sessions, percent }) => (
                      <div key={device} className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-slate-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="font-medium">{device}</span>
                            <span className="text-slate-500">{sessions}</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${percent}%` }} />
                          </div>
                        </div>
                        <span className="text-sm font-bold w-10 text-right">{percent}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.map((n, i) => {
                      const NIcon = notifIcons[n.type]
                      return (
                        <div key={i} className="flex gap-3">
                          <NIcon className={`w-5 h-5 shrink-0 mt-0.5 ${notifColors[n.type]}`} />
                          <div>
                            <p className="text-sm">{n.text}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Top Countries */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Top Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topCountries.map((c) => (
                      <div key={c.country} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{c.country}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500">{c.sessions}</span>
                          <span className="font-medium w-12 text-right">{c.percent}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Top Pages */}
          <Card id="reports" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Top Pages</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">View Full Report</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Page</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Views</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Unique</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Avg Time</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Bounce</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((page) => (
                      <tr key={page.page} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs text-indigo-600 dark:text-indigo-400">{page.page}</td>
                        <td className="py-3 px-2 text-right font-medium">{page.views}</td>
                        <td className="py-3 px-2 text-right text-slate-500 hidden sm:table-cell">{page.unique}</td>
                        <td className="py-3 px-2 text-right text-slate-500 hidden md:table-cell">{page.avgTime}</td>
                        <td className="py-3 px-2 text-right hidden lg:table-cell">
                          <span className={`font-medium ${parseInt(page.bounce) > 35 ? 'text-red-500' : parseInt(page.bounce) > 25 ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {page.bounce}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Transactions */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-display">Recent Transactions</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">
                    <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    <Download className="w-3.5 h-3.5 mr-1" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Transaction</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Customer</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Amount</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Method</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((txn) => (
                      <tr key={txn.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs font-medium">{txn.id}</td>
                        <td className="py-3 px-2 hidden sm:table-cell">
                          <div>
                            <p className="font-medium">{txn.customer}</p>
                            <p className="text-xs text-slate-500">{txn.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{txn.date}</td>
                        <td className="py-3 px-2 text-right font-medium">{txn.amount}</td>
                        <td className="py-3 px-2 text-center">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${txnStatusColors[txn.status]}`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-slate-500 hidden lg:table-cell">{txn.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default App
