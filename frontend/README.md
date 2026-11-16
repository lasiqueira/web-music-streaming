# SISTINTTCC – Web app

Music streaming web page written in React.

Tech stack:

* React 19 (function components + hooks)
* React Router 7
* Zustand (state management)
* Bootstrap 5 + Bootstrap Icons (responsive layout, works down to phone sizes)
* Vite (dev server and build)

The objective of this project is learning and using it as a school project.

## Installation

Requires Node.js 20.19+ (see `.nvmrc`).

* `npm install`
* `npm run dev`

## Usage

After going through the installation steps, open `http://localhost:8080/`.

The app talks to the API at `http://localhost:3000` by default. To use a different backend, copy `.env.example` to `.env.local` and set `VITE_API_ROOT`.

## Production build

* `npm run build` – builds the static site into `dist/`
* `npm start` – serves `dist/` with Express on `$PORT` (default 8080)

`dist/` can also be deployed to any static host, since the app uses hash-based routing.
