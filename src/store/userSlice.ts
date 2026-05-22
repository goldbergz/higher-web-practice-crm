import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { UserProfile } from '../types/user';
import type { RootState } from './index';

type UserState = {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserProfile>) {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setUserLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUserError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateUser(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    clearUserError(state) {
      state.error = null;
    },
  },
});

export const { setUser, logout, setUserLoading, setUserError, updateUser, clearUserError } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
