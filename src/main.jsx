import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import { RouterProvider } from 'react-router'
import { myRouter } from './assets/Routing/AppRouting'
import AuthContextProvider from './assets/Context/AuthContext'
import AuthUserData from './assets/Context/AuthUserData'
import { ThemeProvider } from './assets/Context/ThemeContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient  =  new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
     <AuthContextProvider>
     <AuthUserData>
      <ThemeProvider>
        <HeroUIProvider>
          <RouterProvider router={myRouter} />
        </HeroUIProvider>
      </ThemeProvider>
     </AuthUserData>
     </AuthContextProvider>
     </QueryClientProvider>
  </StrictMode>,
)

