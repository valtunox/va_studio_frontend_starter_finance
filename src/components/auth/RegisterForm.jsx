import { useState } from 'react'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { OAuthButtons } from './OAuthButtons'

/**
 * Register form – name, email, password + OAuth.
 * Usage: <RegisterForm onSubmit={handleRegister} onOAuth={handleOAuth} />
 */
export function RegisterForm({
  onSubmit,
  onOAuth,
  loading = false,
  error,
  className,
  requireTerms = true,
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (requireTerms && !acceptTerms) return
    onSubmit?.({ name, email, password })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md">
          {error}
        </div>
      )}

      <OAuthButtons onOAuth={onOAuth} />

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or register with email</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="register-name">Full name</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="register-name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="register-email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="register-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="register-password">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">At least 8 characters</p>
        </div>

        {requireTerms && (
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="register-terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 rounded border-input"
            />
            <Label htmlFor="register-terms" className="text-sm font-normal cursor-pointer">
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            </Label>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading || (requireTerms && !acceptTerms)}>
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </div>
    </form>
  )
}
