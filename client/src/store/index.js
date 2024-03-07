import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      currentUser: null,
      setOnLoginSuccess: (data) =>
        set(() => ({
          currentUser: data,
          error: null,
        })),
      setOnDeleteUser: () =>
        set(() => ({
          currentUser: null,
        })),
    }),
    {
      name: 'user__info', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useErrorStore = create((set) => ({
  error: null,
  setOnError: (errorMessage) =>
    set(() => ({
      error: errorMessage,
    })),
}));
