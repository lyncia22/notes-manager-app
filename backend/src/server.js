import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'

dotenv.config()

const app = express()

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

// Health
app.get('/health', (_req, res) => res.json({ ok: true }))

// Welcome message on root
app.get('/', (_req, res) => res.json({ message: 'Welcome to the Notes Manager API' }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/notes', notesRoutes)

const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
  })
