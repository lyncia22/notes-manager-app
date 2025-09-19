import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast'

// Apply theme early
if (typeof document !== 'undefined') {
  const root = document.documentElement
  const stored = localStorage.getItem('theme')
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme = stored || (prefersDark ? 'dark' : 'light')
  root.classList.toggle('dark', theme === 'dark')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

