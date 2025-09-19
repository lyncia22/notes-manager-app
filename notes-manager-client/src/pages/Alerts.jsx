import { FiBell } from 'react-icons/fi'
import BottomNav from '../components/BottomNav.jsx'

export default function Alerts() {
  const alerts = [
    { id: 1, title: 'Reminder: Standup meeting at 9:30', time: 'Today, 9:00' },
    { id: 2, title: 'Note "Design brief" due tomorrow', time: 'Today, 14:00' },
    { id: 3, title: 'New comment on "Marketing plan"', time: 'Yesterday, 18:22' },
  ]

  return (
    <div className="relative max-w-md mx-auto text-white">
      <div className="absolute inset-x-0 -top-6 h-40 bg-gray-900 rounded-b-3xl shadow-sm" aria-hidden />

      <div className="relative space-y-6">
        <div className="pt-2">
          <h1 className="text-3xl font-semibold tracking-tight">Alerts</h1>
          <p className="text-gray-400 mt-1">Notifications about your notes</p>
        </div>

        <ul className="space-y-3">
          {alerts.map(a => (
            <li key={a.id} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-yellow-400 text-gray-900 flex items-center justify-center">
                <FiBell />
              </div>
              <div>
                <div className="text-sm font-medium">{a.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{a.time}</div>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-24" />
      </div>

      <BottomNav />
    </div>
  )
}
