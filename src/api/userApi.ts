import { baseApi } from "./baseApi";

import type {
  LoginPayload,
  RegisterPayload,
  User,
  UserProfile,
} from "../types/user";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

    loginUser: builder.mutation<UserProfile, LoginPayload>({
      queryFn: async (credentials, _queryApi, _extraOptions, baseQuery) => {
        const result = await baseQuery(
          `/users?email=${encodeURIComponent(credentials.email)}`,
        );

        if (result.error) {
          return { error: result.error };
        }

        const users = result.data as User[];
        const existingUser = users.find((u) => u.email === credentials.email);

        if (!existingUser) {
          return {
            error: {
              status: 401,
              data: {
                message:
                  "Пользователь с таким email не найден. Требуется регистрация",
              },
            },
          };
        }

        if (existingUser.password !== credentials.password) {
          return {
            error: {
              status: 401,
              data: { message: "Неверный пароль" },
            },
          };
        }

        const profile: UserProfile = {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          createdAt: existingUser.createdAt,
          surname: existingUser.surname ?? "",
          accName: existingUser.accName ?? existingUser.name,
          avatar: existingUser.avatar,
        };

        return { data: profile };
      },
    }),

    registerUser: builder.mutation<UserProfile, RegisterPayload>({
      queryFn: async (payload, _queryApi, _extraOptions, baseQuery) => {
        const checkResult = await baseQuery(
          `/users?email=${encodeURIComponent(payload.email)}`,
        );

        if (checkResult.error) {
          return { error: checkResult.error };
        }

        const existingUsers = checkResult.data as User[];
        if (existingUsers.length > 0) {
          return {
            error: {
              status: 409,
              data: { message: "Пользователь с таким email уже существует" },
            },
          };
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          email: payload.email,
          password: payload.password,
          name: payload.name,
          createdAt: new Date().toISOString(),
        };

        const createResult = await baseQuery({
          url: "/users",
          method: "POST",
          body: newUser,
        });

        if (createResult.error) {
          return { error: createResult.error };
        }

        const createdUser = createResult.data as User;
        const profile: UserProfile = {
          id: createdUser.id,
          email: createdUser.email,
          name: createdUser.name,
          createdAt: createdUser.createdAt,
          surname: payload.surname,
          accName: payload.accName,
        };

        return { data: profile };
      },
      invalidatesTags: ["Users"],
    }),

    updateUser: builder.mutation<
      User,
      { id: string; changes: Partial<User>; currentPassword?: string }
    >({
      queryFn: async (
        { id, changes, currentPassword },
        _queryApi,
        _extraOptions,
        baseQuery,
      ) => {
        if (changes.password) {
          const userResult = await baseQuery(`/users/${id}`);

          if (userResult.error) {
            return { error: userResult.error };
          }

          const user = userResult.data as User;

          if (currentPassword && user.password !== currentPassword) {
            return {
              error: {
                status: 400,
                data: {
                  message: "Неверный текущий пароль",
                  field: "currentPassword",
                },
              },
            };
          }
        }

        const updateResult = await baseQuery({
          url: `/users/${id}`,
          method: "PATCH",
          body: changes,
        });

        if (updateResult.error) {
          return { error: updateResult.error };
        }

        return { data: updateResult.data as User };
      },
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
