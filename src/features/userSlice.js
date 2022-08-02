import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: null,
  userEmail: null,
  userPhoto: null,
  userId: null,
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
    },
    setUserLogOut: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userPhoto = null;
      state.userId = null;
    },
  },
});

export const { setActiveUser, setUserLogOut } = userSlice.actions;
export default userSlice.reducer;
