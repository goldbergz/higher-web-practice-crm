import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { dealsApi } from "../api/dealsApi";

import type { RootState } from "./index";
import type { Deal, DealStatus, UpdateDealPayload } from "../types/deal";

type DealsState = {
  items: Deal[];
  loading: boolean;
  error: string | null;
};

const initialState: DealsState = {
  items: [],
  loading: false,
  error: null,
};

const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setDeals(state, action: PayloadAction<Deal[]>) {
      state.items = action.payload;
    },
    addDeal(state, action: PayloadAction<Deal>) {
      state.items.push(action.payload);
    },
    updateDeal(
      state,
      action: PayloadAction<{ id: string; changes: UpdateDealPayload }>,
    ) {
      const index = state.items.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.changes,
        };
      }
    },
    completeDeal(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((d) => d.id === action.payload);
      if (index !== -1) {
        state.items[index].status = "completed";
        state.items[index].completedAt = new Date().toISOString().split("T")[0];
      }
    },
    cancelDeal(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((d) => d.id === action.payload);
      if (index !== -1) {
        state.items[index].status = "cancelled";
      }
    },
    setDealsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setDealsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearDealsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      dealsApi.endpoints.getDeals.matchFulfilled,
      (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
      },
    );
    builder.addMatcher(dealsApi.endpoints.getDeals.matchPending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addMatcher(
      dealsApi.endpoints.getDeals.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to load deals";
      },
    );
    builder.addMatcher(
      dealsApi.endpoints.createDeal.matchFulfilled,
      (state, action) => {
        state.items.push(action.payload);
      },
    );
    builder.addMatcher(
      dealsApi.endpoints.updateDeal.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      },
    );
    builder.addMatcher(
      dealsApi.endpoints.completeDeal.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      },
    );
    builder.addMatcher(
      dealsApi.endpoints.cancelDeal.matchFulfilled,
      (state, action) => {
        const index = state.items.findIndex((d) => d.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      },
    );
  },
});

export const {
  setDeals,
  addDeal,
  updateDeal,
  completeDeal,
  cancelDeal,
  setDealsLoading,
  setDealsError,
  clearDealsError,
} = dealsSlice.actions;

export const selectDeals = (state: RootState) => state.deals.items;
export const selectDealsByStatus = (state: RootState, status: DealStatus) =>
  state.deals.items.filter((d) => d.status === status);
export const selectActiveDeals = (state: RootState) =>
  state.deals.items.filter(
    (d) => d.status === "new" || d.status === "in_progress",
  );
export const selectCompletedDeals = (state: RootState) =>
  state.deals.items.filter((d) => d.status === "completed");
export const selectDealsLoading = (state: RootState) => state.deals.loading;
export const selectDealsError = (state: RootState) => state.deals.error;
export const selectDealById = (state: RootState, id: string) =>
  state.deals.items.find((d) => d.id === id);

export default dealsSlice.reducer;
