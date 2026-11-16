// Thin wrapper around fetch for the Rails API.
// Configure the API location with VITE_API_ROOT (see .env.example).
const API_ROOT = (import.meta.env.VITE_API_ROOT || "http://localhost:3000").replace(/\/+$/, "");

const GENERIC_ERROR = "Something went wrong, please try again";

export class ApiError extends Error {
  constructor(messages, status) {
    super(messages.join(", "));
    this.messages = messages;
    this.status = status;
  }
}

async function request(path, { method = "GET", body, token, query } = {}) {
  const url = new URL(API_ROOT + path);
  Object.entries(query ?? {}).forEach(([key, value]) => url.searchParams.set(key, value));

  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = token;

  let response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(["Could not reach the server. Check your connection and try again."]);
  }

  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON body; fall through with json = null.
  }

  if (!response.ok) {
    let messages = [GENERIC_ERROR];
    if (Array.isArray(json?.errors)) messages = json.errors;
    else if (json?.error) messages = [json.error];
    throw new ApiError(messages, response.status);
  }

  return json;
}

const playlistBody = (playlist, userId) => ({
  playlist: {
    name: playlist.name,
    user_id: userId,
    song_ids: playlist.songs.map((song) => song.id),
  },
});

export const api = {
  login: (email, password) =>
    request("/login", { method: "POST", body: { email, password } }),

  signup: (email, username, password, passwordConfirmation) =>
    request("/users", {
      method: "POST",
      body: { user: { email, username, password, password_confirmation: passwordConfirmation } },
    }),

  // Invalidates the token on the server.
  logout: (token) => request("/login", { method: "DELETE", token }),

  getAllSongs: () => request("/songs"),

  searchSongs: (search) => request("/search/songs", { query: { search } }),

  getUserPlaylists: (userId, token) => request(`/playlists/${userId}`, { token }),

  createPlaylist: (playlist, userId, token) =>
    request("/playlists", { method: "POST", token, body: playlistBody(playlist, userId) }),

  updatePlaylist: (playlist, userId, token) =>
    request(`/playlists/${playlist.id}`, { method: "PUT", token, body: playlistBody(playlist, userId) }),

  deletePlaylist: (playlistId, token) =>
    request(`/playlists/${playlistId}`, { method: "DELETE", token }),
};

export const errorMessages = (error) =>
  error instanceof ApiError ? error.messages : [GENERIC_ERROR];
