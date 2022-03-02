import { createSlice, current } from "@reduxjs/toolkit";

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
    updateItem: (state, action) =>
      state.map((list) => {
        if (list.title === action.payload.listTitle) {
          return {
            ...list,
            items: list.items.map((item) => {
              if (item === action.payload.oldItem) {
                return action.payload.newItem;
              }
              return item;
            }),
          };
        }
        return list;
      }),
    deleteItem: (state, action) =>
      state.map((list) => {
        if (list.title === action.payload.listTitle) {
          return {
            ...list,
            items: list.items.filter((item) => item !== action.payload.item),
          };
        }
        return list;
      }),
  },
});

export const {
  addList,
  initializeLists,
  addItem,
  updateListTitle,
  updateItem,
  deleteItem,
} = listsSlice.actions;

export default listsSlice.reducer;
