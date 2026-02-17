import { useState, useEffect } from 'react'
import {
  ShoppingCart, Search, Menu, Star, Heart, Eye, ChevronRight,
  Truck, Shield, RotateCcw, Headphones, X, Plus, Minus, Trash2,
  ArrowRight, Zap, Clock, Tag, TrendingUp, Package, Gift,
  Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone,
  ChevronDown, Filter, Grid3X3, LayoutList
} from 'lucide-react'
import { Menu as HeadlessMenu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { id: 1, name: 'Electronics', icon: Zap, count: 234, color: 'from-blue-500 to-indigo-600', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop' },
  { id: 2, name: 'Fashion', icon: Tag, count: 512, color: 'from-pink-500 to-rose-600', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop' },
  { id: 3, name: 'Home & Living', icon: Package, count: 189, color: 'from-amber-500 to-orange-600', image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop' },
  { id: 4, name: 'Sports', icon: TrendingUp, count: 97, color: 'from-emerald-500 to-teal-600', image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=400&h=300&fit=crop' },
  { id: 5, name: 'Beauty', icon: Gift, count: 321, color: 'from-purple-500 to-violet-600', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop' },
  { id: 6, name: 'Books', icon: Package, count: 156, color: 'from-cyan-500 to-blue-600', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop' },
]

const featuredProducts = [
  { id: 1, name: 'Sony WH-1000XM5', price: 349.99, originalPrice: 399.99, rating: 4.8, reviews: 2341, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop', badge: 'Best Seller', category: 'Electronics' },
  { id: 2, name: 'Apple Watch Ultra 2', price: 799.00, originalPrice: null, rating: 4.9, reviews: 1892, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop', badge: 'New', category: 'Electronics' },
  { id: 3, name: 'Ergonomic Laptop Stand', price: 49.99, originalPrice: 79.99, rating: 4.5, reviews: 876, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop', badge: '37% Off', category: 'Home & Living' },
  { id: 4, name: 'Premium Leather Bag', price: 189.00, originalPrice: null, rating: 4.7, reviews: 543, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop', badge: null, category: 'Fashion' },
  { id: 5, name: 'Minimalist Desk Lamp', price: 65.00, originalPrice: 85.00, rating: 4.3, reviews: 312, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&h=500&fit=crop', badge: 'Sale', category: 'Home & Living' },
  { id: 6, name: 'Running Shoes Pro', price: 129.99, originalPrice: 159.99, rating: 4.6, reviews: 1205, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop', badge: 'Popular', category: 'Sports' },
  { id: 7, name: 'Wireless Earbuds', price: 79.99, originalPrice: 99.99, rating: 4.4, reviews: 2103, image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&h=500&fit=crop', badge: null, category: 'Electronics' },
  { id: 8, name: 'Ceramic Plant Pot Set', price: 34.99, originalPrice: null, rating: 4.2, reviews: 198, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&h=500&fit=crop', badge: 'New', category: 'Home & Living' },
]

const dealProducts = [
  { id: 101, name: 'Mechanical Keyboard RGB', price: 69.99, originalPrice: 129.99, rating: 4.6, reviews: 1543, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop', endsIn: '02:14:33', discount: 46 },
  { id: 102, name: 'Noise Cancelling Buds', price: 39.99, originalPrice: 89.99, rating: 4.3, reviews: 892, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=500&h=500&fit=crop', endsIn: '05:42:11', discount: 56 },
  { id: 103, name: '4K Webcam Pro', price: 59.99, originalPrice: 119.99, rating: 4.5, reviews: 667, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=500&h=500&fit=crop', endsIn: '11:08:45', discount: 50 },
  { id: 104, name: 'Portable Charger 20000mAh', price: 24.99, originalPrice: 49.99, rating: 4.7, reviews: 3201, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop', endsIn: '08:22:17', discount: 50 },
]

const testimonials = [
  { id: 1, name: 'Sarah Johnson', role: 'Verified Buyer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, text: 'Absolutely love the quality of products here. Fast shipping and the customer service is outstanding. Will definitely be ordering again!' },
  { id: 2, name: 'Michael Chen', role: 'Verified Buyer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5, text: 'Best online shopping experience I\'ve had. The product descriptions are accurate and the prices are very competitive. Highly recommend!' },
  { id: 3, name: 'Emily Rodriguez', role: 'Verified Buyer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 4, text: 'Great selection and easy checkout process. The deals section always has amazing finds. My go-to store for electronics and home goods.' },
]

const brands = [
  'Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Bose', 'Dell', 'LG'
]

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#products' },
  { label: 'Categories', href: '#categories' },
  { label: 'Deals', href: '#deals' },
  { label: 'About', href: '#about' },
]

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function PromoBar() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm py-2 px-4 text-center relative">
      <span className="inline-flex items-center gap-2">
        <Zap className="w-4 h-4" />
        Free shipping on orders over $50 &mdash; Use code <strong className="mx-1">WELCOME15</strong> for 15% off your first order
        <Zap className="w-4 h-4" />
      </span>
      <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

function ProductCard({ product, onAddToCart, onToggleWishlist, wishlist }) {
  const [hovered, setHovered] = useState(false)
  const isWished = wishlist.has(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <Card
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-600 text-white shadow-lg">
            {product.badge}
          </span>
        )}
        {discount && !product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500 text-white shadow-lg">
            -{discount}%
          </span>
        )}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
          <button
            onClick={() => onToggleWishlist(product.id)}
            className={`p-2 rounded-full shadow-md transition-colors ${isWished ? 'bg-red-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500'}`}
          >
            <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wide">{product.category}</p>
        <h3 className="font-semibold text-base mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">({product.reviews?.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-lg">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function DealCard({ deal, onAddToCart }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group">
      <div className="relative aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <img src={deal.image} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <span className="absolute top-3 left-3 px-3 py-1.5 text-sm font-bold rounded-full bg-red-500 text-white shadow-lg">
          -{deal.discount}%
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-base mb-1 line-clamp-1">{deal.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(deal.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
          ))}
          <span className="text-xs text-slate-500 ml-1">({deal.reviews?.toLocaleString()})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-red-500 font-bold text-lg">${deal.price.toFixed(2)}</span>
          <span className="text-sm text-slate-400 line-through">${deal.originalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <Clock className="w-3.5 h-3.5 text-red-500" />
          <span>Ends in <strong className="text-red-500">{deal.endsIn}</strong></span>
        </div>
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={() => onAddToCart(deal)}>
          Grab Deal
        </Button>
      </CardContent>
    </Card>
  )
}

function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 z-50 shadow-2xl transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-bold">Shopping Cart ({cart.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
                <p className="text-slate-500 dark:text-slate-400 text-lg">Your cart is empty</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Add items to get started</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 rounded bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => onRemove(item.id)} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-semibold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-emerald-600 dark:text-emerald-400">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-base">
                Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-center text-slate-400">Shipping & taxes calculated at checkout</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN APP                                                           */
/* ------------------------------------------------------------------ */

function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState(new Set())
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredProducts = activeCategory === 'All'
    ? featuredProducts
    : featuredProducts.filter((p) => p.category === activeCategory)

  const productCategories = ['All', ...new Set(featuredProducts.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* Promo Bar */}
      <PromoBar />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                VA Studio
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors relative group"
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-56 lg:w-64 pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-full text-sm"
                />
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              </div>

              <button className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
                {wishlist.size > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {wishlist.size}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-600 dark:text-slate-400"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
              {navLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-emerald-600 transition-colors"
                >
                  {label}
                </a>
              ))}
              <div className="pt-3 px-3">
                <div className="relative">
                  <Input placeholder="Search..." className="w-full pl-10 bg-slate-50 dark:bg-slate-800 rounded-full text-sm" />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 dark:from-emerald-500/5 dark:via-teal-500/3 dark:to-cyan-500/5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjAyIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR2MmgtNnYtMTBoNnYtMmgtOHYxNGg4di00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                New Season Collection 2026
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Products
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  You'll Love
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                Curated collections of premium products at unbeatable prices. Free shipping, easy returns, and 24/7 customer support.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-emerald-600/25">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-slate-300 dark:border-slate-700">
                  View Catalog
                </Button>
              </div>
              <div className="flex items-center gap-8 mt-10 pt-8 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-slate-500">Products</p>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <p className="text-2xl font-bold">50K+</p>
                  <p className="text-sm text-slate-500">Customers</p>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-800" />
                <div>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-slate-500">Rating</p>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=700&fit=crop"
                  alt="Featured collection"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-white/90 dark:bg-slate-900/90 rounded-full text-sm font-medium mb-2">
                    Trending Now
                  </span>
                  <h3 className="text-white text-xl font-bold">Spring Collection</h3>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl rotate-12">
                <div className="-rotate-12 text-center">
                  <p className="text-2xl font-black">30%</p>
                  <p className="text-xs uppercase tracking-wide">Off</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day guarantee' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Browse our curated collections</p>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium text-sm hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href="#products"
                onClick={() => setActiveCategory(cat.name)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
              >
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-sm">{cat.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{cat.count} items</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-1">Handpicked just for you</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
              <p className="text-slate-500 text-lg">No products found in this category</p>
            </div>
          )}
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="rounded-full px-8 border-slate-300 dark:border-slate-700">
              Load More Products
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Banner / CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop"
              alt="Special offer"
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-900/40" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-16 max-w-xl">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm font-medium mb-4">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Up to 50% Off Everything
                </h2>
                <p className="text-white/80 mb-6">
                  Don't miss our biggest sale of the season. Premium products at unbeatable prices.
                </p>
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-white/90 rounded-full px-8 h-12 font-semibold shadow-xl">
                  Shop the Sale
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section id="deals" className="py-16 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl md:text-3xl font-bold">Flash Deals</h2>
                <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold animate-pulse">
                  LIVE
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400">Limited time offers - grab them before they're gone!</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((deal) => (
              <DealCard key={deal.id} deal={deal} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Trusted by thousands of happy shoppers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id} className="p-6 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8 uppercase tracking-wider font-medium">Trusted by leading brands</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {brands.map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-500 transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-8 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR2MmgtNnYtMTBoNnYtMmgtOHYxNGg4di00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative">
              <Mail className="w-12 h-12 mx-auto text-white/80 mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay in the Loop</h2>
              <p className="text-white/80 max-w-md mx-auto mb-8">
                Subscribe to our newsletter for exclusive deals, new arrivals, and insider-only discounts.
              </p>
              {subscribed ? (
                <div className="flex items-center justify-center gap-2 text-white font-medium">
                  <Shield className="w-5 h-5" />
                  Thanks for subscribing! Check your inbox.
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full h-12"
                  />
                  <Button
                    onClick={() => { if (email) setSubscribed(true) }}
                    className="bg-white text-emerald-700 hover:bg-white/90 rounded-full h-12 px-8 font-semibold shrink-0"
                  >
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">VA Studio</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Your one-stop destination for premium products at unbeatable prices. Quality guaranteed.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2.5">
                {['Home', 'Shop', 'Categories', 'Deals', 'New Arrivals'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-emerald-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h4>
              <ul className="space-y-2.5">
                {['Help Center', 'Shipping Info', 'Returns', 'Order Tracking', 'Size Guide'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-emerald-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                  123 Commerce St, San Francisco, CA 94102
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 shrink-0 text-emerald-400" />
                  (555) 123-4567
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 shrink-0 text-emerald-400" />
                  support@vastudio.com
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; 2026 VA Studio. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-sm hover:text-emerald-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />
    </div>
  )
}

export default App
