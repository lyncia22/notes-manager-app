import { FiSearch } from 'react-icons/fi'

export default function SearchBar({ value, onChange, placeholder = 'Search' }) {
  return (
    <div className="relative">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/80 border border-gray-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300
        dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-gray-600"
      />
    </div>
  )
}
