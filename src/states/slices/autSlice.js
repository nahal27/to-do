import { createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from './authThunk';
const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isLoading: false,
      userInfo: [],
      error: null,
   },
   reducers: {

   },
   extraReducers: (builder) => {
      builder
         .addCase(signup.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(signup.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
         })
         .addCase(signup.rejected, (state) => {
            state.isLoading = false;
         })
         .addCase(login.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userInfo = action.payload;
         })
         .addCase(login.rejected, (state) => {
            state.isLoading = false;
         })
         .addCase(logout.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(logout.fulfilled, (state) => {
            state.isLoading = false;
            state.userInfo = [];
         })
         .addCase(logout.rejected, (state) => {
            state.isLoading = false;
         })
   }

})


export default authSlice.reducer;
