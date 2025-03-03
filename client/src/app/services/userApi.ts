/* eslint-disable @typescript-eslint/consistent-type-imports */
// src/app/services/userApi.ts
import { api } from "./api";
import {
    LoginRequest,
    RegistrationRequest,
    AuthResult,
    UserDto
} from "../types";

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // 1. POST /api/Auth/login
        login: builder.mutation<AuthResult, LoginRequest>({
            query: (loginData) => ({
                url: "/Auth/login",
                method: "POST",
                body: loginData,
            }),
        }),
        // 2. POST /api/Auth/register
        registerUser: builder.mutation<AuthResult, RegistrationRequest>({
            query: (registerData) => ({
                url: "/Auth/register",
                method: "POST",
                body: registerData,
            }),
        }),
        // 3. GET /api/User (��������� ������ �������������)
        getUsers: builder.query<UserDto[], void>({
            query: () => ({
                url: "/User",
                method: "GET",
            }),
        }),
        // 4. POST /api/User (�������� ������ ������������)
        createUser: builder.mutation<UserDto, Partial<UserDto>>({
            query: (newUser) => ({
                url: "/User",
                method: "POST",
                body: newUser,
            }),
        }),
        // 5. GET /api/User/{id} (��������� ������������ �� ID)
        getUserById: builder.query<UserDto, number>({
            query: (id) => ({
                url: `/User/${id}`,
                method: "GET",
            }),
        }),
        // 6. DELETE /api/User/{id} (�������� ������������ �� ID)
        deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/User/${id}`,
                method: "DELETE",
            }),
        }),
        // 7. PUT /api/User/{id} (���������� ������ ������������)
        updateUser: builder.mutation<UserDto, { id: number; userData: Partial<UserDto> }>({
            query: ({ id, userData }) => ({
                url: `/User/${id}`,
                method: "PUT",
                body: userData,
            }),
        }),
        current: builder.query<UserDto,void>({
            query: ()=> ({
                url:`/User/current`,
                method: "GET"
            })
        })
    }),
});

export const {
    useLoginMutation,
    useRegisterUserMutation,
    useGetUsersQuery,
    useCreateUserMutation,
    useGetUserByIdQuery,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useCurrentQuery
} = userApi;
export const {
    endpoints: { login, registerUser, current, getUserById, updateUser,getUsers,createUser}
  } = userApi;