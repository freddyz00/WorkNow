import { createSlice, current } from "@reduxjs/toolkit";
import { list } from "postcss";

export const listsSlice = createSlice({
  name: "lists",
  initialState: [],
  reducers: {
    addList: (state, action) => {
      state.push(action.payload);
    },
    initializeLists: (_, action) => action.payload,
    updateListTitle: (state, action) =>
      state.map((list) => {
        if (list.id === action.payload.id) {
          return { ...list, title: action.payload.newTitle };
        }
        return list;
      }),
    addItem: (state, action) =>
      state.map((list) => {
        if (list.title === action.payload.title) {
          return { ...list, items: [...list.items, action.payload.item] };
        }
        return list;
      }),
  },
});

export const { addList, initializeLists, addItem, updateListTitle } =
  listsSlice.actions;

export default listsSlice.reducer;
