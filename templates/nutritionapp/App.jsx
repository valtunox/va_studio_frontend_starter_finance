import { useState } from 'react'
import {
  Home, UtensilsCrossed, BookOpen, CalendarDays, UserCircle, Search, Bell,
  Plus, Camera, Flame, Droplets, Star, ChevronRight, Sparkles, Trophy,
  Heart, Clock, Zap, Apple, Egg, Cookie, Coffee, Salad, Fish, Beef,
  Settings, LogOut, Award, ChevronLeft, ChevronDown, Check, X,
  ScanBarcode, Wheat, Leaf, Timer, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ThemeSwitcher } from '@/components/shared/ThemeSwitcher'
import { Progress, ProgressRing } from '@/components/ui/progress'

/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */

const todaysMeals = [
  { id: 1, meal: 'Breakfast', name: 'Overnight Oats', cal: 320, icon: Coffee, logged: true },
  { id: 2, meal: 'Lunch', name: 'Grilled Chicken Salad', cal: 480, icon: Salad, logged: true },
  { id: 3, meal: 'Snack', name: 'Greek Yogurt + Berries', cal: 150, icon: Apple, logged: true },
  { id: 4, meal: 'Dinner', name: null, cal: 0, icon: UtensilsCrossed, logged: false },
]

const recentFoods = [
  { name: 'Banana', cal: 105 },
  { name: 'Chicken Breast', cal: 165 },
  { name: 'Brown Rice', cal: 215 },
  { name: 'Almonds (1oz)', cal: 164 },
  { name: 'Egg (large)', cal: 72 },
  { name: 'Avocado', cal: 240 },
  { name: 'Oatmeal', cal: 150 },
  { name: 'Salmon Fillet', cal: 280 },
]

const popularFoods = [
  { name: 'Grilled Chicken Breast', cal: 165, protein: '31g' },
  { name: 'Sweet Potato', cal: 103, protein: '2g' },
  { name: 'Quinoa Bowl', cal: 222, protein: '8g' },
  { name: 'Mixed Green Salad', cal: 45, protein: '3g' },
  { name: 'Protein Shake', cal: 180, protein: '30g' },
]

const recipes = [
  { id: 1, name: 'Chicken Stir Fry', cal: 380, time: '25 min', rating: 4.8, category: 'High Protein', gradient: 'from-orange-400 to-red-400' },
  { id: 2, name: 'Avocado Toast', cal: 290, time: '10 min', rating: 4.6, category: 'Quick Meals', gradient: 'from-green-400 to-emerald-500' },
  { id: 3, name: 'Salmon Poke Bowl', cal: 420, time: '20 min', rating: 4.9, category: 'High Protein', gradient: 'from-pink-400 to-rose-400' },
  { id: 4, name: 'Veggie Wrap', cal: 310, time: '15 min', rating: 4.5, category: 'Vegan', gradient: 'from-lime-400 to-green-500' },
  { id: 5, name: 'Berry Smoothie', cal: 180, time: '5 min', rating: 4.7, category: 'Quick Meals', gradient: 'from-purple-400 to-pink-400' },
  { id: 6, name: 'Lentil Soup', cal: 250, time: '35 min', rating: 4.4, category: 'Vegan', gradient: 'from-amber-400 to-orange-400' },
]

const recipeCategories = ['All', 'High Protein', 'Low Carb', 'Vegan', 'Quick Meals']

const weekDays = [
  { short: 'Mon', full: 'Monday', active: false },
  { short: 'Tue', full: 'Tuesday', active: false },
  { short: 'Wed', full: 'Wednesday', active: true },
  { short: 'Thu', full: 'Thursday', active: false },
  { short: 'Fri', full: 'Friday', active: false },
  { short: 'Sat', full: 'Saturday', active: false },
  { short: 'Sun', full: 'Sunday', active: false },
]

const mealPlan = {
  breakfast: { name: 'Spinach & Mushroom Omelet', items: ['3 eggs', 'Spinach', 'Mushrooms', 'Feta'], cal: 340 },
  lunch: { name: 'Turkey & Avocado Wrap', items: ['Turkey breast', 'Avocado', 'Whole wheat wrap', 'Veggies'], cal: 460 },
  dinner: { name: 'Baked Salmon with Quinoa', items: ['Salmon fillet', 'Quinoa', 'Roasted veggies', 'Lemon'], cal: 520 },
  snacks: { name: 'Healthy Snacks', items: ['Greek yogurt', 'Mixed nuts', 'Apple'], cal: 310 },
}

