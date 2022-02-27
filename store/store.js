import { configureStore } from "@reduxjs/toolkit";
import workspacesReducer from "../features/workspaces/workspacesSlice";
import listsReducer from "../features/lists/listsSlice";
import selectedTabReducer from "../features/selectedTab/selectedTabSlice";

export default configureStore({
  reducer: {
    workspaces: workspacesReducer,
    lists: listsReducer,
    selectedTab: selectedTabReducer,
  },
});
