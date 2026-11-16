import { create } from "zustand";
import { api, errorMessages } from "../api";
import { useSessionStore } from "./sessionStore";

// Every playlist gets a stable client-side `key` so async responses update the
// right playlist even if the user has navigated to another one meanwhile.
let draftCounter = 0;
const newDraft = () => ({ key: `draft-${++draftCounter}`, id: null, name: "New Playlist", songs: [] });
const fromServer = (playlist) => ({ ...playlist, songs: playlist.songs ?? [], key: `playlist-${playlist.id}` });

const initialState = () => ({ playlists: [newDraft()], activeIndex: 0, errors: [], saving: false, loading: false });

const session = () => useSessionStore.getState();

export const usePlaylistStore = create((set, get) => {
  const updateActive = (update) =>
    set(({ playlists, activeIndex }) => ({
      playlists: playlists.map((playlist, index) => (index === activeIndex ? update(playlist) : playlist)),
    }));

  return {
    ...initialState(),

    reset: () => set(initialState()),
    clearErrors: () => set({ errors: [] }),

    // Replace saved playlists with the server's copy; keep any unsaved drafts.
    load: async () => {
      const { userId, accessToken } = session();
      if (!userId) return;
      set({ loading: true, errors: [] });
      try {
        const remote = (await api.getUserPlaylists(userId, accessToken)) ?? [];
        set(({ playlists }) => {
          const drafts = playlists.filter((playlist) => playlist.id == null);
          return { playlists: [...drafts, ...remote.map(fromServer)], activeIndex: 0, loading: false };
        });
      } catch (error) {
        set({ errors: errorMessages(error), loading: false });
      }
    },

    addSong: (song) => updateActive((playlist) => ({ ...playlist, songs: [...playlist.songs, song] })),

    removeSong: (songIndex) =>
      updateActive((playlist) => ({ ...playlist, songs: playlist.songs.filter((_, index) => index !== songIndex) })),

    rename: (name) => updateActive((playlist) => ({ ...playlist, name })),

    next: () =>
      set(({ playlists, activeIndex }) => {
        const atEnd = activeIndex === playlists.length - 1;
        return { playlists: atEnd ? [...playlists, newDraft()] : playlists, activeIndex: activeIndex + 1, errors: [] };
      }),

    previous: () => set(({ activeIndex }) => ({ activeIndex: Math.max(0, activeIndex - 1), errors: [] })),

    removeActive: async () => {
      const { playlists, activeIndex } = get();
      const target = playlists[activeIndex];
      const remaining = playlists.filter((_, index) => index !== activeIndex);
      set({ playlists: remaining.length ? remaining : [newDraft()], activeIndex: 0, errors: [] });

      if (target.id != null) {
        try {
          await api.deletePlaylist(target.id, session().accessToken);
        } catch (error) {
          set({ errors: errorMessages(error) });
        }
      }
    },

    saveActive: async () => {
      const { playlists, activeIndex } = get();
      const target = playlists[activeIndex];
      const { userId, accessToken } = session();
      set({ saving: true, errors: [] });
      try {
        const saved = target.id == null
          ? await api.createPlaylist(target, userId, accessToken)
          : await api.updatePlaylist(target, userId, accessToken);
        set((state) => ({
          playlists: state.playlists.map((playlist) => (playlist.key === target.key ? fromServer(saved) : playlist)),
          saving: false,
        }));
      } catch (error) {
        set({ errors: errorMessages(error), saving: false });
      }
    },
  };
});

export const selectActivePlaylist = (state) => state.playlists[state.activeIndex];

// Clear playlists on logout / user switch. Drafts built before signing in are
// kept; the Playlist panel then loads the user's saved playlists after them.
useSessionStore.subscribe((state, previous) => {
  if (previous.userId != null && state.userId !== previous.userId) usePlaylistStore.getState().reset();
});
