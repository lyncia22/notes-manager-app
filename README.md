# Notes Manager App

A full‑stack notes application with authentication, a modern mobile‑inspired UI, light/dark themes, and a Node/Express + MongoDB backend.

## Tech Stack
- **Frontend**: Vite + React, Tailwind CSS, Framer Motion, React Router, React Hot Toast
- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs, express‑validator
- **Dev Tools**: Vite dev server with proxy, Nodemon

## Features
- **Auth**: Register, Login (JWT stored client‑side)
- **Notes**: Create, list, search, edit, delete, mark favorite
- **UI**:
  - Sticky top navbar with app logo
  - Horizontal gradient note cards and favorites highlight
  - Search, tabs, and an add‑new note form at the top of Dashboard
  - Bottom navigation with routes for Dashboard, List, Alerts, Settings
  - Alerts and List sample pages for navigation completeness
- **Theme**: Light/Dark theme toggle in the navbar with persistence (localStorage) and startup bootstrapping
- **DX**: Vite dev proxy to backend to avoid CORS in development

## Project Structure
```
notes-manager-app/
├─ backend/
│  ├─ src/
│  │  ├─ config/db.js
│  │  ├─ controllers/
│  │  │  ├─ authController.js
│  │  │  └─ notesController.js
│  │  ├─ middleware/auth.js
│  │  ├─ models/
│  │  │  ├─ Note.js
│  │  │  └─ User.js
│  │  ├─ routes/
│  │  │  ├─ auth.js       (mounted at /api/auth)
│  │  │  └─ notes.js      (mounted at /api/notes)
│  │  └─ server.js
│  ├─ package.json
│  └─ .env (create)
└─ notes-manager-client/
   ├─ src/
   │  ├─ assets/logo.svg
   │  ├─ components/
   │  │  ├─ Navbar.jsx, BottomNav.jsx, NoteItem.jsx, NoteForm.jsx, Modal.jsx, Fab.jsx
   │  │  ├─ SearchBar.jsx, ProtectedRoute.jsx, Drawer.jsx (optional)
   │  ├─ context/AuthContext.jsx
   │  ├─ pages/
   │  │  ├─ Dashboard.jsx, Settings.jsx, Alerts.jsx, List.jsx, Login.jsx, Register.jsx
   │  ├─ utils/api.js
   │  ├─ App.jsx, App.css, main.jsx, index.css
   ├─ vite.config.js (proxy config)
   ├─ .env.example
   └─ package.json
```

## Prerequisites
- Node.js LTS (>= 18 recommended)
- MongoDB instance (local or Atlas)

## Environment Variables
Create `backend/.env` with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes_manager
JWT_SECRET=replace-with-a-long-random-secret
```
Optional: create `notes-manager-client/.env` for production deployments:
```
# When deploying client separately from API, set API URL explicitly
VITE_API_URL=https://your-backend-domain.tld
```

## Install Dependencies
From the project root:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../notes-manager-client
npm install
```

## Running in Development
Start the backend (port 5000 by default):
```bash
cd backend
npm run dev
```

Start the frontend (Vite on port 5173):
```bash
cd notes-manager-client
npm run dev
```

During development, the frontend uses a Vite proxy so API calls to `/api/*` are forwarded to `http://localhost:5000` automatically.
- Config: `notes-manager-client/vite.config.js`
- Axios base URL: `notes-manager-client/src/utils/api.js` (same‑origin in dev, respects `VITE_API_URL` in prod)

## Available Routes (Frontend)
- `/login`, `/register`
- `/dashboard` (protected)
- `/settings` (protected)
- `/list` (protected, sample)
- `/alerts` (protected, sample)

## API Endpoints (Backend)
Mounted under `/api` in `backend/src/server.js`:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/notes` (auth required)
- `POST /api/notes` (auth required)
- `PUT /api/notes/:id` (auth required)
- `DELETE /api/notes/:id` (auth required)
- `PATCH /api/notes/:id/favorite` (auth required)

Authentication uses `Authorization: Bearer <token>` header. The token is saved in localStorage by the frontend after login.

## Theming
- Theme applies at startup in `src/main.jsx` using localStorage or system preference.
- Toggle theme from the navbar. The toggle updates the document's `dark` class and persists to localStorage.

## Tips & Troubleshooting
- If you see CORS issues in development, ensure you’re calling `/api/...` from the client (so the Vite proxy forwards the request) and that the backend runs on `http://localhost:5000`.
- If the theme doesn’t seem to stick after toggling, hard reload the page to clear hot‑reload edge cases.
- For Windows line endings warnings in Git, you can configure autocrlf:
  ```bash
  git config core.autocrlf true
  ```

## Build & Deploy (Frontend)
For a static deployment of the React app:
```bash
cd notes-manager-client
npm run build
```
Serve the `dist/` folder with your static host. If the API is separate, set `VITE_API_URL` to the backend URL before building.

## Scripts
Backend (`backend/package.json`):
- `npm run dev` – start with nodemon
- `npm start` – start with node

Frontend (`notes-manager-client/package.json`):
- `npm run dev` – Vite dev server
- `npm run build` – production build
- `npm run preview` – preview built app

## License
MIT (or your preferred license)
