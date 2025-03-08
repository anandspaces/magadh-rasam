import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get("access_token") || !!Cookies.get("fallback_auth"),
  token: Cookies.get("access_token") || Cookies.get("fallback_auth") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      Cookies.set("access_token", action.payload, { expires: 7, secure: true });
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("fallback_auth");
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
