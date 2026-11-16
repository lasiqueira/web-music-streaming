import { useEffect, useRef } from "react";
import { usePlayerStore } from "../stores/playerStore";

export default function Player() {
  const audioRef = useRef(null);
  const currentSong = usePlayerStore((state) => state.currentSong);
  const playId = usePlayerStore((state) => state.playId);
  const queueLength = usePlayerStore((state) => state.queue.length);
  const queueIndex = usePlayerStore((state) => state.queueIndex);
  const playingAll = usePlayerStore((state) => state.playingAll);
  const playNext = usePlayerStore((state) => state.playNext);

  // (Re)start playback whenever a play is requested.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    if (currentSong?.download_url) {
      audio.play().catch(() => {
        // Autoplay can be blocked by the browser; the user can press play.
      });
    }
  }, [playId, currentSong]);

  const handleEnded = () => {
    if (playingAll) playNext();
  };

  return (
    <section className="card player-card shadow-sm" aria-label="Player">
      <div className="card-body py-2 px-3">
        <div className="d-flex align-items-center gap-2 mb-1 small text-body-secondary min-w-0">
          <i className="bi bi-vinyl-fill flex-shrink-0" aria-hidden="true" />
          {currentSong ? (
            <span className="text-truncate text-body fw-semibold" title={currentSong.name}>
              {currentSong.name}
            </span>
          ) : (
            <span>Nothing playing</span>
          )}
          {playingAll && (
            <span className="ms-auto flex-shrink-0">
              {queueIndex + 1}/{queueLength}
            </span>
          )}
        </div>
        <audio ref={audioRef} className="w-100" controls onEnded={handleEnded} src={currentSong?.download_url ?? undefined}>
          Your browser does not support the audio element.
        </audio>
      </div>
    </section>
  );
}
