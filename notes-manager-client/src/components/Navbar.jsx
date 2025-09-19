import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { FiBell } from 'react-icons/fi'
import logo from '../assets/logo.svg'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function Navbar() {
  const { isAuthed, user, logout } = useAuth()
  const navigate = useNavigate()
  const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logo} alt="Notes Manager logo" className="h-8 w-8 rounded-md group-hover:scale-105 transition-transform" />
          <span className="text-lg font-semibold tracking-tight">Notes Manager</span>
        </Link>
        <nav className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-gray-100" title="Notifications">
            <FiBell className="text-lg" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-sky-500 text-white text-[10px] flex items-center justify-center">2</span>
          </button>
          <button
            onClick={() => {
              const root = document.documentElement
              const nextDark = !root.classList.contains('dark')
              root.classList.toggle('dark', nextDark)
              localStorage.setItem('theme', nextDark ? 'dark' : 'light')
            }}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Toggle theme"
          >
            {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
          </button>
          {isAuthed ? (
            <>
              <Link className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100" to="/dashboard">Dashboard</Link>
              <span className="hidden sm:inline text-sm text-gray-500">{user?.email || 'User'}</span>
              <button onClick={handleLogout} className="text-sm px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black">Logout</button>
            </>
          ) : (
            <>
              <Link className="text-sm text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100" to="/login">Login</Link>
              <Link className="text-sm px-3 py-1.5 rounded-md bg-gray-900 text-white hover:bg-black" to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

