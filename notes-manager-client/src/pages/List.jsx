import { motion } from 'framer-motion'
import BottomNav from '../components/BottomNav.jsx'

export default function List() {
  const sections = [
    { title: 'Inbox', count: 4 },
    { title: 'Work', count: 8 },
    { title: 'Home', count: 5 },
    { title: 'Ideas', count: 3 },
  ]

  return (
    <div className="relative max-w-md mx-auto text-white">
      <div className="absolute inset-x-0 -top-6 h-40 bg-gray-900 rounded-b-3xl shadow-sm" aria-hidden />

      <div className="relative space-y-6">
        <div className="pt-2">
          <h1 className="text-3xl font-semibold tracking-tight">Lists</h1>
          <p className="text-gray-400 mt-1">Organize notes by collection</p>
        </div>

        <motion.ul
          className="space-y-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {sections.map((s) => (
            <li
              key={s.title}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/80"
            >
              <span className="font-medium">{s.title}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">{s.count}</span>
            </li>
          ))}
        </motion.ul>

        <div className="h-24" />
      </div>

      <BottomNav />
    </div>
  )
}
