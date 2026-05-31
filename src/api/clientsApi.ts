import { baseApi } from "./baseApi";

import type {
  Client,
  CreateClientPayload,
  UpdateClientPayload,
} from "../types/client";

export const clientsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => "/clients",
      providesTags: ["Clients"],
    }),

    createClient: builder.mutation<
      Client,
      CreateClientPayload & { createdBy: string }
    >({
      query: (payload) => ({
        url: "/clients",
        method: "POST",
        body: {
          ...payload,
          id: crypto.randomUUID(),
          deleted: false,
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Clients"],
    }),

    updateClient: builder.mutation<
      Client,
      { id: string; changes: UpdateClientPayload }
    >({
      query: ({ id, changes }) => ({
        url: `/clients/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Clients"],
    }),

    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "PATCH",
        body: { deleted: true },
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
