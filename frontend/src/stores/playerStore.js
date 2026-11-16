import { create } from "zustand";
import { useSessionStore } from "./sessionStore";

const idle = { currentSong: null, queue: [], queueIndex: 0, playingAll: false };

export const usePlayerStore = create((set, get) => ({
  ...idle,
  // Bumped on every play request so replaying the same song restarts it.
  playId: 0,

  playSong: (song) => set({ ...idle, currentSong: song, playId: get().playId + 1 }),

  playAll: (songs) => {
    if (!songs.length) return;
    set({ currentSong: songs[0], queue: [...songs], queueIndex: 0, playingAll: true, playId: get().playId + 1 });
  },

  playNext: () => {
    const { queue, queueIndex, playingAll, playId } = get();
    const nextIndex = queueIndex + 1;
    if (playingAll && nextIndex < queue.length) {
      set({ currentSong: queue[nextIndex], queueIndex: nextIndex, playId: playId + 1 });
    } else {
      set(idle);
    }
  },

  reset: () => set(idle),
}));

// Stop playback whenever the logged-in user changes (login or logout).
useSessionStore.subscribe((state, previous) => {
  if (state.userId !== previous.userId) usePlayerStore.getState().reset();
});