const achievements = [
  { name: 'First Week', icon: Trophy, earned: true, color: 'text-amber-500' },
  { name: '10 Day Streak', icon: Flame, earned: true, color: 'text-orange-500' },
  { name: 'Protein Pro', icon: Zap, earned: true, color: 'text-emerald-500' },
  { name: 'Hydration Hero', icon: Droplets, earned: false, color: 'text-blue-400' },
]

const weightHistory = [148, 147, 146.5, 146, 145.8, 145.5, 145]
const weightDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function NutritionApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [waterCount, setWaterCount] = useState(5)
  const [recipeFilter, setRecipeFilter] = useState('All')
  const [selectedDay, setSelectedDay] = useState(2)
  const [searchQuery, setSearchQuery] = useState('')

  const caloriesConsumed = 1450
  const caloriesGoal = 2100
  const caloriePercent = Math.round((caloriesConsumed / caloriesGoal) * 100)

  const macros = [
    { name: 'Protein', current: 72, target: 130, unit: 'g', color: 'bg-emerald-500', ring: 'text-emerald-500' },
    { name: 'Carbs', current: 145, target: 250, unit: 'g', color: 'bg-sky-500', ring: 'text-sky-500' },
    { name: 'Fat', current: 48, target: 70, unit: 'g', color: 'bg-amber-500', ring: 'text-amber-500' },
  ]

  const filteredRecipes = recipeFilter === 'All'
    ? recipes
    : recipes.filter(r => r.category === recipeFilter)

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'log', label: 'Log Food', icon: Plus },
    { id: 'recipes', label: 'Recipes', icon: BookOpen },
    { id: 'plan', label: 'Plan', icon: CalendarDays },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ]

  /* ---- HOME TAB ---- */
  const renderHome = () => (
    <div className="space-y-5">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good morning, Sarah</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Wednesday, March 23</p>
        </div>
        <button className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      {/* Calorie Ring */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/40 dark:to-green-950/40">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0">
              <ProgressRing value={caloriePercent} size={120} strokeWidth={10} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{caloriesConsumed}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">/ {caloriesGoal} cal</span>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Daily Calories</p>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{caloriesGoal - caloriesConsumed}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">remaining today</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macro Pills */}
      <div className="grid grid-cols-3 gap-3">
        {macros.map(m => (
          <Card key={m.name} className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{m.name}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{m.current}<span className="text-xs font-normal text-gray-400">/{m.target}{m.unit}</span></p>
              <div className="mt-2">
                <Progress value={Math.round((m.current / m.target) * 100)} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Water Tracker */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white text-sm">Water Intake</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{waterCount}/8 glasses</span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setWaterCount(i + 1)}
                className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all ${
                  i < waterCount
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'border-gray-200 dark:border-gray-700 text-gray-300 dark:text-gray-600 hover:border-blue-300'
                }`}
              >
                <Droplets className="w-4 h-4" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Today&apos;s Meals</h2>
        <div className="space-y-2">
          {todaysMeals.map(meal => (
            <Card key={meal.id} className="border-0 shadow-sm">
              <CardContent className="p-3 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  meal.logged ? 'bg-emerald-100 dark:bg-emerald-900/40' : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <meal.icon className={`w-5 h-5 ${meal.logged ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">{meal.meal}</p>
                  {meal.logged ? (
                    <p className="font-medium text-sm text-gray-900 dark:text-white truncate">{meal.name}</p>
                  ) : (
                    <p className="text-sm text-gray-400 dark:text-gray-500 italic">Not logged yet</p>
                  )}
                </div>
                {meal.logged ? (
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{meal.cal} cal</span>
                ) : (
                  <Button size="sm" variant="outline" className="h-8 text-emerald-600 border-emerald-300 hover:bg-emerald-50 dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Streak Card */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white">12 day streak!</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Keep it up! You&apos;re on fire!</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <Card className="border-0 shadow-sm bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">You&apos;re 85% to your protein goal.</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Try adding a protein shake!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  /* ---- LOG FOOD TAB ---- */
  const renderLogFood = () => (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Log Food</h1>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search food or scan barcode"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 pr-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 border-0 text-sm"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Breakfast', icon: Coffee, color: 'from-amber-400 to-orange-400' },
          { label: 'Lunch', icon: Salad, color: 'from-emerald-400 to-green-500' },
          { label: 'Dinner', icon: UtensilsCrossed, color: 'from-indigo-400 to-purple-500' },
          { label: 'Snack', icon: Cookie, color: 'from-pink-400 to-rose-400' },
        ].map(item => (
          <button key={item.label} className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
              <item.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Foods */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Recent Foods</h2>
        <div className="grid grid-cols-2 gap-2">
          {recentFoods.map(food => (
            <button key={food.name} className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition text-left">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{food.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{food.cal} cal</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Popular Foods */}
      <div>
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Popular Foods</h2>
        <div className="space-y-2">
          {popularFoods.map(food => (
            <Card key={food.name} className="border-0 shadow-sm">
              <CardContent className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{food.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{food.cal} cal &middot; {food.protein} protein</p>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950">
                  <Plus className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Create Custom */}
      <Button variant="outline" className="w-full h-12 rounded-xl border-dashed border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950">
        <Plus className="w-4 h-4 mr-2" /> Create Custom Food
      </Button>
    </div>
  )

  /* ---- RECIPES TAB ---- */
  const renderRecipes = () => (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recipes</h1>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {recipeCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setRecipeFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              recipeFilter === cat
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Recipe */}
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="h-36 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 flex items-center justify-center relative">
          <Fish className="w-16 h-16 text-white/30" />
          <Badge className="absolute top-3 left-3 bg-white/20 text-white border-0 backdrop-blur-sm">Featured</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-gray-900 dark:text-white">Protein Power Bowl</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Quinoa, grilled chicken, avocado, edamame, sesame dressing</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Flame className="w-3 h-3" /> 450 cal</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> 20 min</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"><Egg className="w-3 h-3" /> 35g protein</span>
            <span className="text-xs text-amber-500 flex items-center gap-1 ml-auto"><Star className="w-3 h-3 fill-amber-500" /> 4.9</span>
          </div>
        </CardContent>
      </Card>

      {/* Recipe Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredRecipes.map(recipe => (
          <Card key={recipe.id} className="border-0 shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer">
            <div className={`h-24 bg-gradient-to-br ${recipe.gradient} flex items-center justify-center`}>
              <UtensilsCrossed className="w-8 h-8 text-white/30" />
            </div>
            <CardContent className="p-3">
              <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{recipe.name}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">{recipe.cal} cal</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> {recipe.time}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-xs text-amber-600 dark:text-amber-400">{recipe.rating}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  /* ---- MEAL PLAN TAB ---- */
  const renderPlan = () => (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Meal Plan</h1>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        {weekDays.map((day, i) => (
          <button
            key={day.short}
            onClick={() => setSelectedDay(i)}
            className={`flex flex-col items-center min-w-[3rem] py-2 px-3 rounded-xl text-sm font-medium transition ${
              selectedDay === i
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider">{day.short}</span>
            <span className="text-lg font-bold">{19 + i}</span>
          </button>
        ))}
      </div>

      {/* Meal Plan Cards */}
      {Object.entries(mealPlan).map(([key, meal]) => (
        <Card key={key} className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-200 dark:text-emerald-400 dark:border-emerald-800 capitalize text-xs">
                {key}
              </Badge>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">{meal.cal} cal</span>
            </div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">{meal.name}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {meal.items.map(item => (
                <span key={item} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{item}</span>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Daily Total */}
      <Card className="border-0 shadow-sm bg-emerald-50 dark:bg-emerald-950/30">
        <CardContent className="p-4 flex items-center justify-between">
          <span className="font-semibold text-gray-900 dark:text-white">Daily Total</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {Object.values(mealPlan).reduce((sum, m) => sum + m.cal, 0)} cal
          </span>
        </CardContent>
      </Card>

      {/* AI Meal Plan */}
      <Button className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg">
        <Sparkles className="w-5 h-5 mr-2" /> Generate AI Meal Plan
      </Button>

      {/* Weekly Summary */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Weekly Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">1,980</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Avg Calories</p>
            </div>
            <div>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">Tue</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Best Day</p>
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">87<span className="text-sm text-gray-400">/100</span></p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Nutrition Score</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  /* ---- PROFILE TAB ---- */
  const renderProfile = () => {
    const maxWeight = Math.max(...weightHistory)
    const minWeight = Math.min(...weightHistory)
    const range = maxWeight - minWeight || 1

    return (
      <div className="space-y-5">
        {/* User Header */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              SJ
            </div>
            <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <Camera className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mt-3">Sarah Johnson</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Member since Jan 2026</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Current', value: '145', unit: 'lbs' },
            { label: 'Goal', value: '135', unit: 'lbs' },
            { label: 'Height', value: "5'6\"", unit: '' },
          ].map(stat => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className="p-3 text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}<span className="text-xs font-normal text-gray-400 ml-0.5">{stat.unit}</span></p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Goals */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-900 dark:text-white">Weight Loss</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Target: 1 lb/week</p>
            </div>
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 border-0">On Track</Badge>
          </CardContent>
        </Card>

        {/* Weight Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Weight Progress (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-end gap-2 h-28">
              {weightHistory.map((w, i) => {
                const height = 20 + ((maxWeight - w) / range) * 60
                const barHeight = 100 - height
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">{w}</span>
                    <div className="w-full flex flex-col justify-end h-20">
                      <div
                        className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-emerald-300 dark:from-emerald-600 dark:to-emerald-400 transition-all"
                        style={{ height: `${Math.max(barHeight, 15)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">{weightDays[i]}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Achievements</h2>
          <div className="grid grid-cols-4 gap-3">
            {achievements.map(a => (
              <div key={a.name} className="flex flex-col items-center gap-1 text-center">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  a.earned
                    ? 'bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-950/20 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 opacity-50'
                }`}>
                  <a.icon className={`w-6 h-6 ${a.earned ? a.color : 'text-gray-400'}`} />
                </div>
                <span className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">{a.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Links */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0 divide-y divide-gray-100 dark:divide-gray-800">
            {[
              { label: 'Dietary Preferences', icon: Leaf },
              { label: 'Notifications', icon: Bell },
              { label: 'Units & Measurements', icon: Settings },
              { label: 'Connected Apps', icon: Zap },
            ].map(link => (
              <button key={link.label} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition text-left">
                <link.icon className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full h-12 rounded-xl text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950">
          <LogOut className="w-4 h-4 mr-2" /> Log Out
        </Button>
      </div>
    )
  }

  /* ---- MAIN RENDER ---- */
  const renderContent = () => {
    switch (activeTab) {
      case 'home': return renderHome()
      case 'log': return renderLogFood()
      case 'recipes': return renderRecipes()
      case 'plan': return renderPlan()
      case 'profile': return renderProfile()
      default: return renderHome()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Theme Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeSwitcher />
      </div>

      {/* App Container */}
      <div className="max-w-[430px] mx-auto min-h-screen bg-white dark:bg-gray-900 shadow-2xl relative">
        {/* Scrollable Content */}
        <div className="pb-24 pt-6 px-5 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 z-40">
          <div className="flex items-center justify-around py-2 px-2">
            {tabs.map(tab => {
              const isActive = activeTab === tab.id
              const isLog = tab.id === 'log'
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all ${
                    isLog
                      ? ''
                      : isActive
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {isLog ? (
                    <div className={`w-12 h-12 -mt-5 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                      isActive
                        ? 'bg-emerald-500 scale-110'
                        : 'bg-emerald-500 hover:bg-emerald-600'
                    }`}>
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <tab.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : ''}`} />
                  )}
                  <span className={`text-[10px] font-medium ${isLog ? 'mt-0.5' : ''}`}>{tab.label}</span>
                </button>
              )
            })}
          </div>
          {/* Safe area spacer for notched phones */}
          <div className="h-[env(safe-area-inset-bottom,0px)]" />
        </nav>
      </div>
    </div>
  )
}
