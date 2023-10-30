import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import taskReducer from "../features/taskSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define RootState type

export default store;
