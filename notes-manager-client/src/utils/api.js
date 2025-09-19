import axios from 'axios'

const api = axios.create({
  // In dev: leave baseURL empty so requests go to the same origin (Vite proxy will forward /api -> backend)
  // In prod: set VITE_API_URL to your backend URL, e.g. https://yourdomain.com
  baseURL: import.meta.env.VITE_API_URL || '',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
