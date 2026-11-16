# web-music-streaming
Music streaming app written in Ruby (Rails API) and React.

| Folder | Stack |
| --- | --- |
| [`backend/`](backend/README.md) | Ruby 4.0, Rails 8.1 (API only), Devise, SQLite (dev/test) / PostgreSQL (production) |
| [`frontend/`](frontend/README.md) | React 19, React Router 7, Zustand, Bootstrap 5, Vite |

## Quick start

```sh
# API on http://localhost:3000
cd backend
bundle install
bin/rails db:prepare db:seed
bin/rails server

# Web app on http://localhost:8080 (in another terminal)
cd frontend
npm install
npm run dev
```

Sign in with the seeded user `test@test.com` / `password`.
