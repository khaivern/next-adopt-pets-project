import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

const checkAndParseLS = () => {
  return typeof window !== "undefined" && localStorage.getItem("expiration")
    ? localStorage.getItem("expiration")
    : null;
};

const initialState = {
  expiration: checkAndParseLS(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.expiration = action.payload.expiration;
      localStorage.setItem("expiration", action.payload.expiration);
    },
    logout(state, action) {
      state.expiration = null;
      localStorage.removeItem("expiration");
      signOut();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
