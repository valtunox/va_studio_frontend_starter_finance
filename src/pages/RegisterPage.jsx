import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { RegisterForm } from '@/components/auth'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function RegisterPage() {
  const { register, error, loading, clearError } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (data) => {
    clearError()
    const result = await register(data)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  const handleOAuth = (provider) => {
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5112/api/v1'
    window.location.href = `${backendUrl}/oauth/${provider}/authorize`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            VA Studio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Create your account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create account</CardTitle>
            <CardDescription>Register for a new account to start building.</CardDescription>
          </CardHeader>
          <CardContent>
            <RegisterForm
              onSubmit={handleRegister}
              onOAuth={handleOAuth}
              loading={loading}
              error={error}
            />
            <p className="text-sm text-center text-muted-foreground mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
