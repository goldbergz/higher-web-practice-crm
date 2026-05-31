import { baseApi } from "./baseApi";

import type { Task, CreateTaskPayload, UpdateTaskPayload } from "../types/task";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),

    createTask: builder.mutation<
      Task,
      CreateTaskPayload & { createdBy: string }
    >({
      query: (payload) => ({
        url: "/tasks",
        method: "POST",
        body: {
          ...payload,
          id: crypto.randomUUID(),
          status: "new",
          createdAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<
      Task,
      { id: string; changes: UpdateTaskPayload }
    >({
      query: ({ id, changes }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Tasks"],
    }),

    completeTask: builder.mutation<Task, string>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status: "completed" },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
} = tasksApi;
