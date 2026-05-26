import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { mockClients } from "../mocks/clients";

import type { RootState } from "./index";
import type { Client, UpdateClientPayload } from "../types/client";

type ClientsState = {
  items: Client[];
  loading: boolean;
  error: string | null;
};

const initialState: ClientsState = {
  items: [],
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    loadClients(state) {
      state.items = mockClients;
    },
    setClients(state, action: PayloadAction<Client[]>) {
      state.items = action.payload;
    },
    addClient(state, action: PayloadAction<Client>) {
      state.items.push(action.payload);
    },
    updateClient(
      state,
      action: PayloadAction<{ id: string; changes: UpdateClientPayload }>,
    ) {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.changes,
        };
      }
    },
    deleteClient(state, action: PayloadAction<string>) {
      const index = state.items.findIndex((c) => c.id === action.payload);
      if (index !== -1) {
        state.items[index].deleted = true;
      }
    },
    setClientsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setClientsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearClientsError(state) {
      state.error = null;
    },
  },
});

export const {
  loadClients,
  setClients,
  addClient,
  updateClient,
  deleteClient,
  setClientsLoading,
  setClientsError,
  clearClientsError,
} = clientsSlice.actions;

export const selectClients = (state: RootState) => state.clients.items;
export const selectActiveClients = (state: RootState) =>
  state.clients.items.filter((c) => !c.deleted);
export const selectClientsLoading = (state: RootState) => state.clients.loading;
export const selectClientsError = (state: RootState) => state.clients.error;
export const selectClientById = (state: RootState, id: string) =>
  state.clients.items.find((c) => c.id === id);

export default clientsSlice.reducer;
