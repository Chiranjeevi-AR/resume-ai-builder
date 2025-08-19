## Resume AI Matchmaker

Monorepo containing a React (Vite) client and a Node.js/Express server.

### Structure
- `client/`: React frontend (existing Vite app)
- `server/`: Node.js backend (Express + MongoDB)

### Features
- Build resumes online with templates
- AI Job Matchmaker: match resume to job descriptions
- Job portal: admin-added jobs and optional Naukri scraper (demo)
- User roles: guest, user, admin

### Quick Start
1. Install dependencies
```
npm run install:all
```
2. Environment for server (`server/.env`)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resume_ai
JWT_SECRET=replace_me
ADMIN_EMAIL=admin@example.com
BCRYPT_SALT_ROUNDS=10
```
3. Run both client and server
```
npm run dev
```

### Server Endpoints (high-level)
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET /api/resumes/me`, `POST /api/resumes/me`, `GET /api/resumes/me/pdf`
- `GET /api/jobs`, `POST /api/jobs` (admin), `PUT /api/jobs/:id` (admin), `DELETE /api/jobs/:id` (admin), `POST /api/jobs/scrape` (admin)
- `POST /api/ai/match-text`, `POST /api/ai/match-ids`

### Scripts
- `npm run dev`: run client and server concurrently
- `npm run install:all`: install client & server deps
- `npm run start`: start server only

