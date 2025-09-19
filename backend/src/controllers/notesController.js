import { validationResult } from 'express-validator'
import Note from '../models/Note.js'

export async function createNote(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid input', errors: errors.array() })

  const { title, description, category } = req.body
  try {
    const note = await Note.create({ userId: req.user.id, title, description, category })
    return res.status(201).json(note)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function listNotes(req, res) {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 })
    return res.json(notes)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function updateNote(req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ message: 'Invalid input', errors: errors.array() })

  const { id } = req.params
  const { title, description, category } = req.body
  try {
    const updated = await Note.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: { title, description, category } },
      { new: true }
    )
    if (!updated) return res.status(404).json({ message: 'Note not found' })
    return res.json(updated)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function deleteNote(req, res) {
  const { id } = req.params
  try {
    const deleted = await Note.findOneAndDelete({ _id: id, userId: req.user.id })
    if (!deleted) return res.status(404).json({ message: 'Note not found' })
    return res.json({ ok: true })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}

export async function toggleFavorite(req, res) {
  const { id } = req.params
  try {
    const note = await Note.findOne({ _id: id, userId: req.user.id })
    if (!note) return res.status(404).json({ message: 'Note not found' })
    note.favorite = !note.favorite
    await note.save()
    return res.json(note)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Server error' })
  }
}
