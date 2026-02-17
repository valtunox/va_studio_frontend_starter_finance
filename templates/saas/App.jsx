import { useState } from 'react'
import {
  Menu, X, Check, ArrowRight, Zap, Shield, BarChart3, Globe, Users, Clock,
  Star, ChevronDown, ChevronUp, Play, Sparkles, Layers, Lock, Cpu,
  Mail, Phone, MapPin, Github, Twitter, Linkedin, Youtube,
  CheckCircle2, ArrowUpRight, Rocket, Target, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
]

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Sub-100ms response times with edge computing and smart caching for blazing performance.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II compliant with end-to-end encryption, SSO, and role-based access control.' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Real-time dashboards, custom reports, and AI-powered insights to drive decisions.' },
  { icon: Globe, title: 'Global CDN', desc: 'Deployed across 200+ edge locations worldwide for minimal latency everywhere.' },
  { icon: Layers, title: 'API First', desc: 'RESTful and GraphQL APIs with comprehensive SDKs for seamless integration.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Real-time editing, comments, and workflows built for modern distributed teams.' },
  { icon: Cpu, title: 'AI-Powered', desc: 'Built-in machine learning models for automation, predictions, and smart suggestions.' },
  { icon: Lock, title: '99.99% Uptime', desc: 'Multi-region redundancy with automatic failover and zero-downtime deployments.' },
]

