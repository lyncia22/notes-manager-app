import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open = false, onClose, title, children }) {
  const overlayRef = useRef(null)
  const dialogRef = useRef(null)

  // Close on ESC
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Trap basic focus when opening
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement
    dialogRef.current?.focus()
    return () => {
      if (prev && prev.focus) prev.focus()
    }
  }, [open])

  // Prevent background scroll when open
  useEffect(() => {
    if (!open) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [open])

  const content = (
    <AnimatePresence>
      {open && (
        <div
          aria-hidden={!open}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Overlay */}
          <motion.div
            ref={overlayRef}
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === overlayRef.current) onClose?.()
            }}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === 'string' ? title : undefined}
            className="relative z-10 w-full max-w-md mx-4"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            tabIndex={-1}
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden text-gray-900 dark:text-white">
              {title ? (
                <div className="px-5 py-4 border-b border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <button
                    type="button"
                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 dark:text-gray-300"
                    onClick={() => onClose?.()}
                    aria-label="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : null}
              <div className="p-5">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )

  const portalRoot = typeof document !== 'undefined' ? document.body : null
  return portalRoot ? createPortal(content, portalRoot) : null
}
