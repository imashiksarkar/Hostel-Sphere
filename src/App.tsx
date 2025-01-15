import { BrowserRouter, Route, Routes } from 'react-router'
import '@/assets/css/Global.css'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import Login from '@/pages/Login'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/contexts/AuthProvider'
import MainLayout from '@/layouts/MainLayout'
import Signup from '@/pages/Signup'
import NotFound from '@/pages/NotFound'
import Home from '@/pages/Home'
import ErrorBoundary from './components/ErrorBoundary'

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider storageKey='hs-ui-theme'>
        <BrowserRouter>
          <ErrorBoundary
            fallback={(msg = 'Something went wrong!') => <h1>{msg}</h1>}
          >
            <Routes>
              <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path='login' element={<Login />} />
                <Route path='signup' element={<Signup />} />
              </Route>
              <Route path='/*' element={<NotFound />} />
            </Routes>
            <Toaster />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
