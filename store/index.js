import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import notiSlice from "./notification-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    noti: notiSlice,
  },
});

export default store;
