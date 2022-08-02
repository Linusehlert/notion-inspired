import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectTitle: null,
  projectId: null,
  projectUsers: [],
  projectGroups: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.projectTitle = action.payload.projectTitle;
      state.projectId = action.payload.projectId;
      state.projectUsers = action.payload.projectUsers;
      state.projectGroups = action.payload.projectGroups;
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
