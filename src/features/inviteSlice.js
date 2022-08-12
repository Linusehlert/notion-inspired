import { createSlice } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const initialState = {
  inviteTitle: null,
};

export const inviteSlice = createSlice({
  name: "invite",
  initialState,
  reducers: {
    setInviteLink: (state, action) => {
      state.inviteLink = action.payload;
    },
  },
});

export const { setInviteLink } = inviteSlice.actions;
export default inviteSlice.reducer;
