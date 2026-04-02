import { create } from "zustand";

type AuthState = {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: localStorage.getItem("user"),
  isAuthenticated: !!localStorage.getItem("user"),

  login: (username, password) => {

    if (username === "admin" && password === "0123456789") {
      localStorage.setItem("user", username);
      set({ user: username, isAuthenticated: true });
      return true;
    }

    return false;
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));