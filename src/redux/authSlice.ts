import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type User = {
  username: string;
  password: string;
};

type AuthState = {
  user: User | null;
  users: User[];
};

function getSafeItem<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
}

const initialState: AuthState = {
  user: getSafeItem<User | null>("user", null),
  users: getSafeItem<User[]>("users", [
    { username: "admin", password: "123456" },
  ]),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      const exists = state.users.some(
        (u) => u.username.toLowerCase() === action.payload.username.toLowerCase()
      );

      if (exists) return;

      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    loginUser: (state, action: PayloadAction<User>) => {
      const found = state.users.find(
        (u) =>
          u.username === action.payload.username &&
          u.password === action.payload.password
      );

      if (found) {
        state.user = found;
        localStorage.setItem("user", JSON.stringify(found));
      } else {
        state.user = null;
        localStorage.removeItem("user");
      }
    },

    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;