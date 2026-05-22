import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Deal, DealStatus, UpdateDealPayload } from '../types/deal';
import type { RootState } from './index';

type TransactionsState = {
  items: Deal[];
  loading: boolean;
  error: string | null;
};

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<Deal[]>) {
      state.items = action.payload;
    },
    addTransaction(state, action: PayloadAction<Deal>) {
      state.items.push(action.payload);
    },
    updateTransaction(state, action: PayloadAction<{ id: string; changes: UpdateDealPayload }>) {
      const index = state.items.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload.changes };
      }
    },
    removeTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter((d) => d.id !== action.payload);
    },
    setTransactionsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTransactionsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearTransactionsError(state) {
      state.error = null;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  removeTransaction,
  setTransactionsLoading,
  setTransactionsError,
  clearTransactionsError,
} = transactionsSlice.actions;

export const selectTransactions = (state: RootState) => state.transactions.items;
export const selectTransactionsByStatus = (state: RootState, status: DealStatus) =>
  state.transactions.items.filter((d) => d.status === status);
export const selectActiveTransactions = (state: RootState) =>
  state.transactions.items.filter((d) => d.status === 'new' || d.status === 'in_progress');
export const selectCompletedTransactions = (state: RootState) =>
  state.transactions.items.filter((d) => d.status === 'completed');
export const selectTransactionsLoading = (state: RootState) => state.transactions.loading;
export const selectTransactionsError = (state: RootState) => state.transactions.error;
export const selectTransactionById = (state: RootState, id: string) =>
  state.transactions.items.find((d) => d.id === id);

export default transactionsSlice.reducer;
