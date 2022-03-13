import { createSlice } from "@reduxjs/toolkit";

export const workspacesSlice = createSlice({
  name: "workspaces",
  initialState: [],
  reducers: {
    initializeWorkspaces: (_, action) => action.payload,
  },
});

export const { initializeWorkspaces } = workspacesSlice.actions;

export default workspacesSlice.reducer;
