import { useState } from "react";
import Player from "../components/Player";
import Playlist from "../components/Playlist";
import Search from "../components/Search";
import { usePlaylistStore, selectActivePlaylist } from "../stores/playlistStore";

// Desktop (lg+): sidebar with player + playlist on the left, search on the right.
// Mobile: player pinned at the top, with a Search / Playlist toggle below it.
export default function MusicPlayer() {
  const [mobileTab, setMobileTab] = useState("search");
  const songCount = usePlaylistStore((state) => selectActivePlaylist(state).songs.length);

  const hiddenOnMobileUnless = (tab) => (mobileTab === tab ? "" : "d-none d-lg-block");

  return (
    <div className="row g-3 g-lg-4">
      <aside className="col-lg-4 col-xl-3">
        <div className="sidebar">
          <Player />

          <div className="btn-group w-100 my-3 d-lg-none" role="group" aria-label="Choose panel">
            <TabButton active={mobileTab === "search"} onClick={() => setMobileTab("search")} icon="search">
              Search
            </TabButton>
            <TabButton active={mobileTab === "playlist"} onClick={() => setMobileTab("playlist")} icon="music-note-list">
              Playlist
              {songCount > 0 && <span className="badge text-bg-secondary ms-2">{songCount}</span>}
            </TabButton>
          </div>

          <div className={`mt-lg-3 ${hiddenOnMobileUnless("playlist")}`}>
            <Playlist />
          </div>
        </div>
      </aside>

      <main className={`col-lg-8 col-xl-9 ${hiddenOnMobileUnless("search")}`}>
        <Search />
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }) {
  return (
    <button
      type="button"
      className={`btn ${active ? "btn-primary" : "btn-outline-primary"}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <i className={`bi bi-${icon} me-2`} aria-hidden="true" />
      {children}
    </button>
  );
}
