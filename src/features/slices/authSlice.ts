import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, initialState } from '../types/authTypes';
import { LogOut, LoginUser, getMe } from '../thunks/authThunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      LoginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      },
    );
    builder.addCase(
      LoginUser.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? 'An error occurred';
      },
    );
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(
      getMe.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload ?? 'An error occurred';
      },
    );

    builder.addCase(LogOut.pending, (state) => {
      state.user = null;
      state.isLoading = true;
    });
    builder.addCase(LogOut.rejected, (state) => {
      state.user = null;
      state.isLoading = false;
      state.isError = true;
      state.message = 'An error occurred';
    });
    builder.addCase(LogOut.fulfilled, (state) => {
      state.user = null;
      state.isLoading = false;
      state.isSuccess = true;
      state.message = 'Logout success';
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
