// src/app/services/userApi.ts
import { api } from "./api";
import { User, LoginRequest, RegisterRequest } from "../types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, LoginRequest>({
      query: (userData) => ({
        url: "/Auth/login",
        method: "POST",
        body: userData,
      }),
    }),
    register: builder.mutation<{ token: string }, RegisterRequest>({
      query: (userData) => ({
        url: "/Auth/register",
        method: "POST",
        body: userData,
      }),
    }),
    currentUser: builder.query<User, void>({
      // Предполагается, что на бэкенде существует маршрут для получения данных текущего пользователя
      query: () => ({
        url: "/User",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useCurrentUserQuery } =
  userApi;
