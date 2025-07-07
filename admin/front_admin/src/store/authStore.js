// src/store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setToken: (token) => {
        set({ token });
      },

      setUser: (user) => {
        set({ user });
      },

      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage', // clave del localStorage: "auth-storage"
      getStorage: () => localStorage, // puedes usar sessionStorage si prefieres
    }
  )
);

export default useAuthStore;
