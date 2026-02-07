import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Request password reset – enter email to receive reset link.
 * Usage: <RequestResetForm onSubmit={handleRequest} />
 */
export function RequestResetForm({
  onSubmit,
  onCancel,
  loading = false,
  error,
  success,
  className,
}) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.({ email })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {error && (
        <div className="mb-4 p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 rounded-md">
          {success}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <Label htmlFor="request-email">Email</Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="request-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            We&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Back
            </Button>
          )}
          <Button type="submit" className={onCancel ? 'flex-1' : 'w-full'} disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </div>
      </div>
    </form>
  )
}
