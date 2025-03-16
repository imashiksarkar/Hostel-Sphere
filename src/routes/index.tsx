import AuthSkeleton from '@/components/AuthSkeleton'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/toaster'
import DashboardLayout from '@/layouts/DashboardLayout'
import MainLayout from '@/layouts/MainLayout'
import AddMeal from '@/pages/AddMeal'
import Checkout from '@/pages/Checkout'
import Dashboard from '@/pages/Dashboard'
import ExploreMeals from '@/pages/ExploreMeals'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import FoodDetail from '@/pages/MealDetail'
import MealsTable from '@/pages/MealsTable'
import NotFound from '@/pages/NotFound'
import PaymentHistory from '@/pages/PaymentHistory'
import PaymentSuccess from '@/pages/PaymentSuccess'
import ReviewsList from '@/pages/ReviewsList'
import ServeMeals from '@/pages/ServeMeals'
import Signup from '@/pages/Signup'
import UpcomingMeals from '@/pages/UpcomingMeals'
import UserProfile from '@/pages/UserProfile'
import Users from '@/pages/Users'
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router'
import RequireLogin from './RequireLogin'
import RequireNotLogin from './RequireNotLogin'
import RequireRole from './RequireRole'

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

            <Route element={<RequireNotLogin loader={<AuthSkeleton />} />}>
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
