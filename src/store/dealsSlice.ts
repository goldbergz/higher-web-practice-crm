import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Deal, DealStatus, UpdateDealPayload } from "../types/deal";
import { mockDeals } from "../mocks/deals";
import type { RootState } from "./index";

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
    loadDeals(state) {
      state.items = mockDeals;
    },
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
});

export const {
  loadDeals,
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
