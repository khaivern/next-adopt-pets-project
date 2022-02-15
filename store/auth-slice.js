import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

const checkAndParseLS = (item) => {
  return typeof window !== "undefined" &&
    localStorage.getItem("userData") &&
    localStorage.getItem("userData")[item]
    ? JSON.parse(localStorage.getItem("userData")[item])
    : null;
};

const initialState = {
  expiration: checkAndParseLS("expiration") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.expiration = action.payload.expiration;
      localStorage.setItem(
        "userData",
        JSON.stringify({
          expiration: action.payload.expiration,
        })
      );
    },
    logout(state, action) {
      state.expiration = null;
      localStorage.removeItem("userData");
      signOut();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
