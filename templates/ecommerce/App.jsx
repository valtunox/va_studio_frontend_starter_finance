import { useState } from 'react'
import {
  ShoppingBag, Search, ShoppingCart, User, ChevronRight, Star,
  Truck, Shield, RefreshCw, Headphones, Clock, Zap, Heart,
  Smartphone, Shirt, Home, Dumbbell, Sparkles, Car, BookOpen,
  Apple, Package, MapPin, Store, ChevronDown, ArrowRight,
  Monitor, Gamepad2, Baby, Leaf
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const categories = [
  { name: 'Electronics', icon: Smartphone, items: '24K' },
  { name: 'Fashion', icon: Shirt, items: '18K' },
  { name: 'Home & Garden', icon: Home, items: '12K' },
  { name: 'Sports', icon: Dumbbell, items: '8K' },
  { name: 'Beauty', icon: Sparkles, items: '15K' },
  { name: 'Toys', icon: Gamepad2, items: '6K' },
  { name: 'Automotive', icon: Car, items: '5K' },
  { name: 'Books', icon: BookOpen, items: '9K' },
  { name: 'Health', icon: Apple, items: '11K' },
  { name: 'Groceries', icon: Leaf, items: '7K' },
]

const flashDeals = [
  { name: 'Wireless Earbuds Pro', price: 29.99, original: 49.99, discount: 40, rating: 4.5, sold: 2341, gradient: 'from-blue-400 to-indigo-500' },
  { name: 'Smart Watch Ultra', price: 89.00, original: 149.00, discount: 40, rating: 4.7, sold: 1822, gradient: 'from-purple-400 to-pink-500' },
  { name: 'Running Shoes Air', price: 45.00, original: 79.00, discount: 43, rating: 4.3, sold: 3105, gradient: 'from-green-400 to-teal-500' },
  { name: 'Travel Backpack', price: 25.00, original: 55.00, discount: 55, rating: 4.6, sold: 1567, gradient: 'from-amber-400 to-orange-500' },
  { name: 'Bluetooth Speaker', price: 35.00, original: 59.00, discount: 41, rating: 4.4, sold: 2890, gradient: 'from-rose-400 to-red-500' },
  { name: 'Phone Case Premium', price: 12.00, original: 24.00, discount: 50, rating: 4.2, sold: 5420, gradient: 'from-cyan-400 to-blue-500' },
]

const featuredProducts = [
  { name: 'Noise Cancelling Headphones', price: 79.99, rating: 4.8, reviews: 1243, seller: 'TechZone', location: 'San Francisco', freeShipping: true, gradient: 'from-slate-600 to-slate-800', category: 'Electronics' },
  { name: 'Cotton Oversized Hoodie', price: 34.99, rating: 4.5, reviews: 892, seller: 'FashionHub', location: 'New York', freeShipping: true, gradient: 'from-pink-400 to-rose-500', category: 'Fashion' },
  { name: 'Ceramic Plant Pot Set', price: 28.50, rating: 4.6, reviews: 567, seller: 'HomeStyle', location: 'Portland', freeShipping: false, gradient: 'from-emerald-400 to-green-600', category: 'Home' },
  { name: 'Yoga Mat Premium 6mm', price: 42.00, rating: 4.7, reviews: 2103, seller: 'SportsPro', location: 'Denver', freeShipping: true, gradient: 'from-violet-400 to-purple-600', category: 'Sports' },
  { name: 'Vitamin C Serum 30ml', price: 18.99, rating: 4.9, reviews: 3421, seller: 'BeautyBox', location: 'Los Angeles', freeShipping: false, gradient: 'from-amber-300 to-yellow-500', category: 'Beauty' },
  { name: 'Mechanical Keyboard RGB', price: 65.00, rating: 4.6, reviews: 1876, seller: 'TechZone', location: 'San Francisco', freeShipping: true, gradient: 'from-gray-700 to-gray-900', category: 'Electronics' },
  { name: 'Leather Crossbody Bag', price: 55.00, rating: 4.4, reviews: 743, seller: 'FashionHub', location: 'New York', freeShipping: true, gradient: 'from-orange-700 to-amber-900', category: 'Fashion' },
  { name: 'LED Desk Lamp Touch', price: 32.99, rating: 4.5, reviews: 1102, seller: 'HomeStyle', location: 'Portland', freeShipping: false, gradient: 'from-sky-400 to-blue-600', category: 'Home' },
  { name: 'Resistance Bands Set', price: 19.99, rating: 4.3, reviews: 2567, seller: 'SportsPro', location: 'Denver', freeShipping: true, gradient: 'from-red-400 to-rose-600', category: 'Sports' },
  { name: 'Stainless Steel Water Bottle', price: 24.99, rating: 4.7, reviews: 4231, seller: 'HomeStyle', location: 'Portland', freeShipping: true, gradient: 'from-teal-400 to-cyan-600', category: 'Home' },
  { name: 'Wireless Charging Pad', price: 22.00, rating: 4.4, reviews: 1654, seller: 'TechZone', location: 'San Francisco', freeShipping: false, gradient: 'from-indigo-400 to-blue-700', category: 'Electronics' },
  { name: 'Scented Candle Gift Set', price: 29.99, rating: 4.8, reviews: 987, seller: 'HomeStyle', location: 'Portland', freeShipping: true, gradient: 'from-fuchsia-400 to-pink-600', category: 'Home' },
]

const topSellers = [
  { name: 'TechZone', rating: 4.9, products: 1240, color: 'from-blue-500 to-indigo-600' },
  { name: 'FashionHub', rating: 4.8, products: 3420, color: 'from-pink-500 to-rose-600' },
  { name: 'HomeStyle', rating: 4.7, products: 890, color: 'from-emerald-500 to-green-600' },
  { name: 'SportsPro', rating: 4.8, products: 675, color: 'from-orange-500 to-amber-600' },
  { name: 'BeautyBox', rating: 4.9, products: 2100, color: 'from-purple-500 to-violet-600' },
  { name: 'BookWorld', rating: 4.6, products: 5600, color: 'from-cyan-500 to-teal-600' },
]

const recentlyViewed = [
  { name: 'USB-C Hub 7-in-1', price: 35.99, gradient: 'from-gray-400 to-slate-600' },
  { name: 'Linen Throw Pillow', price: 22.00, gradient: 'from-amber-300 to-orange-400' },
  { name: 'Running Shorts', price: 28.99, gradient: 'from-blue-400 to-sky-500' },
  { name: 'Face Moisturizer', price: 15.50, gradient: 'from-pink-300 to-rose-400' },
  { name: 'Notebook Journal', price: 12.99, gradient: 'from-emerald-300 to-teal-400' },
  { name: 'Sunglasses Polarized', price: 39.99, gradient: 'from-yellow-400 to-amber-500' },
]

/* ------------------------------------------------------------------ */
/*  HELPER: Star Rating                                                */
/* ------------------------------------------------------------------ */

function StarRating({ rating, size = 'sm' }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${iconSize} ${i < full ? 'fill-amber-400 text-amber-400' : i === full && half ? 'fill-amber-400/50 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */

export default function EcommerceMarketplace() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [cartCount, setCartCount] = useState(3)
  const [activeBanner, setActiveBanner] = useState(0)
  const [hoveredProduct, setHoveredProduct] = useState(null)

  const banners = [
    { title: 'Mega Sale', subtitle: 'Up to 70% Off Electronics', cta: 'Shop Now', gradient: 'from-orange-500 via-amber-500 to-yellow-400' },
    { title: 'Fashion Week', subtitle: 'Trending Styles at Unbeatable Prices', cta: 'Explore', gradient: 'from-pink-500 via-rose-500 to-red-400' },
    { title: 'Home Refresh', subtitle: 'Transform Your Space for Less', cta: 'Discover', gradient: 'from-teal-500 via-emerald-500 to-green-400' },
  ]

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">

      {/* ============================================================ */}
      {/*  PROMO BANNER                                                 */}
      {/* ============================================================ */}
      <div className="bg-orange-500 dark:bg-orange-600 text-white text-center text-sm py-1.5 px-4 font-medium">
        Free shipping on orders over $50 &nbsp;|&nbsp; New user? Get 15% off with code <span className="font-bold">WELCOME15</span>
      </div>

      {/* ============================================================ */}
      {/*  TOP BAR / HEADER                                             */}
      {/* ============================================================ */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <ShoppingBag className="h-7 w-7 text-orange-500" />
            <span className="text-xl font-bold tracking-tight">Shop<span className="text-orange-500">Verse</span></span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto flex">
            <div className="relative flex w-full">
              <select className="h-10 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm px-3 pr-8 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>All</option>
                {categories.slice(0, 6).map(c => (
                  <option key={c.name}>{c.name}</option>
                ))}
              </select>
              <Input
                placeholder="Search for products, brands, and more..."
                className="rounded-none border-gray-300 dark:border-gray-700 h-10 flex-1"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Button className="rounded-l-none rounded-r-lg bg-orange-500 hover:bg-orange-600 text-white h-10 px-5">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeSwitcher />

            <Button variant="ghost" className="relative p-2">
              <User className="h-5 w-5" />
              <span className="hidden md:inline ml-1 text-sm">Sign In</span>
            </Button>

            <Button variant="ghost" className="relative p-2" onClick={() => {}}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>

            <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm hidden md:flex">
              <Store className="h-4 w-4 mr-1" />
              Start Selling
            </Button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/*  CATEGORY NAVIGATION BAR                                      */}
      {/* ============================================================ */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 py-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0
                  ${activeCategory === cat.name
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400'
                  }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </button>
            )
          })}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* ============================================================ */}
        {/*  HERO SECTION                                                 */}
        {/* ============================================================ */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Banner */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${banners[activeBanner].gradient} p-8 md:p-12 min-h-[280px] flex flex-col justify-center`}>
              <span className="text-white/80 text-sm font-semibold uppercase tracking-wider">Limited Time</span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">{banners[activeBanner].title}</h1>
              <p className="text-white/90 text-lg mt-2">{banners[activeBanner].subtitle}</p>
              <Button className="mt-6 bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 w-fit">
                {banners[activeBanner].cta} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`h-2.5 rounded-full transition-all ${i === activeBanner ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`}
                />
              ))}
            </div>
          </div>

          {/* Side Promo Cards */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 flex flex-col justify-center text-white">
              <Shirt className="h-8 w-8 mb-2 opacity-80" />
              <h3 className="text-lg font-bold">Fashion Week Deals</h3>
              <p className="text-white/80 text-sm mt-1">Up to 50% off top brands</p>
              <Button variant="outline" className="mt-3 border-white/40 text-white hover:bg-white/20 w-fit text-sm">
                Shop Fashion
              </Button>
            </div>
            <div className="flex-1 bg-gradient-to-br from-violet-500 to-purple-700 rounded-2xl p-6 flex flex-col justify-center text-white">
              <Package className="h-8 w-8 mb-2 opacity-80" />
              <h3 className="text-lg font-bold">New Arrivals Daily</h3>
              <p className="text-white/80 text-sm mt-1">Fresh finds every day</p>
              <Button variant="outline" className="mt-3 border-white/40 text-white hover:bg-white/20 w-fit text-sm">
                Discover New
              </Button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FLASH DEALS                                                  */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="h-6 w-6 text-orange-500 fill-orange-500" />
                Flash Deals
              </h2>
              <div className="flex items-center gap-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg px-3 py-1.5 text-sm font-mono font-bold">
                <Clock className="h-3.5 w-3.5 mr-1" />
                05 : 23 : 41
              </div>
            </div>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600 font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {flashDeals.map((deal, i) => (
              <Card
                key={i}
                className="min-w-[200px] max-w-[200px] shrink-0 group hover:shadow-lg transition-all border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className={`h-40 bg-gradient-to-br ${deal.gradient} relative flex items-center justify-center`}>
                  <ShoppingBag className="h-12 w-12 text-white/30" />
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white border-0 text-xs font-bold">
                    -{deal.discount}%
                  </Badge>
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium line-clamp-2 min-h-[40px]">{deal.name}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-lg font-bold text-red-500">${deal.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400 line-through">${deal.original.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5">
                    <StarRating rating={deal.rating} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">({deal.sold.toLocaleString()} sold)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  SHOP BY CATEGORY GRID                                        */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat) => {
              const Icon = cat.icon
              return (
                <Card
                  key={cat.name}
                  className="group hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-600 transition-all cursor-pointer border-gray-200 dark:border-gray-800"
                >
                  <CardContent className="p-5 flex flex-col items-center text-center">
                    <div className="h-14 w-14 rounded-2xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center mb-3 group-hover:bg-orange-100 dark:group-hover:bg-orange-900 transition-colors">
                      <Icon className="h-7 w-7 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{cat.items} items</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  FEATURED / RECOMMENDED PRODUCTS                              */}
        {/* ============================================================ */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Recommended For You</h2>
            <Button variant="ghost" className="text-orange-500 hover:text-orange-600 font-medium">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <Card
                key={i}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 dark:border-gray-800"
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className={`h-48 bg-gradient-to-br ${product.gradient} relative flex items-center justify-center`}>
                  <ShoppingBag className="h-14 w-14 text-white/20" />
                  {product.freeShipping && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white border-0 text-xs">
                      <Truck className="h-3 w-3 mr-1" /> Free Shipping
                    </Badge>
                  )}
                  <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                  <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/40 to-transparent p-3 transform transition-transform duration-300 ${hoveredProduct === i ? 'translate-y-0' : 'translate-y-full'}`}>
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                  <h3 className="font-semibold text-sm mt-1 line-clamp-2 min-h-[40px]">{product.name}</h3>
                  <p className="text-xl font-bold text-orange-500 mt-2">${product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <StarRating rating={product.rating} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <Store className="h-3 w-3" />
                    <span>{product.seller}</span>
                    <span className="mx-0.5">·</span>
                    <MapPin className="h-3 w-3" />
                    <span>{product.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TOP SELLERS                                                   */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Top Sellers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {topSellers.map((seller, i) => (
              <Card key={i} className="hover:shadow-lg transition-all border-gray-200 dark:border-gray-800 text-center">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${seller.color} flex items-center justify-center text-white font-bold text-xl mb-3`}>
                    {seller.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-sm">{seller.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{seller.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{seller.products.toLocaleString()} products</p>
                  <Button variant="outline" className="mt-3 text-xs h-8 w-full border-orange-300 text-orange-500 hover:bg-orange-50 dark:border-orange-700 dark:hover:bg-orange-950">
                    Visit Store
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  RECENTLY VIEWED                                               */}
        {/* ============================================================ */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map((item, i) => (
              <Card key={i} className="min-w-[160px] max-w-[160px] shrink-0 hover:shadow-md transition-all border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer">
                <div className={`h-28 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                  <ShoppingBag className="h-8 w-8 text-white/25" />
                </div>
                <CardContent className="p-3">
                  <p className="text-xs font-medium line-clamp-1">{item.name}</p>
                  <p className="text-sm font-bold text-orange-500 mt-1">${item.price.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/*  TRUST BADGES                                                  */}
        {/* ============================================================ */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: Shield, title: 'Secure Payment', desc: '100% protected' },
            { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
            { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
          ].map((badge, i) => (
            <Card key={i} className="border-gray-200 dark:border-gray-800">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center shrink-0">
                  <badge.icon className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{badge.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* ============================================================ */}
        {/*  SELL ON SHOPVERSE CTA                                         */}
        {/* ============================================================ */}
        <section className="rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-10 h-32 w-32 rounded-full border-4 border-white" />
            <div className="absolute bottom-4 left-20 h-20 w-20 rounded-full border-4 border-white" />
            <div className="absolute top-10 left-1/2 h-16 w-16 rounded-full border-4 border-white" />
          </div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">Start Selling Today</h2>
            <p className="text-white/90 mt-2">Reach millions of buyers worldwide. Set up your store in minutes.</p>
            <div className="flex items-center justify-center gap-8 mt-6">
              <div>
                <p className="text-2xl font-bold">500K+</p>
                <p className="text-sm text-white/80">Sellers</p>
              </div>
              <div className="h-8 w-px bg-white/30" />
              <div>
                <p className="text-2xl font-bold">10M+</p>
                <p className="text-sm text-white/80">Products</p>
              </div>
              <div className="h-8 w-px bg-white/30" />
              <div>
                <p className="text-2xl font-bold">50M+</p>
                <p className="text-sm text-white/80">Buyers</p>
              </div>
            </div>
            <Button className="mt-8 bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 text-base h-12">
              <Store className="h-5 w-5 mr-2" />
              Create Your Store
            </Button>
          </div>
        </section>

      </main>

      {/* ============================================================ */}
      {/*  FOOTER                                                        */}
      {/* ============================================================ */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Customer Service */}
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            {/* About Us */}
            <div>
              <h4 className="text-white font-semibold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">About ShopVerse</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Affiliate Program</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Blog</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Electronics</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Fashion</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Home & Garden</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Sports</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Beauty</a></li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-white font-semibold mb-4">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay', 'Google Pay'].map(method => (
                  <span key={method} className="text-xs bg-gray-800 dark:bg-gray-900 px-3 py-1.5 rounded-md border border-gray-700">
                    {method}
                  </span>
                ))}
              </div>
              <h4 className="text-white font-semibold mt-6 mb-3">Download App</h4>
              <div className="flex flex-col gap-2">
                <span className="text-xs bg-gray-800 dark:bg-gray-900 px-3 py-2 rounded-md border border-gray-700 text-center cursor-pointer hover:border-orange-500 transition-colors">App Store</span>
                <span className="text-xs bg-gray-800 dark:bg-gray-900 px-3 py-2 rounded-md border border-gray-700 text-center cursor-pointer hover:border-orange-500 transition-colors">Google Play</span>
              </div>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400 transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-orange-400 transition-colors">TikTok</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-orange-500" />
              <span className="font-semibold text-gray-300">ShopVerse</span>
              <span>&copy; {new Date().getFullYear()}. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-orange-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
