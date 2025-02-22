/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Comment } from "../types";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        
        createComment: builder.mutation<Comment, Omit<Comment, "id" | "createdDate">>({
            query: (commentData) => ({
                url: "/Comment",
                method: "POST",
                body: commentData,
            }),
        }),

        
        getAllComments: builder.query<Comment[], void>({
            query: () => ({
                url: "/Comment",
                method: "GET",
            }),
        }),

       
        getCommentById: builder.query<Comment, number>({
            query: (commentId) => ({
                url: `/Comment/${commentId}`,
                method: "GET",
            }),
        }),

        
        deleteComment: builder.mutation<void, number>({
            query: (commentId) => ({
                url: `/Comment/${commentId}`,
                method: "DELETE",
            }),
        }),

        updateComment: builder.mutation<Comment, { id: number; data: Pick<Comment, "description"> }>({
            query: ({ id, data }) => ({
                url: `/Comment/${id}`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {
    useCreateCommentMutation,
    useGetAllCommentsQuery,
    useGetCommentByIdQuery,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
} = commentApi;

export const {
    endpoints: { createComment, getAllComments, getCommentById, deleteComment, updateComment },
} = commentApi;
