import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  userPhoto: null,
  userId: null,
  lastUrl: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userPhoto = action.payload.userPhoto;
      state.userId = action.payload.userId;
      state.lastUrl = action.payload.lastUrl;
    },
    setUserLastUrl: (state, action) => {
      state.lastUrl = action.payload.lastUrl;
    },
    setUserLogOut: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userPhoto = null;
      state.userId = null;
      state.lastUrl = null;
    },
  },
});

export const { setActiveUser, setUserLogOut, setUserLastUrl } =
  userSlice.actions;
export default userSlice.reducer;
