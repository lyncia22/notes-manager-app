export default function Fab({ onClick, children = '+', className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-20 left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-sky-500 text-white shadow-xl hover:bg-sky-600 active:scale-95 transition ${className}`}
      aria-label="Add"
    >
      {children}
    </button>
  )
}
