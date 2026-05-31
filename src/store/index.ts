import { configureStore, type Middleware } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import { baseApi } from "../api/baseApi";

import clientsReducer from "./clientsSlice";
import dealsSlice from "./dealsSlice";
import tasksReducer from "./tasksSlice";
import userReducer, { logout, setUser, updateUser } from "./userSlice";

const USER_STORAGE_KEY = "currentUser";

const userPersistenceMiddleware: Middleware = () => (next) => (action) => {
  const result = next(action);

  if (setUser.match(action)) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(action.payload));
  } else if (updateUser.match(action) && action.payload) {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      const current = JSON.parse(saved);
      localStorage.setItem(
        USER_STORAGE_KEY,
        JSON.stringify({ ...current, ...action.payload }),
      );
    }
  } else if (logout.match(action)) {
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  return result;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    clients: clientsReducer,
    deals: dealsSlice,
    tasks: tasksReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      userPersistenceMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
