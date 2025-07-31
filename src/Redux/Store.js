// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Authslice";

const store = configureStore({
  reducer: {
      user: authReducer,
  },
});

export default store;
