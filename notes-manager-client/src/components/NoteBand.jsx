import { motion } from 'framer-motion'
import { AiFillStar, AiOutlineStar, AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'

export default function NoteBand({ note, onDelete, onToggleFavorite, onEdit, index = 0, overlap = false }) {
  const { user } = useAuth()
  const created = note.createdAt ? new Date(note.createdAt) : null
  const dateLabel = created ? created.toLocaleString(undefined, { day: '2-digit', month: 'short', hour: 'numeric', minute: '2-digit' }) : ''
  const initials = (user?.email || 'User').split('@')[0].slice(0, 2).toUpperCase()

  // Pastel gradient bands locked to mock-like palette
  const gradients = [
    'from-rose-300 to-pink-400',       // pink
    'from-fuchsia-400 to-violet-500',  // magenta/violet
    'from-indigo-500 to-blue-600',     // blue
    'from-slate-600 to-slate-800',     // deep slate
  ]
  const gradient = gradients[index % gradients.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`${overlap && index > 0 ? '-mt-10' : ''}`}
    >
      <div className={`relative overflow-hidden rounded-3xl p-5 shadow-md text-white bg-gradient-to-br ${gradient}`}>
        {/* Curved accent at top-left like mock */}
        <div className="absolute -top-16 -left-20 h-52 w-52 rounded-full bg-white/15" />

        {/* Date */}
        <div className="relative flex items-start justify-between">
          <p className="text-xs/none opacity-90">{dateLabel}</p>
        </div>

        {/* Star toggle floating at right */}
        <button
          title="Favorite"
          onClick={() => onToggleFavorite?.(note._id)}
          className={`absolute top-4 right-4 p-1.5 rounded-full transition-colors ${note.favorite ? 'bg-white/20 hover:bg-white/25' : 'hover:bg-white/10'}`}
          aria-pressed={note.favorite}
        >
          {note.favorite ? <AiFillStar className="h-5 w-5" /> : <AiOutlineStar className="h-5 w-5 opacity-80" />}
        </button>

        <h3 className="relative mt-3 text-2xl font-semibold tracking-tight leading-tight">{note.title}</h3>
        <p className="relative mt-1 text-[13px] leading-relaxed opacity-95">{note.description}</p>

        <div className="relative mt-5 flex items-center gap-2">
          <button
            onClick={() => onEdit?.(note)}
            className="text-xs px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/25 backdrop-blur inline-flex items-center gap-1"
          >
            <FiEdit className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={() => onDelete?.(note._id)}
            className="text-xs px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/25 backdrop-blur inline-flex items-center gap-1"
          >
            <AiOutlineDelete className="h-4 w-4" /> Delete
          </button>
          <div className="ml-auto h-7 w-7 rounded-full bg-white/80 text-gray-900 grid place-items-center text-[10px] font-semibold shadow">{initials}</div>
        </div>
      </div>
    </motion.div>
  )
}
