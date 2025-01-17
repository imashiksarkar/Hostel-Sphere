import '@/assets/css/Global.css'
import AuthProvider from '@/contexts/AuthProvider'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import Routes from '@/routes'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const App = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider storageKey='hs-ui-theme'>
          <Routes />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
