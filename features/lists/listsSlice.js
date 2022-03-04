import { createSlice } from "@reduxjs/toolkit";

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
    updateListsOrder: (state, action) => {
      console.log(action.payload);
      const { sourceIndex, destinationIndex } = action.payload;
      const newState = [...state];
      const newList = newState[sourceIndex];
      newState.splice(sourceIndex, 1);
      newState.splice(destinationIndex, 0, newList);
      return newState;
    },
    addItem: (state, action) =>
      state.map((list) => {
        if (list.id === action.payload.listId) {
          return { ...list, items: [...list.items, action.payload.item] };
        }
        return list;
      }),
    updateItem: (state, action) =>
      state.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            items: list.items.map((item) => {
              if (item.id === action.payload.oldItem.id) {
                return action.payload.newItem;
              }
              return item;
            }),
          };
        }
        return list;
      }),
    updateListItemsOrder: (state, action) => {
      const {
        draggableItem,
        sourceId,
        destinationId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      return state.map((list) => {
        if (list.id !== sourceId && list.id !== destinationId) return list;
        const newItems = Array.from(list.items);
        if (list.id === sourceId) {
          newItems.splice(sourceIndex, 1);
        }
        if (list.id === destinationId) {
          newItems.splice(destinationIndex, 0, draggableItem);
        }
        return { ...list, items: newItems };
      });
    },
    deleteItem: (state, action) =>
      state.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            items: list.items.filter(
              (item) => item.id !== action.payload.item.id
            ),
          };
        }
        return list;
      }),
  },
});

export const {
  addList,
  initializeLists,
  updateListTitle,
  updateListsOrder,
  addItem,
  updateItem,
  updateListItemsOrder,
  deleteItem,
} = listsSlice.actions;

export default listsSlice.reducer;
