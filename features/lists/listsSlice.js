import { createSlice, current } from "@reduxjs/toolkit";

export const listsSlice = createSlice({
  name: "lists",
  initialState: { listsOrderIds: [] },
  reducers: {
    addList: (state, action) => {
      state[action.payload.id] = action.payload;
      state.listsOrderIds.push(action.payload.id);
    },
    initializeLists: (_, action) => action.payload,
    updateListTitle: (state, action) => {
      state[action.payload.id].title = action.payload.newTitle;
    },
    updateListsOrder: (state, action) => {
      const { draggableId, sourceIndex, destinationIndex } = action.payload;
      state.listsOrderIds.splice(sourceIndex, 1);
      state.listsOrderIds.splice(destinationIndex, 0, draggableId);
    },
    addItem: (state, action) => {
      const { listId, item } = action.payload;
      state[listId].items[item.id] = item;
      state[listId].items.itemsOrderIds.push(item.id);
    },
    updateItem: (state, action) => {
      const { listId, itemId, newContent } = action.payload;
      state[listId].items[itemId].content = newContent;
    },
    updateListItemsOrder: (state, action) => {
      const {
        draggableId,
        sourceId,
        destinationId,
        sourceIndex,
        destinationIndex,
      } = action.payload;

      if (sourceId !== destinationId) {
        const draggedItem = state[sourceId].items[draggableId];
        delete state[sourceId].items[draggableId];
        state[destinationId].items[draggableId] = draggedItem;
      }

      state[sourceId].items.itemsOrderIds.splice(sourceIndex, 1);
      state[destinationId].items.itemsOrderIds.splice(
        destinationIndex,
        0,
        draggableId
      );
    },
    deleteItem: (state, action) => {
      const { item, listId } = action.payload;
      const index = state[listId].items.itemsOrderIds.findIndex(
        (itemOrderId) => itemOrderId === item.id
      );
      delete state[listId].items[item.id];
      state[listId].items.itemsOrderIds.splice(index, 1);
    },
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
