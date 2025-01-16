import '@/assets/css/Global.css'
import AuthProvider from '@/contexts/AuthProvider'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import Routes from '@/routes'

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider storageKey='hs-ui-theme'>
        <Routes />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
