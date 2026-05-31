import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { tasksApi } from "../api/tasksApi";

import type { RootState } from "./index";
import type { Task, TaskStatus, UpdateTaskPayload } from "../types/task";

type TasksState = {
  items: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
    },
    addTask(state, action: PayloadAction<Task>) {
      state.items.push(action.payload);
    },
    updateTask(
      state,
      action: PayloadAction<{ id: string; changes: UpdateTaskPayload }>,
    ) {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.changes,
        };
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    completeTask(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.items[index].status = "completed";
      }
    },
    setTasksLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTasksError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearTasksError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tasksApi.endpoints.getTasks.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      },
    );
    builder.addMatcher(tasksApi.endpoints.getTasks.matchPending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(
      tasksApi.endpoints.getTasks.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load tasks";
      },
    );
    builder.addMatcher(
      tasksApi.endpoints.createTask.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
      },
    );
    builder.addMatcher(
      tasksApi.endpoints.updateTask.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      },
    );
    builder.addMatcher(
      tasksApi.endpoints.completeTask.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      },
    );
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  removeTask,
  completeTask,
  setTasksLoading,
  setTasksError,
  clearTasksError,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.items;
export const selectTasksByStatus = (state: RootState, status: TaskStatus) =>
  state.tasks.items.filter((t) => t.status === status);
export const selectOverdueTasks = (state: RootState) =>
  state.tasks.items.filter(
    (t) =>
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "completed",
  );
export const selectTasksLoading = (state: RootState) => state.tasks.loading;
export const selectTasksError = (state: RootState) => state.tasks.error;
export const selectTaskById = (state: RootState, id: string) =>
  state.tasks.items.find((t) => t.id === id);

export default tasksSlice.reducer;
