import { baseApi } from "./baseApi";

import type { Deal, CreateDealPayload, UpdateDealPayload } from "../types/deal";

export const dealsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDeals: builder.query<Deal[], void>({
      query: () => "/deals",
      providesTags: ["Deals"],
    }),

    createDeal: builder.mutation<
      Deal,
      CreateDealPayload & { createdBy: string }
    >({
      query: (payload) => ({
        url: "/deals",
        method: "POST",
        body: {
          ...payload,
          id: crypto.randomUUID(),
          status: "new",
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Deals"],
    }),

    updateDeal: builder.mutation<
      Deal,
      { id: string; changes: UpdateDealPayload }
    >({
      query: ({ id, changes }) => ({
        url: `/deals/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Deals"],
    }),

    completeDeal: builder.mutation<Deal, string>({
      query: (id) => ({
        url: `/deals/${id}`,
        method: "PATCH",
        body: {
          status: "completed",
          completedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Deals"],
    }),

    cancelDeal: builder.mutation<Deal, string>({
      query: (id) => ({
        url: `/deals/${id}`,
        method: "PATCH",
        body: { status: "cancelled" },
      }),
      invalidatesTags: ["Deals"],
    }),
  }),
});

export const {
  useGetDealsQuery,
  useCreateDealMutation,
  useUpdateDealMutation,
  useCompleteDealMutation,
  useCancelDealMutation,
} = dealsApi;
