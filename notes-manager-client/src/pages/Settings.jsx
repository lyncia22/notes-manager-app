import { useState } from 'react'
import { FiSave as Save, FiDroplet as Palette, FiBell as Bell, FiShield as Shield, FiDownload as Download, FiUpload as Upload } from 'react-icons/fi'
import toast from 'react-hot-toast'
import BottomNav from '../components/BottomNav.jsx'

// Basic app settings type shape reference (JS)
// theme: 'light' | 'dark'
// showPreview: boolean
// defaultCategory: 'personal' | 'work' | 'ideas' | 'important'
// autoSave: boolean

export default function Settings() {
  const initialTheme = (() => {
    if (typeof document === 'undefined') return 'light'
    const stored = localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') return stored
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })()
  const [localSettings, setLocalSettings] = useState({
    theme: initialTheme,
    showPreview: true,
    defaultCategory: 'personal',
    autoSave: true,
  })

  const applyTheme = (nextTheme) => {
    const root = document.documentElement
    if (nextTheme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', nextTheme)
  }

  const handleSave = () => {
    // In a fuller app, persist to context or backend
    toast.success('Settings saved')
  }

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        {
          label: 'Theme',
          type: 'select',
          value: localSettings.theme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
          ],
          onChange: (value) => { setLocalSettings({ ...localSettings, theme: value }); applyTheme(value) },
        },
        {
          label: 'Theme Preview',
          type: 'custom',
          render: () => (
            <div className="flex gap-2">
              <button
                onClick={() => { setLocalSettings({ ...localSettings, theme: 'light' }); applyTheme('light') }}
                className={`px-3 py-2 rounded-lg border ${localSettings.theme === 'light' ? 'border-sky-500 ring-2 ring-sky-200' : 'border-gray-200 dark:border-gray-700'} bg-white text-gray-900`}
              >
                Light
              </button>
              <button
                onClick={() => { setLocalSettings({ ...localSettings, theme: 'dark' }); applyTheme('dark') }}
                className={`px-3 py-2 rounded-lg border ${localSettings.theme === 'dark' ? 'border-sky-500 ring-2 ring-sky-500/30' : 'border-gray-200 dark:border-gray-700'} bg-gray-900 text-white`}
              >
                Dark
              </button>
            </div>
          )
        },
        {
          label: 'Show Preview',
          type: 'toggle',
          value: localSettings.showPreview,
          onChange: (value) => setLocalSettings({ ...localSettings, showPreview: value }),
        },
      ],
    },
    {
      title: 'Notes',
      icon: Bell,
      items: [
        {
          label: 'Default Category',
          type: 'select',
          value: localSettings.defaultCategory,
          options: [
            { value: 'personal', label: 'Personal' },
            { value: 'work', label: 'Work' },
            { value: 'ideas', label: 'Ideas' },
            { value: 'important', label: 'Important' },
          ],
          onChange: (value) => setLocalSettings({ ...localSettings, defaultCategory: value }),
        },
        {
          label: 'Auto Save',
          type: 'toggle',
          value: localSettings.autoSave,
          onChange: (value) => setLocalSettings({ ...localSettings, autoSave: value }),
        },
      ],
    },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 text-xs font-medium border border-sky-200">
          <Palette className="h-4 w-4" /> Personalize
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-600 mt-1">Customize your note-taking experience</p>
      </div>

      {settingsSections.map((section) => {
        const Icon = section.icon
        return (
          <div key={section.title} className="bg-white/90 backdrop-blur rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-3 p-5 border-b border-gray-100">
              <div className={`p-2 rounded-lg ${
                section.title === 'Appearance'
                  ? 'text-blue-600 bg-blue-100'
                  : 'text-purple-600 bg-purple-100'
              }`}>
                <Icon size={20} />
              </div>
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>

            <div className="p-5 space-y-5">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <label className="text-sm font-medium text-gray-900">{item.label}</label>

                  <div>
                    {item.type === 'select' && (
                      <select
                        value={item.value}
                        onChange={(e) => item.onChange(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all bg-white"
                      >
                        {item.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {item.type === 'toggle' && (
                      <button
                        onClick={() => item.onChange(!item.value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.value ? 'bg-sky-600' : 'bg-gray-200'
                        }`}
                        aria-pressed={item.value}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}

                    {item.type === 'custom' && (
                      <div>
                        {item.render()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
            <Shield size={20} />
          </div>
          <h2 className="text-lg font-semibold">Data Management</h2>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors">
              <Download size={16} />
              Export Notes
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload size={16} />
              Import Notes
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2 shadow"
        >
          <Save size={16} />
          Save Settings
        </button>
      </div>
      <BottomNav />
    </div>
  )
}
