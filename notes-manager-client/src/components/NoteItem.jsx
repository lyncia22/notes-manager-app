import { motion } from 'framer-motion'
import { AiFillStar, AiOutlineStar, AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext.jsx'

export default function NoteItem({ note, onDelete, onToggleFavorite, onEdit, index = 0 }) {
  const { user } = useAuth()
  const created = note.createdAt ? new Date(note.createdAt) : null
  const dateLabel = created ? created.toLocaleString(undefined, { day: '2-digit', month: 'short', hour: 'numeric', minute: '2-digit' }) : ''
  const initials = (user?.email || 'User').split('@')[0].slice(0, 2).toUpperCase()

  // Rotating gradient palette for non-favorites
  const gradients = [
    'from-rose-300 to-pink-400',
    'from-fuchsia-400 to-violet-500',
    'from-indigo-500 to-blue-600',
    'from-slate-600 to-slate-800',
  ]
  const gradient = gradients[index % gradients.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-3xl p-4 shadow-md ${
        note.favorite
          ? 'bg-yellow-400 text-gray-900'
          : `text-white bg-gradient-to-br ${gradient}`
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Left rail: star + date */}
        <div className="flex flex-col items-center gap-2">
          <button
            title="Favorite"
            onClick={() => onToggleFavorite?.(note._id)}
            className={`p-1.5 rounded-full transition-colors ${note.favorite ? 'bg-black/10 hover:bg-black/15' : 'bg-white/20 hover:bg-white/25 backdrop-blur'}`}
          >
            {note.favorite ? <AiFillStar className="h-5 w-5" /> : <AiOutlineStar className="h-5 w-5" />}
          </button>
          <p className={`text-[11px] ${note.favorite ? 'text-gray-800/80' : 'opacity-90'}`}>{dateLabel}</p>
        </div>

        {/* Middle content */}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold tracking-tight ${note.favorite ? 'text-gray-900' : ''}`}>{note.title}</h3>
          <p className={`mt-0.5 text-sm ${note.favorite ? 'text-gray-800/90' : 'opacity-95'}`}>{note.description}</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onEdit?.(note)}
              className={`text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1 ${
                note.favorite ? 'bg-black/10 hover:bg-black/15' : 'bg-white/20 hover:bg-white/25 backdrop-blur'
              }`}
            >
              <FiEdit className="h-4 w-4" /> Edit
            </button>
            <button
              onClick={() => onDelete?.(note._id)}
              className={`text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1 ${
                note.favorite ? 'bg-black/10 hover:bg-black/15' : 'bg-white/20 hover:bg-white/25 backdrop-blur'
              }`}
            >
              <AiOutlineDelete className="h-4 w-4" /> Delete
            </button>
          </div>
        </div>

        {/* Right avatar */}
        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold shadow ${
          note.favorite ? 'bg-white/80 text-gray-900' : 'bg-white/80 text-gray-900'
        }`}>
          {initials}
        </div>
      </div>
    </motion.div>
  )
}
