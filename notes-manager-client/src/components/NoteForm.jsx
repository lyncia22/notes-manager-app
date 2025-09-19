import { useState } from 'react'

export default function NoteForm({ onSubmit, initial = { title: '', description: '', category: 'home' }, submitLabel = 'Add Note' }) {
  const [form, setForm] = useState(initial)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
    setForm({ title: '', description: '', category: 'home' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g. Meeting notes"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Write your note…"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
          rows={4}
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option value="all" disabled>Choose category</option>
          <option value="office">Office</option>
          <option value="home">Home</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="inline-flex items-center rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
