/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Post } from "../types";
import { api } from "./api";

export const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
       
        createPost: builder.mutation<Post, Omit<Post, "id" | "createdDate" | "comments" | "user" | "likes">>({
            query: (postData) => ({
                url: "/Post",
                method: "POST",
                body: postData,
            }),
        }),

        
        getAllPosts: builder.query<Post[], void>({
            query: () => ({
                url: "/Post",
                method: "GET",
            }),
        }),

        
        getPostById: builder.query<Post, number>({
            query: (id) => ({
                url: `/Post/${id}`,
                method: "GET",
            }),
        }),

        
        deletePost: builder.mutation<void, number>({
            query: (id) => ({
                url: `/Post/${id}`,
                method: "DELETE",
            }),
        }),

        
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
