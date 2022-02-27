import { createSlice } from "@reduxjs/toolkit";

export const selectedTabSlice = createSlice({
  name: "selectedTab",
  initialState: "Board",
  reducers: {
    setSelectedTab: (_, action) => action.payload,
  },
});

export const { setSelectedTab } = selectedTabSlice.actions;

export default selectedTabSlice.reducer;
