import { configureStore } from '@reduxjs/toolkit';
import TaskSlice from './slices/task.Slice'
import AuthSlice from './slices/autSlice'
const store = configureStore({
  reducer: {
    auth: AuthSlice,
    task: TaskSlice
  },
});

export default store;
