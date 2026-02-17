import { useState } from 'react'
import {
  LayoutDashboard, Package, Truck, DollarSign, BarChart3, Settings, Menu, X,
  Warehouse, FileText, Users, ShoppingCart, TrendingUp, TrendingDown,
  AlertTriangle, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight,
  ChevronRight, Bell, Search, Filter, Download, RefreshCw, Eye,
  Calendar, Globe, Layers, Activity, PieChart, Box, CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const sidebarSections = [
  {
    title: 'Main',
    links: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '#', active: true },
      { icon: BarChart3, label: 'Analytics', href: '#' },
    ],
  },
  {
    title: 'Operations',
    links: [
      { icon: Package, label: 'Inventory', href: '#inventory', badge: 3 },
      { icon: ShoppingCart, label: 'Purchase Orders', href: '#' },
      { icon: FileText, label: 'Sales Orders', href: '#orders' },
      { icon: Truck, label: 'Shipping', href: '#' },
      { icon: Warehouse, label: 'Warehouses', href: '#' },
    ],
  },
  {
    title: 'Finance',
    links: [
      { icon: DollarSign, label: 'Accounting', href: '#' },
      { icon: CreditCard, label: 'Invoices', href: '#' },
      { icon: PieChart, label: 'Reports', href: '#' },
    ],
  },
  {
    title: 'Admin',
    links: [
      { icon: Users, label: 'Employees', href: '#' },
      { icon: Settings, label: 'Settings', href: '#' },
    ],
  },
]

const kpis = [
  { label: 'Revenue (MTD)', value: '$1,284,500', change: '+12.8%', trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'Orders Today', value: '342', change: '+28', trend: 'up', icon: FileText, color: 'blue' },
  { label: 'Inventory Value', value: '$892,400', change: '-2.1%', trend: 'down', icon: Package, color: 'violet' },
  { label: 'Pending Shipments', value: '58', change: '12 urgent', trend: 'neutral', icon: Truck, color: 'amber' },
  { label: 'Gross Margin', value: '34.2%', change: '+1.5%', trend: 'up', icon: TrendingUp, color: 'cyan' },
  { label: 'Avg Order Value', value: '$3,756', change: '+8.4%', trend: 'up', icon: ShoppingCart, color: 'pink' },
]

const recentOrders = [
  { id: 'ORD-2026-0847', customer: 'Acme Corp', date: 'Feb 17, 2026', items: 12, total: '$14,280', status: 'processing', payment: 'paid' },
  { id: 'ORD-2026-0846', customer: 'TechStart Inc', date: 'Feb 17, 2026', items: 5, total: '$6,750', status: 'shipped', payment: 'paid' },
  { id: 'ORD-2026-0845', customer: 'Global Solutions', date: 'Feb 16, 2026', items: 28, total: '$32,100', status: 'delivered', payment: 'paid' },
  { id: 'ORD-2026-0844', customer: 'InnovateTech', date: 'Feb 16, 2026', items: 3, total: '$4,500', status: 'pending', payment: 'unpaid' },
  { id: 'ORD-2026-0843', customer: 'DataFlow Ltd', date: 'Feb 15, 2026', items: 8, total: '$9,200', status: 'processing', payment: 'partial' },
  { id: 'ORD-2026-0842', customer: 'CloudNine', date: 'Feb 15, 2026', items: 15, total: '$18,900', status: 'shipped', payment: 'paid' },
]

const lowStockItems = [
  { sku: 'SKU-1001', name: 'Industrial Sensor Module', qty: 5, reorder: 50, warehouse: 'WH-A', supplier: 'SensorTech' },
  { sku: 'SKU-2045', name: 'Circuit Board Assembly', qty: 12, reorder: 100, warehouse: 'WH-B', supplier: 'ElectroParts' },
  { sku: 'SKU-3012', name: 'Hydraulic Valve Unit', qty: 3, reorder: 25, warehouse: 'WH-A', supplier: 'HydroSys' },
  { sku: 'SKU-4078', name: 'LED Display Panel', qty: 8, reorder: 40, warehouse: 'WH-C', supplier: 'DisplayCo' },
  { sku: 'SKU-5023', name: 'Power Supply 500W', qty: 15, reorder: 60, warehouse: 'WH-B', supplier: 'PowerMax' },
]

const warehouseData = [
  { name: 'Warehouse A', location: 'San Francisco', capacity: 85, items: 1240, value: '$420K' },
  { name: 'Warehouse B', location: 'Chicago', capacity: 62, items: 890, value: '$310K' },
  { name: 'Warehouse C', location: 'New York', capacity: 91, items: 1560, value: '$480K' },
]

