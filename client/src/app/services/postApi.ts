/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        // Создание поста
        createPost: builder.mutation<Post, Omit<Post, "id" | "createdDate">>({
            query: (postData) => ({
                url: "/Post",
                method: "POST",
                body: postData,
            }),
        }),

        // Получение всех постов
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: "/Post",
                method: "GET",
            }),
        }),

        // Получение поста по ID
        getPostById: builder.query<Post, number>({
            query: (id) => ({
                url: `/Post/${id}`,
                method: "GET",
            }),
        }),

        // Удаление поста
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `/Post/${id}`,
                method: "DELETE",
            }),
        }),

        // Обновление поста (обновляем только title и description)
        updatePost: builder.mutation<Post, { id: number; data: Pick<Post, "title" | "description"> }>({
            query: ({ id, data }) => ({
                url: `/Post/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetPostByIdQuery,
    useDeletePostMutation,
    useUpdatePostMutation,
    useLazyGetAllPostsQuery,
    useLazyGetPostByIdQuery,
} = postApi;

export const {
    endpoints: { createPost, getAllPosts, getPostById, deletePost, updatePost },
} = postApi;
