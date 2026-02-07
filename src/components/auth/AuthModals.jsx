import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { RequestResetForm } from './RequestResetForm'
import { ResetPasswordForm } from './ResetPasswordForm'

/**
 * Auth modals – open/close + switch between login, register, reset.
 * Usage:
 *   <AuthModals
 *     open={showAuth}
 *     onOpenChange={setShowAuth}
 *     mode="login"  // login | register | request-reset | reset-password
 *     onLogin={...}
 *     onRegister={...}
 *     onRequestReset={...}
 *     onResetPassword={...}
 *     onOAuth={...}
 *   />
 */
export function AuthModals({
  open,
  onOpenChange,
  mode = 'login',
  onModeChange,
  onLogin,
  onRegister,
  onRequestReset,
  onResetPassword,
  onOAuth,
  loading,
  error,
  success,
}) {
  const switchToLogin = () => onModeChange?.('login')
  const switchToRegister = () => onModeChange?.('register')
  const switchToRequestReset = () => onModeChange?.('request-reset')
  const switchToReset = () => onModeChange?.('reset-password')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {mode === 'login' && (
          <>
            <DialogHeader>
              <DialogTitle>Sign in</DialogTitle>
              <DialogDescription>Enter your credentials to access your account.</DialogDescription>
            </DialogHeader>
            <LoginForm
              onSubmit={onLogin}
              onOAuth={onOAuth}
              onForgotPassword={switchToRequestReset}
              loading={loading}
              error={error}
            />
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <button type="button" onClick={switchToRegister} className="text-primary hover:underline">
                Sign up
              </button>
            </p>
          </>
        )}

        {mode === 'register' && (
          <>
            <DialogHeader>
              <DialogTitle>Create account</DialogTitle>
              <DialogDescription>Register for a new account.</DialogDescription>
            </DialogHeader>
            <RegisterForm
              onSubmit={onRegister}
              onOAuth={onOAuth}
              loading={loading}
              error={error}
            />
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <button type="button" onClick={switchToLogin} className="text-primary hover:underline">
                Sign in
              </button>
            </p>
          </>
        )}

        {mode === 'request-reset' && (
          <>
            <DialogHeader>
              <DialogTitle>Forgot password</DialogTitle>
              <DialogDescription>Enter your email to receive a reset link.</DialogDescription>
            </DialogHeader>
            <RequestResetForm
              onSubmit={onRequestReset}
              onCancel={switchToLogin}
              loading={loading}
              error={error}
              success={success}
            />
          </>
        )}

        {mode === 'reset-password' && (
          <>
            <DialogHeader>
              <DialogTitle>Reset password</DialogTitle>
              <DialogDescription>Enter your new password.</DialogDescription>
            </DialogHeader>
            <ResetPasswordForm
              onSubmit={onResetPassword}
              onCancel={switchToLogin}
              loading={loading}
              error={error}
              success={success}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
