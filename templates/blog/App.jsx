import { useState } from 'react'
import {
  Calendar, User, Tag, Menu, X, ArrowRight, Search, Clock, Heart,
  MessageCircle, Share2, Bookmark, TrendingUp, ChevronRight, Mail,
  Twitter, Github, Linkedin, Rss, Eye, ThumbsUp, Filter,
  Sparkles, PenTool, BookOpen, Coffee
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { name: 'All', count: 42 },
  { name: 'React', count: 12 },
  { name: 'TypeScript', count: 8 },
  { name: 'DevOps', count: 6 },
  { name: 'Design', count: 5 },
  { name: 'Career', count: 4 },
  { name: 'AI/ML', count: 7 },
]

const featuredPost = {
  id: 0,
  title: 'Building Scalable React Applications: A Complete Architecture Guide for 2026',
  excerpt: 'From folder structure to state management, testing strategies, and deployment pipelines — everything you need to build React apps that scale to millions of users.',
  date: 'Feb 15, 2026',
  author: 'Sarah Chen',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
  readTime: '15 min read',
  image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
  tags: ['React', 'Architecture', 'TypeScript'],
  likes: 342,
  comments: 56,
  views: '12.4K',
}

const posts = [
  { id: 1, title: 'Mastering TypeScript Generics: From Basics to Advanced Patterns', excerpt: 'A deep dive into TypeScript generics with practical examples, constraint patterns, and real-world use cases that will level up your type safety.', date: 'Feb 12, 2026', author: 'Marcus Johnson', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop', tags: ['TypeScript', 'JavaScript'], likes: 218, comments: 34, category: 'TypeScript' },
  { id: 2, title: 'Docker + Kubernetes: The Complete Production Deployment Guide', excerpt: 'Learn how to containerize your applications and deploy them to Kubernetes with zero-downtime rolling updates, auto-scaling, and monitoring.', date: 'Feb 10, 2026', author: 'Alex Rivera', authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', readTime: '12 min read', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop', tags: ['DevOps', 'Docker', 'K8s'], likes: 189, comments: 28, category: 'DevOps' },
  { id: 3, title: 'Design Systems That Scale: Building a Component Library from Scratch', excerpt: 'How to build a design system that grows with your team. Tokens, components, documentation, and governance strategies.', date: 'Feb 8, 2026', author: 'Emily Park', authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', readTime: '8 min read', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop', tags: ['Design', 'React', 'CSS'], likes: 156, comments: 22, category: 'Design' },
  { id: 4, title: 'AI-Powered Code Reviews: How LLMs Are Changing Developer Workflows', excerpt: 'Exploring how large language models are transforming code review processes, from automated suggestions to security vulnerability detection.', date: 'Feb 5, 2026', author: 'Sarah Chen', authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', readTime: '9 min read', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', tags: ['AI/ML', 'DevTools'], likes: 287, comments: 45, category: 'AI/ML' },
  { id: 5, title: 'From Junior to Senior: The Skills Nobody Talks About', excerpt: 'Technical skills get you hired, but communication, mentorship, and system thinking are what make you senior. A candid guide to career growth.', date: 'Feb 3, 2026', author: 'Marcus Johnson', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', readTime: '7 min read', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop', tags: ['Career', 'Growth'], likes: 412, comments: 67, category: 'Career' },
  { id: 6, title: 'Server Components vs. Client Components: When to Use What in Next.js', excerpt: 'A practical guide to understanding React Server Components, when to use them, and how they change the way we think about data fetching.', date: 'Feb 1, 2026', author: 'Alex Rivera', authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', readTime: '11 min read', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', tags: ['React', 'Next.js'], likes: 198, comments: 31, category: 'React' },
]

const trendingPosts = [
  { id: 101, title: 'Why Rust is the Future of Systems Programming', views: '24.1K' },
  { id: 102, title: 'The State of CSS in 2026', views: '18.7K' },
  { id: 103, title: 'Building Real-Time Apps with WebSockets', views: '15.3K' },
  { id: 104, title: 'GraphQL vs REST: The Definitive Comparison', views: '12.9K' },
  { id: 105, title: 'Micro-Frontends: Pros, Cons, and Pitfalls', views: '11.2K' },
]

const authors = [
  { name: 'Sarah Chen', role: 'Senior Engineer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', posts: 24 },
  { name: 'Marcus Johnson', role: 'Staff Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', posts: 18 },
  { name: 'Alex Rivera', role: 'DevOps Lead', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', posts: 15 },
]

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Articles', href: '#articles' },
  { label: 'Topics', href: '#topics' },
  { label: 'Authors', href: '#authors' },
  { label: 'Newsletter', href: '#newsletter' },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <PenTool className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-display">DevBlog</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-52 pl-9 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-full text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 rounded-full px-5 hidden md:flex">
              <PenTool className="w-3.5 h-3.5 mr-1.5" /> Write
            </Button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-1 border-t border-slate-200 dark:border-slate-800">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-slate-600 dark:text-slate-400">{item.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Featured Post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap gap-2 mb-3">
                {featuredPost.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-amber-500/20 text-amber-300 rounded-full backdrop-blur-sm">{tag}</span>
                ))}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold font-display text-white mb-3 max-w-3xl leading-tight">{featuredPost.title}</h1>
              <p className="text-slate-300 mb-4 max-w-2xl hidden md:block">{featuredPost.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <img src={featuredPost.authorAvatar} alt={featuredPost.author} className="w-8 h-8 rounded-full" />
                  <span className="font-medium text-white">{featuredPost.author}</span>
                </div>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredPost.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {featuredPost.views}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="articles" className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Posts */}
            <div className="lg:col-span-2">
              {/* Category Tabs */}
              <div id="topics" className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.name
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat.name} <span className="ml-1 opacity-60">{cat.count}</span>
                  </button>
                ))}
              </div>

              {/* Post List */}
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-64 shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <CardContent className="p-5 flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded">{tag}</span>
                          ))}
                        </div>
                        <h2 className="text-lg font-bold font-display mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">{post.title}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-slate-500">
                            <div className="flex items-center gap-1.5">
                              <img src={post.authorAvatar} alt={post.author} className="w-5 h-5 rounded-full" />
                              <span>{post.author}</span>
                            </div>
                            <span>{post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" /> {post.likes}</span>
                            <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {post.comments}</span>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-500 text-lg">No articles in this category yet</p>
                </div>
              )}

              <div className="text-center mt-10">
                <Button variant="outline" className="rounded-full px-8 border-slate-300 dark:border-slate-700">
                  Load More Articles <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Trending */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="font-bold font-display flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-amber-500" /> Trending
                  </h3>
                  <div className="space-y-4">
                    {trendingPosts.map((post, i) => (
                      <div key={post.id} className="flex gap-3 group cursor-pointer">
                        <span className="text-2xl font-bold font-display text-slate-200 dark:text-slate-800 group-hover:text-amber-500 transition-colors w-8 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <h4 className="text-sm font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">{post.title}</h4>
                          <span className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Eye className="w-3 h-3" /> {post.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Authors */}
              <Card id="authors" className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="font-bold font-display mb-4">Top Authors</h3>
                  <div className="space-y-4">
                    {authors.map((author) => (
                      <div key={author.name} className="flex items-center gap-3 group cursor-pointer">
                        <img src={author.avatar} alt={author.name} className="w-10 h-10 rounded-full" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{author.name}</p>
                          <p className="text-xs text-slate-500">{author.role} &middot; {author.posts} posts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags Cloud */}
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6">
                  <h3 className="font-bold font-display mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Next.js', 'Node.js', 'CSS', 'DevOps', 'AI/ML', 'Python', 'Rust', 'Go', 'Docker', 'AWS', 'Testing', 'GraphQL', 'Performance'].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/20 hover:text-amber-700 dark:hover:text-amber-400 cursor-pointer transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR2MmgtNnYtMTBoNnYtMmgtOHYxNGg4di00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
            <div className="relative">
              <Coffee className="w-12 h-12 mx-auto text-white/80 mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-3">Get the weekly digest</h2>
              <p className="text-white/80 max-w-md mx-auto mb-8">Join 15,000+ developers. Top articles, tutorials, and industry news delivered every Friday.</p>
              {subscribed ? (
                <p className="text-white font-medium flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" /> You're subscribed! Check your inbox.
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full h-12"
                  />
                  <Button onClick={() => { if (email) setSubscribed(true) }} className="bg-white text-amber-700 hover:bg-white/90 rounded-full h-12 px-8 font-semibold shrink-0">
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-400 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <PenTool className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-white font-display">DevBlog</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">Insights, tutorials, and stories from the developer community.</p>
              <div className="flex gap-3">
                {[Twitter, Github, Linkedin, Rss].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-lg bg-white/5 hover:bg-amber-600 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Content</h4>
              <ul className="space-y-2.5">
                {['Articles', 'Tutorials', 'Guides', 'Podcasts', 'Videos'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-amber-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Community</h4>
              <ul className="space-y-2.5">
                {['Discord', 'GitHub', 'Twitter', 'Newsletter', 'RSS Feed'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-amber-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">About</h4>
              <ul className="space-y-2.5">
                {['Team', 'Careers', 'Contact', 'Privacy', 'Terms'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-amber-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; 2026 DevBlog. All rights reserved.</p>
            <p className="text-sm">Made with <span className="text-red-400">&hearts;</span> for developers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
