import { useState } from 'react'
import {
  Home, Search, Bell, Mail, User, Heart, MessageCircle, Share2, Repeat2,
  MoreHorizontal, Image, Smile, MapPin, Calendar, Link2, Bookmark,
  TrendingUp, Hash, Users, Settings, X, Menu, Camera, Video,
  ThumbsUp, Send, Globe, Lock, ChevronDown, Sparkles, Verified, Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navLinks = [
  { icon: Home, label: 'Home', href: '#', active: true },
  { icon: Search, label: 'Explore', href: '#explore' },
  { icon: Bell, label: 'Notifications', href: '#', badge: 3 },
  { icon: Mail, label: 'Messages', href: '#messages', badge: 12 },
  { icon: Bookmark, label: 'Bookmarks', href: '#' },
  { icon: Users, label: 'Communities', href: '#' },
  { icon: User, label: 'Profile', href: '#' },
]

const stories = [
  { id: 0, name: 'Your Story', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', isOwn: true },
  { id: 1, name: 'Sarah C.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', seen: false },
  { id: 2, name: 'Alex R.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', seen: false },
  { id: 3, name: 'Emily P.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face', seen: true },
  { id: 4, name: 'Marcus J.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face', seen: false },
  { id: 5, name: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face', seen: true },
  { id: 6, name: 'David K.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', seen: false },
]

const posts = [
  {
    id: 1,
    author: 'Sarah Chen',
    handle: '@sarahchen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
    verified: true,
    time: '2h',
    content: 'Just shipped a major update to our design system! New component library with 50+ components, dark mode support, and full accessibility compliance. Check it out!',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
    likes: 284,
    comments: 42,
    reposts: 18,
    bookmarked: false,
  },
  {
    id: 2,
    author: 'Alex Rivera',
    handle: '@alexrivera',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    verified: true,
    time: '4h',
    content: 'Hot take: The best code is the code you don\'t write.\n\nBefore adding a new dependency, ask yourself:\n1. Can I solve this in < 50 lines?\n2. Is the package actively maintained?\n3. What\'s the bundle size impact?\n\nYour future self will thank you.',
    image: null,
    likes: 1243,
    comments: 156,
    reposts: 89,
    bookmarked: true,
  },
  {
    id: 3,
    author: 'Emily Park',
    handle: '@emilypark',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    verified: false,
    time: '6h',
    content: 'Beautiful morning hike in the Pacific Northwest. Sometimes the best debugging happens away from the screen.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    likes: 567,
    comments: 23,
    reposts: 8,
    bookmarked: false,
  },
  {
    id: 4,
    author: 'Marcus Johnson',
    handle: '@marcusj',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    verified: true,
    time: '8h',
    content: 'Excited to announce I\'m joining the team at @TechCorp as a Staff Engineer! After 3 amazing years at StartupXYZ, it\'s time for a new chapter. Grateful for everyone who\'s been part of this journey.',
    image: null,
    likes: 2891,
    comments: 312,
    reposts: 145,
    bookmarked: false,
  },
]

const trending = [
  { tag: 'ReactConf2026', posts: '24.5K' },
  { tag: 'TailwindCSS', posts: '18.2K' },
  { tag: 'TypeScript5', posts: '15.8K' },
  { tag: 'WebDev', posts: '12.1K' },
  { tag: 'OpenSource', posts: '9.4K' },
]

const suggestedUsers = [
  { name: 'Sophie Chen', handle: '@sophiechen', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face', bio: 'Design Engineer at Figma', verified: true },
  { name: 'David Kim', handle: '@davidkim', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face', bio: 'Building the future of AI', verified: false },
  { name: 'Priya Sharma', handle: '@priyasharma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face', bio: 'VP Engineering @ DataFlow', verified: true },
]

const messages = [
  { name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=face', lastMsg: 'That sounds great! Let me know when...', time: '2m', unread: true },
  { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', lastMsg: 'Thanks for the code review!', time: '1h', unread: true },
  { name: 'Emily Park', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', lastMsg: 'See you at the meetup tomorrow', time: '3h', unread: false },
]

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(post.bookmarked)
  const [likeCount, setLikeCount] = useState(post.likes)

  const toggleLike = () => {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const formatCount = (n) => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n

  return (
    <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
      <div className="flex gap-3">
        <img src={post.avatar} alt={post.author} className="w-11 h-11 rounded-full object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-bold text-sm truncate">{post.author}</span>
            {post.verified && <Verified className="w-4 h-4 text-blue-500 shrink-0" />}
            <span className="text-slate-500 text-sm truncate">{post.handle}</span>
            <span className="text-slate-400 text-sm shrink-0">&middot; {post.time}</span>
            <button className="ml-auto p-1 text-slate-400 hover:text-slate-600 shrink-0">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line mb-3">{post.content}</p>
          {post.image && (
            <div className="rounded-xl overflow-hidden mb-3 border border-slate-200 dark:border-slate-800">
              <img src={post.image} alt="" className="w-full h-auto max-h-80 object-cover" loading="lazy" />
            </div>
          )}
          <div className="flex items-center justify-between max-w-md">
            <button className="flex items-center gap-1.5 text-slate-500 hover:text-blue-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs">{formatCount(post.comments)}</span>
            </button>
            <button className="flex items-center gap-1.5 text-slate-500 hover:text-emerald-500 transition-colors group">
              <div className="p-1.5 rounded-full group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                <Repeat2 className="w-4 h-4" />
              </div>
              <span className="text-xs">{formatCount(post.reposts)}</span>
            </button>
            <button onClick={toggleLike} className={`flex items-center gap-1.5 transition-colors group ${liked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'}`}>
              <div className="p-1.5 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors">
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              </div>
              <span className="text-xs">{formatCount(likeCount)}</span>
            </button>
            <button onClick={() => setSaved(!saved)} className={`p-1.5 rounded-full transition-colors ${saved ? 'text-blue-500' : 'text-slate-500 hover:text-blue-500'}`}>
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-1.5 rounded-full text-slate-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [postText, setPostText] = useState('')

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <div className="max-w-7xl mx-auto flex">

        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 p-4">
          <a href="#" className="flex items-center gap-2 px-4 py-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold font-display">Social</span>
          </a>
          <nav className="flex-1 space-y-0.5">
            {navLinks.map(({ icon: Icon, label, href, active, badge }) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-bold">{badge}</span>
                )}
              </a>
            ))}
          </nav>
          <Button className="w-full bg-rose-500 hover:bg-rose-600 rounded-full h-12 text-base font-semibold mt-4">
            Post
          </Button>
          <div className="flex items-center gap-3 mt-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Profile" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">@johndoe</p>
            </div>
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-4 h-14">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold font-display">Social</span>
            </div>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        </div>

        {/* Main Feed */}
        <main className="flex-1 min-w-0 border-r border-slate-200 dark:border-slate-800 lg:border-r min-h-screen pt-14 lg:pt-0">
          {/* Header */}
          <div className="sticky top-0 lg:top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <h1 className="text-xl font-bold font-display">Home</h1>
          </div>

          {/* Stories */}
          <div className="flex gap-3 px-4 py-4 overflow-x-auto border-b border-slate-200 dark:border-slate-800 scrollbar-hide">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
                <div className={`w-16 h-16 rounded-full p-0.5 ${story.isOwn ? 'bg-slate-200 dark:bg-slate-800' : story.seen ? 'bg-slate-300 dark:bg-slate-700' : 'bg-gradient-to-br from-rose-500 to-pink-600'}`}>
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-slate-950 relative">
                    <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
                    {story.isOwn && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center">
                        <Plus className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <span className="text-xs text-slate-500 truncate w-16 text-center">{story.name}</span>
              </div>
            ))}
          </div>

          {/* Compose */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="You" className="w-11 h-11 rounded-full shrink-0" />
              <div className="flex-1">
                <textarea
                  placeholder="What's happening?"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="w-full bg-transparent border-0 resize-none text-lg placeholder:text-slate-400 focus:outline-none min-h-[60px]"
                  rows={2}
                />
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex gap-1">
                    {[Image, Smile, MapPin, Calendar].map((Icon, i) => (
                      <button key={i} className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-colors">
                        <Icon className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                  <Button disabled={!postText.trim()} className="bg-rose-500 hover:bg-rose-600 rounded-full px-6 disabled:opacity-40">
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>

        {/* Right Sidebar */}
        <aside className="hidden xl:block w-80 shrink-0 h-screen sticky top-0 overflow-y-auto p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Input placeholder="Search" className="pl-10 bg-slate-100 dark:bg-slate-900 border-0 rounded-full" />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          </div>

          {/* Trending */}
          <Card id="explore" className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardContent className="p-0">
              <h3 className="font-bold font-display px-4 pt-4 pb-2">Trending</h3>
              {trending.map((item) => (
                <a key={item.tag} href="#" className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-4 h-4 text-rose-500" />
                    <span className="font-semibold text-sm">{item.tag}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.posts} posts</p>
                </a>
              ))}
              <a href="#" className="block px-4 py-3 text-sm text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800/50">Show more</a>
            </CardContent>
          </Card>

          {/* Suggested */}
          <Card className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardContent className="p-0">
              <h3 className="font-bold font-display px-4 pt-4 pb-2">Who to follow</h3>
              {suggestedUsers.map((user) => (
                <div key={user.handle} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-bold truncate">{user.name}</p>
                      {user.verified && <Verified className="w-3.5 h-3.5 text-blue-500 shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{user.bio}</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full text-xs shrink-0">Follow</Button>
                </div>
              ))}
              <a href="#" className="block px-4 py-3 text-sm text-rose-500 hover:bg-slate-50 dark:hover:bg-slate-800/50">Show more</a>
            </CardContent>
          </Card>

          {/* Messages Preview */}
          <Card id="messages" className="border-slate-200 dark:border-slate-800 overflow-hidden">
            <CardContent className="p-0">
              <h3 className="font-bold font-display px-4 pt-4 pb-2">Messages</h3>
              {messages.map((msg) => (
                <div key={msg.name} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                  <div className="relative">
                    <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
                    {msg.unread && <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm truncate ${msg.unread ? 'font-bold' : ''}`}>{msg.name}</p>
                      <span className="text-xs text-slate-400 shrink-0">{msg.time}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{msg.lastMsg}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <p className="text-xs text-slate-400 px-4">
            &copy; 2026 Social &middot; <a href="#" className="hover:underline">Terms</a> &middot; <a href="#" className="hover:underline">Privacy</a> &middot; <a href="#" className="hover:underline">Cookies</a>
          </p>
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 z-50">
        <div className="flex items-center justify-around py-2">
          {[Home, Search, Bell, Mail, User].map((Icon, i) => (
            <button key={i} className={`p-3 rounded-full ${i === 0 ? 'text-rose-500' : 'text-slate-500'}`}>
              <Icon className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
