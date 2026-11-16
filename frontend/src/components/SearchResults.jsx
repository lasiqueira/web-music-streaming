import IconButton from "./IconButton";
import { usePlayerStore } from "../stores/playerStore";
import { usePlaylistStore } from "../stores/playlistStore";

// On narrow screens the Album / Artist / Genre columns collapse into a
// subtitle under the song name, so the table never needs to scroll sideways.
export default function SearchResults({ songs }) {
  const playSong = usePlayerStore((state) => state.playSong);
  const addSong = usePlaylistStore((state) => state.addSong);

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col" className="d-none d-md-table-cell">Album</th>
              <th scope="col" className="d-none d-md-table-cell">Artist</th>
              <th scope="col" className="d-none d-xl-table-cell">Genre</th>
              <th scope="col" className="text-end">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => {
              const artist = song.album?.artist?.name;
              const album = song.album?.name;
              const subtitle = [artist, album].filter(Boolean).join(" · ");
              return (
                <tr key={song.id}>
                  <td className="song-cell">
                    <div className="fw-semibold">{song.name}</div>
                    {subtitle && <div className="small text-body-secondary d-md-none">{subtitle}</div>}
                  </td>
                  <td className="d-none d-md-table-cell">{album}</td>
                  <td className="d-none d-md-table-cell">{artist}</td>
                  <td className="d-none d-xl-table-cell">{song.genre?.name}</td>
                  <td className="text-end text-nowrap">
                    <IconButton icon="play-fill" label={`Play ${song.name}`} round onClick={() => playSong(song)} />{" "}
                    <IconButton icon="plus-lg" label={`Add ${song.name} to playlist`} round onClick={() => addSong(song)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
