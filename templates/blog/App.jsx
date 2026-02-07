import { Calendar, User, Tag, Menu, ArrowRight, Search } from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const posts = [
  { id: 1, title: 'Getting Started with React and Vite', excerpt: 'Learn how to build fast, modern web apps with React and Vite in this comprehensive guide.', date: 'Feb 5, 2025', author: 'Jane Doe', tags: ['React', 'Vite'] },
  { id: 2, title: 'Tailwind CSS Best Practices', excerpt: 'Tips and patterns for writing maintainable, scalable Tailwind styles.', date: 'Feb 3, 2025', author: 'John Smith', tags: ['CSS', 'Tailwind'] },
  { id: 3, title: 'Building Accessible Web Apps', excerpt: 'A deep dive into Headless UI and accessibility patterns that matter.', date: 'Feb 1, 2025', author: 'Jane Doe', tags: ['Accessibility', 'a11y'] },
]

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Categories', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Blog</span>
            <div className="hidden md:flex gap-8">
              {navLinks.map(({ label, href }) => (
                <a key={label} href={href} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{label}</a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input placeholder="Search posts..." className="w-48 pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700" />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>
              <HeadlessMenu as="div" className="md:hidden">
                <MenuButton as={Button} variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl py-1 z-50">
                  {navLinks.map(({ label, href }) => (
                    <MenuItem key={label}>
                      <a href={href} className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">{label}</a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </HeadlessMenu>
            </div>
          </div>
        </div>
      </nav>

      <header className="py-16 px-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to the Blog</h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Thoughts, tutorials, and updates on web development.</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                    <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer">{post.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 px-2 py-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="text-amber-600 dark:text-amber-400 p-0 h-auto hover:bg-transparent">
                    Read more <ArrowRight className="w-4 h-4 ml-1 inline" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <footer className="py-8 px-4 border-t border-slate-200 dark:border-slate-800 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-slate-500 dark:text-slate-400">&copy; 2025 Blog. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">Archive</a>
            <a href="#" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">RSS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
