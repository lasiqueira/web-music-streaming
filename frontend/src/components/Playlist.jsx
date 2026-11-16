import { useEffect } from "react";
import ErrorNotice from "./ErrorNotice";
import IconButton from "./IconButton";
import { usePlayerStore } from "../stores/playerStore";
import { usePlaylistStore, selectActivePlaylist } from "../stores/playlistStore";
import { useSessionStore, selectIsLoggedIn } from "../stores/sessionStore";

export default function Playlist() {
  const isLoggedIn = useSessionStore(selectIsLoggedIn);
  const userId = useSessionStore((state) => state.userId);

  const playlist = usePlaylistStore(selectActivePlaylist);
  const activeIndex = usePlaylistStore((state) => state.activeIndex);
  const total = usePlaylistStore((state) => state.playlists.length);
  const { errors, saving, loading } = usePlaylistStore();
  const { load, previous, next, rename, removeActive, saveActive, removeSong, clearErrors } = usePlaylistStore();

  const playSong = usePlayerStore((state) => state.playSong);
  const playAll = usePlayerStore((state) => state.playAll);

  useEffect(() => {
    if (userId) load();
  }, [userId, load]);

  const hasSongs = playlist.songs.length > 0;

  return (
    <section className="card shadow-sm" aria-label="Playlist">
      <div className="card-header d-flex align-items-center gap-1 px-2">
        <IconButton icon="chevron-left" label="Previous playlist" disabled={activeIndex === 0} onClick={previous} />
        <span className="flex-grow-1 text-center small text-body-secondary">
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-label="Loading playlists" />
          ) : (
            `Playlist ${activeIndex + 1} of ${total}`
          )}
        </span>
        <IconButton
          icon={activeIndex === total - 1 ? "plus-lg" : "chevron-right"}
          label={activeIndex === total - 1 ? "New playlist" : "Next playlist"}
          onClick={next}
        />
      </div>

      <div className="card-body">
        <ErrorNotice errors={errors} onDismiss={clearErrors} />

        <label htmlFor="playlist-name" className="visually-hidden">
          Playlist name
        </label>
        <input
          id="playlist-name"
          type="text"
          className="form-control mb-2"
          placeholder="Playlist name"
          value={playlist.name}
          onChange={(event) => rename(event.target.value)}
        />

        <div className="d-flex gap-2 mb-3">
          <button
            type="button"
            className="btn btn-primary btn-sm flex-grow-1"
            disabled={!hasSongs}
            onClick={() => playAll(playlist.songs)}
          >
            <i className="bi bi-play-fill me-1" aria-hidden="true" />
            Play all
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            disabled={!isLoggedIn || saving || !playlist.name.trim()}
            title={isLoggedIn ? "Save playlist" : "Sign in to save playlists"}
            onClick={saveActive}
          >
            {saving ? (
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            ) : (
              <i className="bi bi-floppy" aria-hidden="true" />
            )}
            <span className="ms-1">Save</span>
          </button>
          <IconButton icon="trash" label="Delete playlist" variant="outline-danger" onClick={removeActive} />
        </div>

        {hasSongs ? (
          <ol className="list-group list-group-numbered playlist-songs">
            {playlist.songs.map((song, index) => (
              <li key={`${song.id}-${index}`} className="list-group-item d-flex align-items-center gap-2 py-1 pe-1">
                <span className="text-truncate flex-grow-1" title={song.name}>
                  {song.name}
                </span>
                <IconButton icon="play-fill" label={`Play ${song.name}`} round onClick={() => playSong(song)} />
                <IconButton icon="dash-lg" label={`Remove ${song.name}`} round onClick={() => removeSong(index)} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-body-secondary small text-center mb-0">
            Add songs from the search results with <i className="bi bi-plus-lg" aria-label="the plus button" />.
          </p>
        )}
      </div>
    </section>
  );
}
