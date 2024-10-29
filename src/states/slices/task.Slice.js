import { createSlice } from '@reduxjs/toolkit';
import { createTask, deleteAllTasks, deleteByID, getAllTasks } from './taskThunk';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        isLoading: false,
        tasks: [],
        error: null,
    },

    reducers: {
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
      

    },

    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getAllTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteAllTasks.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAllTasks.fulfilled, (state) => {
                state.isLoading = false;
                state.tasks = []
            })
            .addCase(deleteAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteByID.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteByID.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteByID.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });

    },
});
export const { removeTask } = taskSlice.actions;
export default taskSlice.reducer;
