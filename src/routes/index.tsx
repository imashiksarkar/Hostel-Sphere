import ErrorBoundary from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/toaster'
import MainLayout from '@/layouts/MainLayout'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Signup from '@/pages/Signup'
import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router'
import RequireNotLogin from './RequireNotLogin'
import RequireLogin from './RequireLogin'
import Dashboard from '@/pages/Dashboard'
import ExploreMeals from '@/pages/ExploreMeals'
import UpcomingMeals from '@/pages/UpcomingMeals'

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={(msg = 'Something went wrong!') => <h1>{msg}</h1>}
      >
        <RouterRoutes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />

            <Route path='meals'>
              <Route index element={<ExploreMeals />} />
              <Route path='upcoming' element={<UpcomingMeals />} />
            </Route>

            <Route element={<RequireNotLogin />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>

            <Route element={<RequireLogin />}>
              <Route path='dashboard' element={<Dashboard />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Route>
        </RouterRoutes>
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default Routes
