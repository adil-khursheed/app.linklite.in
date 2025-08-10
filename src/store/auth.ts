import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export interface IAuthStore {
  user: UserInfo | null;
  hydrated: boolean;
  setHydrated: () => void;
  setUser: (user: UserInfo) => void;
  logout: () => void;
  decrementShortLinkLimit: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      user: null,
      hydrated: false,

      setHydrated: () => {
        set({ hydrated: true });
      },

      setUser: (user: UserInfo) => {
        if (user) {
          set({ user });
        }
      },
      logout: () => {
        set({ user: null });
      },
      decrementShortLinkLimit: () => {
        set((state) => ({
          user: {
            ...state.user,
            short_links_limit:
              state.user && state.user.short_links_limit > 0
                ? state?.user?.short_links_limit - 1
                : 0,
          },
        }));
      },
    })),

    {
      name: "auth",
      onRehydrateStorage: () => {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
