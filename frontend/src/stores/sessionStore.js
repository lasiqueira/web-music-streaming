import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { api, errorMessages } from "../api";

const loggedOut = { accessToken: null, email: null, userId: null };

// Session lives in sessionStorage, like before: closing the tab logs you out.
export const useSessionStore = create(
  persist(
    (set, get) => ({
      ...loggedOut,
      errors: [],
      pending: false,

      clearErrors: () => set({ errors: [] }),

      login: async (email, password) => {
        set({ errors: [], pending: true });
        try {
          const json = await api.login(email, password);
          set({ accessToken: json.access_token, email: json.email, userId: json.user_id, pending: false });
        } catch (error) {
          set({ errors: errorMessages(error), pending: false });
        }
      },

      signup: async (email, username, password, passwordConfirmation) => {
        if (password !== passwordConfirmation) {
          set({ errors: ["Password and password confirmation should match"] });
          return;
        }
        set({ errors: [], pending: true });
        try {
          const json = await api.signup(email, username, password, passwordConfirmation);
          set({ accessToken: json.access_token, email: json.email, userId: json.user_id, pending: false });
        } catch (error) {
          set({ errors: errorMessages(error), pending: false });
        }
      },

      // Forget the session locally right away, and revoke the token on the
      // server in the background. If that request fails the user is still
      // logged out here; the token just stays valid until the next logout.
      logout: () => {
        const token = get().accessToken;
        set({ ...loggedOut, errors: [] });
        if (token) api.logout(token).catch(() => {});
      },
    }),
    {
      name: "session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ accessToken, email, userId }) => ({ accessToken, email, userId }),
    },
  ),
);

export const selectIsLoggedIn = (state) => Boolean(state.accessToken);
