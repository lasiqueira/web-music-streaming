# SISTINTTCC – API

Music streaming Web API written in Ruby on Rails.

Tech stack:

* Ruby 4.0 (see `.ruby-version`)
* Ruby on Rails 8.1 (API-only mode)
* Devise (password hashing) + token authentication
* Amazon S3 (song files)
* SQLite (development/test) / PostgreSQL (production)

The objective of this project is learning and using it as a school project.

## Installation

* `bundle install`
* `bin/rails db:prepare` (creates the database and loads the schema)
* `bin/rails db:seed`
* `bin/rails server` (or `bin/dev`)

Or simply run `bin/setup`.

## Tests

* `bin/rails test` – runs the test suite
* `bin/ci` – runs setup, a gem security audit (`bundler-audit`), the tests and the seeds

## Usage

This backend API was made to be used alongside a separate frontend app, but you can call the endpoints manually if you wish. Most calls work without a user token; only the `/playlists` endpoints and sign out need one. Send the token in the request header as `Authorization: <token>`. Responses are JSON.

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/users` | Sign up (`{ user: { email, username, password, password_confirmation } }`; passwords need at least 8 characters) |
| `POST` | `/login` | Sign in (`{ email, password }`) – returns `access_token` and `user_id` |
| `DELETE` | `/login` | Sign out – replaces the user's token, so the old one stops working (token required) |
| `GET` | `/songs` | List all songs |
| `GET` | `/search/songs?search=term` | Search by song, artist, album or genre name |
| `GET` | `/playlists/:user_id` | A user's playlists (token required) |
| `POST` | `/playlists` | Create a playlist (`{ playlist: { name, user_id, song_ids: [] } }`, token required) |
| `PUT` | `/playlists/:id` | Update a playlist (token required) |
| `DELETE` | `/playlists/:id` | Delete a playlist (token required) |
| `GET` | `/up` | Health check |

## Configuration

Settings are read from environment variables. When running locally you can put them in a `.env` file in the root of the app (see `.env.example`):

```
S3_BUCKET=yourbucket
AWS_REGION=sa-east-1
# Defaults to the local frontend (http://localhost:8080)
# CORS_ORIGINS=http://localhost:8080
```

The songs must be stored in the root of a **public** S3 bucket in the `.mp3` format, named exactly like the song (`<song name>.mp3`). The API only builds public URLs to them, so no AWS credentials are needed. You must seed your db manually or make a script to get the songs from S3 and parse the information before inserting them in the database. `db/seeds.rb` has an example of how songs should be inserted.

In production also set:

* `DATABASE_URL` – PostgreSQL connection URL
* `SECRET_KEY_BASE` – generate one with `bin/rails secret`
* `CORS_ORIGINS` – comma-separated list of frontend origins allowed to call the API, e.g. `https://music.example.com` (required; the app will not boot without it)
