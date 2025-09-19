import { Router } from 'express'
import { body, param } from 'express-validator'
import { authRequired } from '../middleware/auth.js'
import { createNote, deleteNote, listNotes, updateNote, toggleFavorite } from '../controllers/notesController.js'

const router = Router()

router.use(authRequired)

router.post(
  '/',
  [
    body('title').isString().isLength({ min: 1 }).withMessage('Title is required'),
    body('description').isString().isLength({ min: 1 }).withMessage('Description is required'),
    body('category').optional().isIn(['office', 'home']).withMessage('Invalid category'),
  ],
  createNote
)

router.get('/', listNotes)

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Valid note id required'),
    body('title').isString().isLength({ min: 1 }).withMessage('Title is required'),
    body('description').isString().isLength({ min: 1 }).withMessage('Description is required'),
    body('category').optional().isIn(['office', 'home']).withMessage('Invalid category'),
  ],
  updateNote
)

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Valid note id required')],
  deleteNote
)

router.patch(
  '/:id/favorite',
  [param('id').isMongoId().withMessage('Valid note id required')],
  toggleFavorite
)

export default router
