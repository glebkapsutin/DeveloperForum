/* eslint-disable @typescript-eslint/consistent-type-imports */
import { CommentDto } from "../types";
import { api } from "./api";

export const commentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        
        createComment: builder.mutation<CommentDto, Omit<CommentDto, "id" >>({
            query: (commentData) => ({
                url: "/Comment",
                method: "POST",
                body: commentData,
            }),
        }),

        
        getAllComments: builder.query<CommentDto[], void>({
            query: () => ({
                url: "/Comment",
                method: "GET",
            }),
        }),

       
        getCommentById: builder.query<CommentDto, number>({
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

        updateComment: builder.mutation<CommentDto, { id: number; data: Pick<CommentDto, "description"> }>({
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
