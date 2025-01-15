import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthProvider'
import { useToast } from '@/hooks/use-toast'
import { FormEventHandler, useRef, useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router'

const Login = () => {
  const { state } = useLocation()
  const targetDestination = state?.from?.pathname || '/'

  const [passErr, setPassErr] = useState(false)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const [isLoadingPassword, setIsLoadingPassword] = useState(false)

  const { loginWithGoogle, user, loading, logIn } = useAuth()

  const { toast } = useToast()

  const mailRef = useRef<null | HTMLInputElement>(null)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setPassErr(false)

    const { email, password } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as {
      email: string
      password: string
    }

    const isValidEmail = RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
    ).test(email)

    const isValidPassword = RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{6,}$'
    ).test(password)

    setPassErr(!isValidPassword)

    if (!isValidEmail || !isValidPassword) {
      return toast({
        title: 'Invalid Credentials!',
        description: 'Email or Password is invalid.',
      })
    }

    setIsLoadingPassword(true)
    logIn(email, password)
      .catch((error) => {
        return toast({
          title: 'Login Error!',
          description: error.message,
        })
      })
      .finally(() => setIsLoadingPassword(false))
  }

  const handleGoogleLogin = () => {
    loginWithGoogle().finally(() => setIsLoadingGoogle(false))
  }

  if (!loading && user) return <Navigate to={targetDestination} />

  return (
    <section className={`login-page`}>
      <div className='con my-12'>
        <form onSubmit={handleSubmit}>
          <Card className='mx-auto max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='m@example.com'
                    required
                    autoComplete='email'
                    ref={mailRef}
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    name='password'
                    required
                    placeholder='Type your password.'
                    autoComplete='current-password'
                  />
                  {passErr && (
                    <span className='text-red-500 text-sm'>
                      Password must be at least 6 characters long
                      <br />
                      one uppercase letter
                      <br />
                      one lowercase letter
                      <br />
                      one number
                      <br />
                      one special character.
                    </span>
                  )}
                </div>
                <Button type='submit' className='w-full'>
                  {isLoadingPassword ? 'Loading...' : 'Login'}
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  type='button'
                  onClick={handleGoogleLogin}
                >
                  {isLoadingGoogle ? 'Loading...' : 'Login with Google'}
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                <span>Don&apos;t have an account?</span>{' '}
                <Link to='/signup' className='underline'>
                  Signup
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  )
}

export default Login
