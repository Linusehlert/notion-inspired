import projectReducer from "../features/projectSlice";
import userReducer from "../features/userSlice";
import inviteReducer from "../features/inviteSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    project: projectReducer,
    invite: inviteReducer,
  },
});
