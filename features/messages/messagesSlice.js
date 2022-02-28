import { createSlice, current } from "@reduxjs/toolkit";

export const messagesSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      state.push(action.payload);
    },
    initializeMessages: (state, action) => action.payload,
  },
});

export const { addMessage, initializeMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
