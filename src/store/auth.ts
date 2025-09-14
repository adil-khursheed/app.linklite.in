import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

export interface IAuthStore {
  user: UserInfo | null;
  hydrated: boolean;
  setHydrated: () => void;
  setUser: (user: UserInfo) => void;
  logout: () => void;
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
