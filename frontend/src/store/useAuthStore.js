import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loginError: null,
      loginLoading: false,
      sessionMessage: null,

      login: async (email, password) => {
        set({ loginLoading: true, loginError: null, sessionMessage: null });
        try {
          const res = await api.login(email, password);
          const d = res.data || res;
          set({
            isAuthenticated: true,
            user: d.user,
            token: d.token,
            loginLoading: false,
            loginError: null,
          });
          return { success: true };
        } catch (err) {
          const message = err.status === 401
            ? 'Email or password is incorrect.'
            : err.message || 'Unable to sign in right now.';
          set({ loginLoading: false, loginError: message });
          return { success: false, error: message };
        }
      },

      logout: async () => {
        try { await api.logout(); } catch {}
        set({ isAuthenticated: false, user: null, token: null, loginError: null });
      },

      clearLoginError: () => set({ loginError: null }),
      clearSessionMessage: () => set({ sessionMessage: null }),
      setSessionMessage: (message) => set({ sessionMessage: message }),
    }),
    {
      name: 'yousafzai-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        token: state.token,
      }),
    }
  )
);
