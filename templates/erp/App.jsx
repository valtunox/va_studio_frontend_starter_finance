import { useState } from 'react'
import { LayoutDashboard, Package, Truck, DollarSign, BarChart3, Settings, Menu, Warehouse, FileText } from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  { icon: Package, label: 'Inventory', href: '#' },
  { icon: Truck, label: 'Procurement', href: '#' },
  { icon: FileText, label: 'Orders', href: '#' },
  { icon: DollarSign, label: 'Finance', href: '#' },
  { icon: Warehouse, label: 'Warehouse', href: '#' },
  { icon: BarChart3, label: 'Reports', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const metrics = [
  { label: 'Revenue (MTD)', value: '$124,500', change: '+8.2%', icon: DollarSign },
  { label: 'Orders', value: '342', change: '+15', icon: FileText },
  { label: 'Inventory Value', value: '$89,200', change: '-2.1%', icon: Package },
  { label: 'Pending Shipments', value: '28', change: '5 urgent', icon: Truck },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">ERP</span>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-88px)]">
          {sidebarLinks.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <div className="pl-64">
        <header className="sticky top-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-30">
          <HeadlessMenu as="div" className="md:hidden">
            <MenuButton as={Button} variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </MenuButton>
            <MenuItems className="absolute left-4 right-4 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50 max-h-96 overflow-y-auto">
              {sidebarLinks.map(({ icon: Icon, label, href }) => (
                <MenuItem key={label}>
                  <a href={href} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                </MenuItem>
              ))}
            </MenuItems>
          </HeadlessMenu>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 dark:text-slate-400">Feb 2025</span>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Operational overview</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map(({ label, value, change, icon: Icon }) => (
              <Card key={label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</CardTitle>
                  <Icon className="w-4 h-4 text-sky-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['ORD-2025-001', 'ORD-2025-002', 'ORD-2025-003'].map((ord, i) => (
                    <div key={ord} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div>
                        <p className="font-medium">{ord}</p>
                        <p className="text-sm text-slate-500">Supplier #{i + 1}</p>
                      </div>
                      <span className={`text-sm font-medium ${i === 0 ? 'text-amber-600' : 'text-slate-600 dark:text-slate-400'}`}>
                        {i === 0 ? 'Pending' : 'Shipped'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Low Stock Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { sku: 'SKU-101', name: 'Widget A', qty: 8 },
                    { sku: 'SKU-205', name: 'Component B', qty: 3 },
                    { sku: 'SKU-312', name: 'Part C', qty: 12 },
                  ].map((item) => (
                    <div key={item.sku} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-slate-500">{item.sku}</p>
                      </div>
                      <span className={`font-medium ${item.qty < 10 ? 'text-red-600 dark:text-red-400' : 'text-slate-600'}`}>
                        {item.qty} units
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
