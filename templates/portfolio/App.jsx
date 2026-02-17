import { useState } from 'react'
import {
  Github, Linkedin, Mail, Menu, X, ExternalLink, ArrowRight, ArrowUpRight,
  Code2, Palette, Globe, Smartphone, Star, Download, MapPin, Calendar,
  Briefcase, GraduationCap, Award, ChevronRight, Twitter, Dribbble,
  Send, CheckCircle2, Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  { icon: Code2, title: 'Web Development', desc: 'Building performant, scalable web applications with modern frameworks and best practices.' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Crafting intuitive, beautiful interfaces that delight users and drive engagement.' },
  { icon: Globe, title: 'Cloud & DevOps', desc: 'Deploying and managing infrastructure on AWS, GCP, and Azure with CI/CD pipelines.' },
  { icon: Smartphone, title: 'Mobile Apps', desc: 'Cross-platform mobile development with React Native and Flutter.' },
]

const skills = [
  { name: 'React / Next.js', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'Python / Django', level: 85 },
  { name: 'Go', level: 75 },
  { name: 'PostgreSQL / MongoDB', level: 82 },
  { name: 'AWS / Docker / K8s', level: 80 },
  { name: 'Tailwind / Figma', level: 92 },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Go', 'PostgreSQL',
  'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'GraphQL',
  'Tailwind CSS', 'Figma', 'Git', 'CI/CD'
]

const projects = [
  { id: 1, title: 'FinTrack Dashboard', desc: 'Real-time financial analytics platform with interactive charts, portfolio tracking, and AI-powered insights.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', tags: ['React', 'D3.js', 'Node.js', 'PostgreSQL'], link: '#', featured: true },
  { id: 2, title: 'ShopFlow E-Commerce', desc: 'Full-stack e-commerce platform with real-time inventory, payment processing, and admin dashboard.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', tags: ['Next.js', 'Stripe', 'Prisma', 'Tailwind'], link: '#', featured: true },
  { id: 3, title: 'CloudSync Platform', desc: 'Enterprise file synchronization service with end-to-end encryption and team collaboration.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop', tags: ['Go', 'AWS S3', 'WebSocket', 'Docker'], link: '#', featured: true },
  { id: 4, title: 'HealthPulse App', desc: 'Mobile health tracking application with wearable device integration and personalized recommendations.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', tags: ['React Native', 'Firebase', 'ML Kit'], link: '#', featured: false },
  { id: 5, title: 'DevOps Pipeline Tool', desc: 'Automated CI/CD pipeline builder with visual workflow editor and multi-cloud deployment.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', tags: ['Go', 'Terraform', 'Kubernetes', 'gRPC'], link: '#', featured: false },
  { id: 6, title: 'AI Content Studio', desc: 'AI-powered content generation platform with multi-model support and collaborative editing.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', tags: ['Python', 'FastAPI', 'OpenAI', 'React'], link: '#', featured: false },
]

const experience = [
  { role: 'Senior Full-Stack Engineer', company: 'TechCorp Inc.', period: '2023 - Present', desc: 'Leading a team of 8 engineers building a next-gen SaaS platform. Architected microservices handling 10M+ requests/day.', type: 'work' },
  { role: 'Full-Stack Developer', company: 'StartupXYZ', period: '2021 - 2023', desc: 'Built the core product from 0 to 50K users. Implemented real-time features, payment systems, and analytics.', type: 'work' },
  { role: 'Frontend Developer', company: 'DigitalAgency', period: '2019 - 2021', desc: 'Delivered 20+ client projects including e-commerce, SaaS dashboards, and marketing sites.', type: 'work' },
  { role: 'M.S. Computer Science', company: 'Stanford University', period: '2017 - 2019', desc: 'Focus on distributed systems and machine learning. Published 2 papers on scalable web architectures.', type: 'education' },
]

const testimonials = [
  { name: 'Sarah Mitchell', role: 'CTO, TechCorp', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', text: 'One of the most talented engineers I\'ve worked with. Consistently delivers exceptional quality and mentors the team brilliantly.' },
  { name: 'David Park', role: 'Founder, StartupXYZ', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', text: 'Transformed our product architecture and helped us scale from 0 to 50K users. A true full-stack powerhouse.' },
  { name: 'Lisa Chen', role: 'Product Lead, DigitalAgency', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', text: 'Incredible attention to detail and a deep understanding of both design and engineering. Every project was delivered flawlessly.' },
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Dribbble, href: '#', label: 'Dribbble' },
]

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [contactSent, setContactSent] = useState(false)

  const filteredProjects = activeFilter === 'all'
    ? projects
    : activeFilter === 'featured'
      ? projects.filter((p) => p.featured)
      : projects

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">

      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-bold font-display">
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">JD</span>
            <span className="text-white/60 font-normal ml-1">portfolio</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-slate-400 hover:text-white transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <Button size="sm" className="bg-violet-600 hover:bg-violet-700 rounded-full px-5">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Resume
            </Button>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-slate-400 hover:text-white">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden px-6 pb-6 space-y-1 border-t border-white/5">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="block py-3 text-slate-400 hover:text-white transition-colors">{item.label}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(217,70,239,0.1),transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-8">
                <Sparkles className="w-4 h-4" /> Available for freelance work
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  John Doe
                </span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
                Senior Full-Stack Engineer crafting exceptional digital experiences. I turn complex problems into elegant, performant solutions.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Button size="lg" className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 h-12 shadow-lg shadow-violet-600/25">
                  View My Work <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-white/10 text-white hover:bg-white/5">
                  Get in Touch
                </Button>
              </div>
              <div className="flex items-center gap-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all" aria-label={label}>
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 blur-3xl opacity-30 animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
                    alt="John Doe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-xl">
                  <p className="text-sm font-semibold">7+ Years</p>
                  <p className="text-xs text-slate-400">Experience</p>
                </div>
                <div className="absolute -top-4 -left-4 px-4 py-2 bg-slate-900 border border-white/10 rounded-xl shadow-xl">
                  <p className="text-sm font-semibold">50+ Projects</p>
                  <p className="text-xs text-slate-400">Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Services */}
      <section id="about" className="py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">What I Do</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Services & Expertise</h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">I specialize in building end-to-end digital products, from concept and design through to deployment and scaling.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="bg-white/[0.03] border-white/5 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="font-semibold font-display text-lg mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">My Skills</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-8">Technical Proficiency</h2>
              <div className="space-y-5">
                {skills.map(({ name, level }) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">{name}</span>
                      <span className="text-slate-400">{level}%</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000" style={{ width: `${level}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Tech Stack</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3 mb-8">Tools I Use</h2>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-sm text-slate-300 hover:border-violet-500/30 hover:text-white transition-all cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 border border-violet-500/10">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold font-display">50+</p>
                    <p className="text-sm text-slate-400 mt-1">Projects</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-display">30+</p>
                    <p className="text-sm text-slate-400 mt-1">Clients</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold font-display">7+</p>
                    <p className="text-sm text-slate-400 mt-1">Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="work" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Portfolio</span>
              <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Selected Work</h2>
            </div>
            <div className="flex gap-2">
              {['all', 'featured'].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${activeFilter === f ? 'bg-violet-600 text-white' : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="bg-white/[0.03] border-white/5 overflow-hidden group hover:border-violet-500/20 transition-all duration-300">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <a href={project.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-violet-400 transition-colors">
                      View Project <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold font-display text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs bg-violet-500/10 text-violet-300 rounded-md">{tag}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Background</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Experience & Education</h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div key={i} className="relative pl-20">
                  <div className={`absolute left-6 top-1 w-4 h-4 rounded-full border-2 ${exp.type === 'work' ? 'bg-violet-600 border-violet-400' : 'bg-fuchsia-600 border-fuchsia-400'}`} />
                  <div className="p-6 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-slate-400">{exp.period}</span>
                      {exp.type === 'work' ? <Briefcase className="w-4 h-4 text-violet-400" /> : <GraduationCap className="w-4 h-4 text-fuchsia-400" />}
                    </div>
                    <h3 className="font-semibold font-display text-lg">{exp.role}</h3>
                    <p className="text-violet-400 text-sm mb-2">{exp.company}</p>
                    <p className="text-sm text-slate-400 leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">What People Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-white/[0.03] border-white/5 hover:border-violet-500/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-sm">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-violet-400 uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-3">Let's Work Together</h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto">Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.</p>
          </div>
          <Card className="bg-white/[0.03] border-white/5 max-w-2xl mx-auto">
            <CardContent className="p-8">
              {contactSent ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                  <p className="text-slate-400">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Name</label>
                      <Input placeholder="John Smith" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 mb-1.5 block">Email</label>
                      <Input type="email" placeholder="john@example.com" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Subject</label>
                    <Input placeholder="Project inquiry" className="bg-white/5 border-white/10 text-white placeholder:text-slate-500" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">Message</label>
                    <textarea
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="flex w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                    />
                  </div>
                  <Button onClick={() => setContactSent(true)} className="w-full bg-violet-600 hover:bg-violet-700 h-12 rounded-xl">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-bold font-display text-lg bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">JD</span>
            <p className="text-sm text-slate-500 mt-1">&copy; 2026 John Doe. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} className="p-2 text-slate-500 hover:text-white transition-colors" aria-label={label}>
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
