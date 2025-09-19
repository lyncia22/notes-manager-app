import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Drawer({ open, onClose, children, side = 'left', width = 320, title }) {
  const portalRoot = typeof document !== 'undefined' ? document.body : null

  const isLeft = side === 'left'

  const content = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose?.()}
          />

          {/* Panel */}
          <motion.aside
            className={`absolute top-0 h-full bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-white/10 shadow-xl rounded-${isLeft ? 'r' : 'l'}-2xl overflow-hidden`}
            style={{ width, [isLeft ? 'left' : 'right']: 8 }}
            initial={{ x: isLeft ? -width - 24 : width + 24, opacity: 0.9 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isLeft ? -width - 24 : width + 24, opacity: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            {title ? (
              <div className="px-4 py-3 border-b border-gray-200/70 dark:border-white/10 text-gray-900 dark:text-white font-semibold">
                {title}
              </div>
            ) : null}
            <div className="p-4">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )

  return portalRoot ? createPortal(content, portalRoot) : null
}