const purchaseOrders = [
  { id: 'PO-2026-112', supplier: 'SensorTech', date: 'Feb 18', total: '$24,500', status: 'approved' },
  { id: 'PO-2026-111', supplier: 'ElectroParts', date: 'Feb 17', total: '$18,200', status: 'pending' },
  { id: 'PO-2026-110', supplier: 'HydroSys', date: 'Feb 16', total: '$31,000', status: 'received' },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const orderStatusColors = {
    pending: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    shipped: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    delivered: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  }

  const paymentColors = {
    paid: 'text-emerald-600 dark:text-emerald-400',
    unpaid: 'text-red-600 dark:text-red-400',
    partial: 'text-amber-600 dark:text-amber-400',
  }

  const poStatusColors = {
    approved: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    pending: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    received: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40 transform transition-transform lg:translate-x-0 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-display">ERP Suite</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-3">
          {sidebarSections.map((section) => (
            <div key={section.title} className="mb-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">{section.title}</p>
              {section.links.map(({ icon: Icon, label, href, active, badge }) => (
                <a
                  key={label}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span className="flex-1">{label}</span>
                  {badge && (
                    <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{badge}</span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 h-14 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              <span>Feb 17, 2026</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span>Fiscal Q1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <Download className="w-3.5 h-3.5 mr-1" /> Export
            </Button>
            <Button variant="outline" size="sm" className="text-xs hidden sm:flex">
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Refresh
            </Button>
            <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold font-display">Operations Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Real-time overview of your business operations</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpis.map(({ label, value, change, trend, icon: Icon }) => (
              <Card key={label} className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-4 h-4 text-slate-400" />
                    {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-emerald-500" />}
                    {trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-500" />}
                    {trend === 'neutral' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  </div>
                  <p className="text-xl font-bold font-display">{value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  <p className={`text-xs mt-1 ${trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-amber-600'}`}>{change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Orders Table */}
            <div id="orders" className="lg:col-span-2">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-display">Recent Orders</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Filter className="w-3.5 h-3.5 mr-1" /> Filter
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">View All</Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800">
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Order ID</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Customer</th>
                          <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Date</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Items</th>
                          <th className="text-right py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Total</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Status</th>
                          <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="py-3 px-2 font-mono text-xs font-medium">{order.id}</td>
                            <td className="py-3 px-2 hidden sm:table-cell">{order.customer}</td>
                            <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{order.date}</td>
                            <td className="py-3 px-2 text-center hidden lg:table-cell">{order.items}</td>
                            <td className="py-3 px-2 text-right font-medium">{order.total}</td>
                            <td className="py-3 px-2 text-center">
                              <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${orderStatusColors[order.status]}`}>
                                {order.status}
                              </span>
                            </td>
                            <td className={`py-3 px-2 text-center text-xs font-medium capitalize hidden sm:table-cell ${paymentColors[order.payment]}`}>
                              {order.payment}
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
              {/* Warehouses */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Warehouses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {warehouseData.map((wh) => (
                      <div key={wh.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium">{wh.name}</p>
                            <p className="text-xs text-slate-500">{wh.location} &middot; {wh.items} items &middot; {wh.value}</p>
                          </div>
                          <span className={`text-xs font-bold ${wh.capacity > 85 ? 'text-red-500' : wh.capacity > 70 ? 'text-amber-500' : 'text-emerald-500'}`}>
                            {wh.capacity}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${wh.capacity > 85 ? 'bg-red-500' : wh.capacity > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${wh.capacity}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Purchase Orders */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-display">Purchase Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {purchaseOrders.map((po) => (
                      <div key={po.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800/50 last:border-0">
                        <div>
                          <p className="text-sm font-medium font-mono">{po.id}</p>
                          <p className="text-xs text-slate-500">{po.supplier} &middot; {po.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{po.total}</p>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${poStatusColors[po.status]}`}>
                            {po.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Low Stock Alerts */}
          <Card id="inventory" className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CardTitle className="font-display">Low Stock Alerts</CardTitle>
                  <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full">{lowStockItems.length} items</span>
                </div>
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-xs">
                  Auto-Reorder All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">SKU</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Product</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Current Qty</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden sm:table-cell">Reorder Level</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden md:table-cell">Warehouse</th>
                      <th className="text-left py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider hidden lg:table-cell">Supplier</th>
                      <th className="text-center py-3 px-2 font-medium text-slate-500 text-xs uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => (
                      <tr key={item.sku} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-2 font-mono text-xs">{item.sku}</td>
                        <td className="py-3 px-2 font-medium">{item.name}</td>
                        <td className="py-3 px-2 text-center">
                          <span className={`font-bold ${item.qty < 10 ? 'text-red-600 dark:text-red-400' : 'text-amber-600 dark:text-amber-400'}`}>
                            {item.qty}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center text-slate-500 hidden sm:table-cell">{item.reorder}</td>
                        <td className="py-3 px-2 text-slate-500 hidden md:table-cell">{item.warehouse}</td>
                        <td className="py-3 px-2 text-slate-500 hidden lg:table-cell">{item.supplier}</td>
                        <td className="py-3 px-2 text-center">
                          <Button variant="outline" size="sm" className="text-xs h-7">Reorder</Button>
                        </td>
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
