import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    title: null,
    message: null,
    status: null,
  },
};

const notiSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    createNotification(state, action) {
      state.data.title = action.payload.title;
      state.data.message = action.payload.message;
      state.data.status = action.payload.status;
    },
    clearNotification(state) {
      state.data.title = null;
      state.data.message = null;
      state.data.status = null;
    },
  },
});

export const notiActions = notiSlice.actions;

export default notiSlice.reducer;
