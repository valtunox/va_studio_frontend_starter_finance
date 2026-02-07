import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Reset password form – new password + confirm.
 * Usage: <ResetPasswordForm onSubmit={handleReset} token={token} />
 */
export function ResetPasswordForm({
  onSubmit,
  onCancel,
  loading = false,
  error,
  success,
  className,
}) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirm) return
    onSubmit?.({ password })
  }

  const match = password && confirm && password === confirm
  const mismatch = password && confirm && password !== confirm

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
          <Label htmlFor="reset-password">New password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="reset-password"
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

        <div>
          <Label htmlFor="reset-confirm">Confirm password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="reset-confirm"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={`pl-10 ${mismatch ? 'border-red-500' : ''}`}
              required
            />
          </div>
          {mismatch && (
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
          )}
        </div>

        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className={onCancel ? 'flex-1' : 'w-full'}
            disabled={loading || !match || mismatch}
          >
            {loading ? 'Updating...' : 'Reset password'}
          </Button>
        </div>
      </div>
    </form>
  )
}
