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
import DashboardLayout from '@/layouts/DashboardLayout'
import Users from '@/pages/Users'
import UserProfile from '@/pages/UserProfile'
import AddMeal from '@/pages/AddMeal'
import MealsTable from '@/pages/MealsTable'
import ReviewsList from '@/pages/ReviewsList'
import ServeMeals from '@/pages/ServeMeals'
import Checkout from '@/pages/Checkout'
import PaymentSuccess from '@/pages/PaymentSuccess'
import RequireRole from './RequireRole'
import FoodDetail from '@/pages/MealDetail'
import PaymentHistory from '@/pages/PaymentHistory'

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={(msg = 'Something went wrong!') => <h1>{msg}</h1>}
      >
        <RouterRoutes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='users/:id' element={<UserProfile />} />

            <Route path='meals'>
              <Route index element={<ExploreMeals />} />
              <Route path='upcoming' element={<UpcomingMeals />} />
              <Route path=':mealId' element={<FoodDetail />} />
            </Route>

            <Route element={<RequireNotLogin />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Route>

            <Route element={<RequireLogin />}>
              <Route element={<RequireRole role='user' />}>
                <Route path='checkout/:plan' element={<Checkout />} />
              </Route>
              <Route path='payment-success' element={<PaymentSuccess />} />
            </Route>

            <Route path='*' element={<NotFound />} />
          </Route>

          <Route element={<RequireLogin />}>
            <Route path='dashboard' element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />

              <Route path='meals'>
                <Route index element={<MealsTable />} />
                <Route path='add' element={<AddMeal />} />
                <Route path='serve' element={<ServeMeals />} />
              </Route>

              <Route path='users' element={<Users />} />
              <Route path='users/:id' element={<UserProfile />} />
              <Route path='reviews' element={<ReviewsList />} />
              <Route path='payments' element={<PaymentHistory />} />
            </Route>
          </Route>
        </RouterRoutes>
        <Toaster />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default Routes
