import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { shadesOfPurple } from '@clerk/themes'
import { ThemeProvider } from "./components/theme-provider.tsx"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple,
      variables:{
        colorPrimary:"#3b82f6",
        colorBackground:"#1a202c",
        colorInputBackground:"#2d3748",
        colorInputText:"#f3f4f6"
      },
      elements:{
        formButtonPrimary:"text-white",
        card:"bg-gray-800"
      }

     }} publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        
        <App />
      </ThemeProvider>
    </ClerkProvider>

  </StrictMode>,
)
