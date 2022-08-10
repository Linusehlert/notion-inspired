import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectTitle: null,
  projectId: null,
  projectUsers: [],
  projectAdmins: [],
  projectManagers: [],
  projectDevelopers: [],
  projectGroups: [],
  projectLabels: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.projectTitle = action.payload.projectTitle;
      state.projectId = action.payload.projectId;
      state.projectAdmins = action.payload.projectAdmins;
      state.projectUsers = action.payload.projectUsers;
      state.projectGroups = action.payload.projectGroups;
      state.projectLabels = action.payload.projectLabels;
    },
  },
});

export const { setProject } = projectSlice.actions;
export default projectSlice.reducer;
