import mongoose from 'mongoose'

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, enum: ['office', 'home'], default: 'home', index: true },
    favorite: { type: Boolean, default: false, index: true },
  },
  { timestamps: true }
)

export default mongoose.model('Note', NoteSchema)
