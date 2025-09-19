export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2'
  const variants = {
    primary: 'bg-gray-900 text-white hover:bg-black focus-visible:ring-gray-400',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus-visible:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-400',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-900',
  }
  const styles = `${base} ${variants[variant] || variants.primary} ${className}`
  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
