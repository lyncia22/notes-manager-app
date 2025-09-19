import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import NoteForm from '../components/NoteForm.jsx'
import NoteItem from '../components/NoteItem.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Fab from '../components/Fab.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { motion } from 'framer-motion'
import { FiBook } from 'react-icons/fi'
import toast from 'react-hot-toast'
import Modal from '../components/Modal.jsx'

export default function Dashboard() {
  const { isAuthed, user } = useAuth()
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('all')
  const [editing, setEditing] = useState(null) // note object or null

  useEffect(() => {
    if (!isAuthed) navigate('/login')
  }, [isAuthed, navigate])

  const loadNotes = async () => {
    setError('')
    setLoading(true)
    try {
      const { data } = await api.get('/api/notes')
      setNotes(data || [])
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load notes')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (id) => {
    try {
      const { data } = await api.patch(`/api/notes/${id}/favorite`)
      setNotes((prev) => prev.map((n) => (n._id === id ? data : n)))
      toast.success(data.favorite ? 'Added to favorites' : 'Removed from favorites')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update favorite')
    }
  }

  const startEdit = (note) => setEditing(note)
  const closeEdit = () => setEditing(null)

  const saveEdit = async (updated) => {
    try {
      const { data } = await api.put(`/api/notes/${updated._id}`, {
        title: updated.title,
        description: updated.description,
        category: updated.category,
      })
      setNotes((prev) => prev.map((n) => (n._id === data._id ? data : n)))
      toast.success('Note updated')
      closeEdit()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update note')
    }
  }

  useEffect(() => {
    loadNotes()
  }, [])

  const addNote = async ({ title, description, category }) => {
    try {
      const { data } = await api.post('/api/notes', { title, description, category })
      setNotes((prev) => [data, ...prev])
      toast.success('Note added')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add note')
    }
  }

  const deleteNote = async (id) => {
    try {
      await api.delete(`/api/notes/${id}`)
      setNotes((prev) => prev.filter((n) => n._id !== id))
      toast.success('Note deleted')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete note')
    }
  }

  const filtered = notes.filter((n) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      n.title?.toLowerCase().includes(q) ||
      n.description?.toLowerCase().includes(q)
    )
  })

  let finalList = filtered.filter((n) => {
    if (tab === 'all') return true
    if (tab === 'favorites') return !!n.favorite
    return n.category === tab
  })
  // Sort favorites first when viewing all
  if (tab === 'all') {
    finalList = finalList.slice().sort((a, b) => Number(b.favorite) - Number(a.favorite))
  }

  return (
    <div className="relative">
      {/* Rounded top background like the mock */}
      <div className="absolute inset-x-0 -top-6 h-40 bg-white rounded-b-3xl shadow-sm" aria-hidden />

      <div className="relative max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="pt-2">
          <h1 className="text-3xl font-semibold tracking-tight">My Notes</h1>
          <p className="text-gray-500 mt-1">Your daily notes that reminds you</p>
        </div>

        {/* Search */}
        <SearchBar value={query} onChange={setQuery} placeholder="Search" />

        {/* New note form (top) */}
        <div id="new-note-form" className="bg-white border border-gray-200 rounded-2xl p-4">
          <h2 className="text-base font-semibold mb-2">Add a new note</h2>
          <NoteForm onSubmit={addNote} submitLabel="Add note" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 text-sm">
          {['all', 'office', 'home', 'favorites'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 capitalize ${tab === t ? 'text-gray-900 border-b-2 border-sky-400' : 'text-gray-500'}`}
            >
              {t === 'all' ? 'All notes' : t}
            </button>
          ))}
        </div>

        {/* Notes list */}
        {loading ? (
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-gray-600">Loading…</div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">{error}</div>
        ) : finalList.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <FiBook className="h-6 w-6 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium">No notes match</h2>
            <p className="text-gray-600">Try adjusting your search.</p>
          </div>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {finalList.map((n, i) => (
              <NoteItem key={n._id} note={n} index={i} onDelete={deleteNote} onToggleFavorite={toggleFavorite} onEdit={startEdit} />
            ))}
          </motion.div>
        )}

        {/* Bottom spacing */}
        <div className="h-24" />
      </div>

      {/* Floating action button */}
      <Fab onClick={() => {
        const el = document.getElementById('new-note-form')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }} />

      {/* Bottom navigation */}
      <BottomNav />

      {/* Edit modal */}
      <Modal open={!!editing} onClose={closeEdit} title="Edit note">
        {editing && (
          <NoteForm
            onSubmit={(vals) => saveEdit({ ...editing, ...vals })}
            submitLabel="Save changes"
            initial={{ title: editing.title, description: editing.description, category: editing.category || 'home' }}
          />
        )}
      </Modal>
    </div>
  )
}
