import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import clientsReducer from './clientsSlice';
import tasksReducer from './tasksSlice';
import userReducer from './userSlice';
import dealsSlice from './dealsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    clients: clientsReducer,
    deals: dealsSlice,
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
