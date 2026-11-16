import { create } from "zustand";
import { api, errorMessages } from "../api";

let latestRequest = 0;

export const useSearchStore = create((set) => ({
  songs: [],
  errors: [],
  fetching: false,
  hasSearched: false,

  // An empty term lists every song.
  search: async (term) => {
    const requestId = ++latestRequest;
    set({ fetching: true, errors: [] });
    try {
      const trimmed = term.trim();
      const songs = trimmed ? await api.searchSongs(trimmed) : await api.getAllSongs();
      if (requestId === latestRequest) set({ songs: songs ?? [], fetching: false, hasSearched: true });
    } catch (error) {
      if (requestId === latestRequest) set({ errors: errorMessages(error), fetching: false, hasSearched: true });
    }
  },
}));
