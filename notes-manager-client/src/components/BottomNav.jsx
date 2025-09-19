import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiList, FiBell, FiSettings } from 'react-icons/fi'

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="fixed bottom-2 left-1/2 -translate-x-1/2 w-[min(480px,95vw)] rounded-2xl bg-white/90 backdrop-blur border border-gray-200 shadow-lg px-6 py-2 flex items-center justify-between">
      <Link to="/dashboard" className={`flex flex-col items-center text-xs ${pathname === '/dashboard' ? 'text-gray-900' : 'text-gray-500'}`}>
        <FiHome className="text-lg" />
        Home
      </Link>
      <Link to="/list" className={`flex flex-col items-center text-xs ${pathname === '/list' ? 'text-gray-900' : 'text-gray-500'}`} title="List">
        <FiList className="text-lg" />
        List
      </Link>
      <div className="h-0 w-0" aria-hidden />
      <Link to="/alerts" className={`flex flex-col items-center text-xs ${pathname === '/alerts' ? 'text-gray-900' : 'text-gray-500'}`} title="Notifications">
        <FiBell className="text-lg" />
        Alerts
      </Link>
      <Link to="/settings" className={`flex flex-col items-center text-xs ${pathname === '/settings' ? 'text-gray-900' : 'text-gray-500'}`} title="Settings">
        <FiSettings className="text-lg" />
        Settings
      </Link>
    </nav>
  )
}

