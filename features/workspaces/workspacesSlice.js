import { createSlice } from "@reduxjs/toolkit";

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: [],
  reducers: {
    initializeWorkspaces: (state, action) => action.payload,
  },
});

export const { initializeWorkspaces } = workspacesSlice.actions;

export default workspacesSlice.reducer;
