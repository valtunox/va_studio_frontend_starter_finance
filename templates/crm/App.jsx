import { useState } from 'react'
import { Users, Phone, Mail, LayoutDashboard, Building2, Settings, Menu, Plus, Search, Filter } from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '#' },
  { icon: Users, label: 'Contacts', href: '#' },
  { icon: Building2, label: 'Companies', href: '#' },
  { icon: Settings, label: 'Settings', href: '#' },
]

const contacts = [
  { id: 1, name: 'Alice Johnson', company: 'Acme Corp', email: 'alice@acme.com', phone: '+1 555-0101', status: 'active' },
  { id: 2, name: 'Bob Williams', company: 'TechStart', email: 'bob@techstart.io', phone: '+1 555-0102', status: 'lead' },
  { id: 3, name: 'Carol Davis', company: 'Global Inc', email: 'carol@global.com', phone: '+1 555-0103', status: 'active' },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-40">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">CRM</span>
        </div>
        <nav className="p-4 space-y-1">
          {sidebarLinks.map(({ icon: Icon, label, href }) => (
            <a key={label} href={href} className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
              <span>{label}</span>
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
            <MenuItems className="absolute left-4 right-4 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
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
          <div className="flex-1 max-w-md ml-4 md:ml-0">
            <Input placeholder="Search contacts..." className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
          </div>
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Contact
          </Button>
        </header>

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Contacts</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your leads and customers</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">248</div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">34</div>
                <p className="text-xs text-violet-600 dark:text-violet-400 mt-1">Require follow-up</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
              <div className="flex gap-2 mt-2">
                <Input placeholder="Filter..." className="flex-1 max-w-xs" />
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="text-left py-3 font-medium">Name</th>
                      <th className="text-left py-3 font-medium">Company</th>
                      <th className="text-left py-3 font-medium">Email</th>
                      <th className="text-left py-3 font-medium">Phone</th>
                      <th className="text-left py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((c) => (
                      <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="py-4 font-medium">{c.name}</td>
                        <td className="py-4 text-slate-500">{c.company}</td>
                        <td className="py-4 text-slate-500">{c.email}</td>
                        <td className="py-4 text-slate-500">{c.phone}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 text-xs rounded ${c.status === 'active' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'}`}>
                            {c.status}
                          </span>
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
    </div>
  )
}

export default App