const plans = [
  {
    name: 'Starter',
    price: 0,
    period: 'Free forever',
    desc: 'Perfect for individuals and small projects.',
    features: ['Up to 3 projects', '1,000 API calls/mo', 'Community support', 'Basic analytics', '1 team member'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Professional',
    price: 29,
    period: '/month',
    desc: 'For growing teams that need more power.',
    features: ['Unlimited projects', '100,000 API calls/mo', 'Priority support', 'Advanced analytics', 'Up to 10 members', 'Custom domains', 'SSO integration', 'Webhooks'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    period: '/month',
    desc: 'For organizations with advanced needs.',
    features: ['Everything in Pro', 'Unlimited API calls', 'Dedicated support', 'Custom SLA', 'Unlimited members', 'On-premise option', 'Audit logs', 'SAML/SCIM'],
    cta: 'Contact Sales',
    popular: false,
  },
]

const testimonials = [
  { name: 'Alex Rivera', role: 'CTO, ScaleUp Inc.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', text: 'Switching to this platform cut our development time by 60%. The API is incredibly well-designed and the documentation is top-notch.', company: 'ScaleUp' },
  { name: 'Priya Sharma', role: 'VP Engineering, DataFlow', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', text: 'The analytics alone are worth the price. We\'ve gained insights that directly led to a 40% increase in user retention.', company: 'DataFlow' },
  { name: 'Marcus Johnson', role: 'Founder, DevTools Co.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', text: 'Best developer experience I\'ve encountered. The team ships features at an incredible pace and actually listens to feedback.', company: 'DevTools' },
  { name: 'Sophie Chen', role: 'Lead Dev, CloudNine', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', text: 'We migrated our entire infrastructure in a weekend. The migration tools and support team made it completely painless.', company: 'CloudNine' },
]

const faqs = [
  { q: 'How does the free trial work?', a: 'Start with a 14-day free trial of the Professional plan. No credit card required. You can downgrade to the free Starter plan anytime.' },
  { q: 'Can I change plans later?', a: 'Absolutely. Upgrade or downgrade at any time. When upgrading, you\'ll be prorated for the remainder of your billing cycle.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and wire transfers for Enterprise plans. All payments are processed securely through Stripe.' },
  { q: 'Is there a setup fee?', a: 'No setup fees for any plan. You can get started immediately after signing up. Enterprise customers get a dedicated onboarding specialist.' },
  { q: 'Do you offer refunds?', a: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, we\'ll refund your payment in full.' },
  { q: 'What kind of support do you offer?', a: 'Starter gets community support, Professional gets priority email and chat support (< 4hr response), and Enterprise gets a dedicated account manager with phone support.' },
]

const stats = [
  { value: '10K+', label: 'Companies' },
  { value: '2M+', label: 'API Calls/Day' },
  { value: '99.99%', label: 'Uptime' },
  { value: '< 50ms', label: 'Avg Response' },
]

const logos = ['Stripe', 'Vercel', 'Supabase', 'Linear', 'Notion', 'Figma', 'Slack', 'Discord']

/* ------------------------------------------------------------------ */
/*  COMPONENTS                                                         */
/* ------------------------------------------------------------------ */

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 dark:border-slate-800 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-medium pr-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
      </button>
      {open && <p className="pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">{a}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [annual, setAnnual] = useState(true)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">

      {/* Nav */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-display">LaunchPad</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{item.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm">Sign In</Button>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 text-sm">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-1 border-t border-slate-200 dark:border-slate-800">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-slate-600 dark:text-slate-400">{item.label}</a>
            ))}
            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-3">Get Started</Button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-950" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" /> Now with AI-powered automation
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
            Ship faster with the
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">modern dev platform</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The all-in-one platform for building, deploying, and scaling your applications. From prototype to production in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 h-13 text-base shadow-lg shadow-blue-600/25">
              Start Building Free <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-13 text-base border-slate-300 dark:border-slate-700">
              <Play className="w-4 h-4 mr-2" /> Watch Demo
            </Button>
          </div>
          <div className="flex justify-center gap-8 md:gap-12">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl md:text-3xl font-bold font-display">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 mb-8 uppercase tracking-wider font-medium">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14">
            {logos.map((logo) => (
              <span key={logo} className="text-xl font-bold text-slate-300 dark:text-slate-700 hover:text-slate-500 dark:hover:text-slate-500 transition-colors cursor-default">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Features</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Everything you need to ship</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">A complete toolkit for modern development teams. Build, test, deploy, and monitor all from one platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold font-display mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Screenshot */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
              alt="Dashboard preview"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 dark:from-slate-950/20 to-transparent" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Simple, transparent pricing</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4">No hidden fees. No surprises. Cancel anytime.</p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className={`text-sm ${!annual ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>Monthly</span>
              <button onClick={() => setAnnual(!annual)} className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
              <span className={`text-sm ${annual ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-500'}`}>Annual</span>
              <span className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">Save 20%</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card key={plan.name} className={`relative overflow-hidden ${plan.popular ? 'border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-500/10 scale-105' : 'border-slate-200 dark:border-slate-800'}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                )}
                <CardContent className="p-8">
                  {plan.popular && (
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full mb-4">Most Popular</span>
                  )}
                  <h3 className="text-xl font-bold font-display">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-6">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold font-display">
                      ${annual && plan.price > 0 ? Math.round(plan.price * 0.8) : plan.price}
                    </span>
                    <span className="text-slate-500 text-sm">{plan.price > 0 ? plan.period : ''}</span>
                    {plan.price === 0 && <span className="text-slate-500 text-sm ml-1">{plan.period}</span>}
                  </div>
                  <Button className={`w-full rounded-full h-11 mb-6 ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{f}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Loved by developers</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-slate-200 dark:border-slate-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Frequently Asked Questions</h2>
          </div>
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 md:p-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR2MmgtNnYtMTBoNnYtMmgtOHYxNGg4di00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold font-display text-white mb-4">Ready to ship faster?</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-lg mx-auto">Join 10,000+ developers who are building the future with LaunchPad.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 rounded-full px-8 h-12 font-semibold shadow-xl">
                  Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12">
                  Talk to Sales
                </Button>
              </div>
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
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white font-display">LaunchPad</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">The modern platform for building and shipping software at scale.</p>
              <div className="flex gap-3">
                {[Github, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="p-2 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-2.5">
                {['Features', 'Pricing', 'Changelog', 'Docs', 'API Reference'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5">
                {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2.5">
                {['Privacy', 'Terms', 'Security', 'GDPR', 'Status'].map((link) => (
                  <li key={link}><a href="#" className="text-sm hover:text-blue-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; 2026 LaunchPad. All rights reserved.</p>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
