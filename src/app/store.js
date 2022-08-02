import projectReducer from "../features/projectSlice";
import userReducer from "../features/userSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
  },
});
