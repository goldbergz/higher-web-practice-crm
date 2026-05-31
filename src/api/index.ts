export { baseApi } from "./baseApi";

export {
  clientsApi,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "./clientsApi";

export {
  dealsApi,
  useGetDealsQuery,
  useCreateDealMutation,
  useUpdateDealMutation,
  useCompleteDealMutation,
  useCancelDealMutation,
} from "./dealsApi";

export {
  tasksApi,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useCompleteTaskMutation,
} from "./tasksApi";

export {
  userApi,
  useGetUsersQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "./userApi";
