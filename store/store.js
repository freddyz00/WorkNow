import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from "../features/workspaces/workspacesSlice";
import listsReducer from "../features/lists/listsSlice";

export default configureStore({
  reducer: {
    workspaces: workspacesReducer,
    lists: listsReducer,
  },
});
