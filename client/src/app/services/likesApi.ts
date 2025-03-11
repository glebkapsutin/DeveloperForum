/**
 * ���� � DTO, ��������������� ������� �������.
 */
import {Likes} from "../types";
import { api } from "./api";

export const likesApi = api.injectEndpoints({
    endpoints: (builder) => ({
      likePost: builder.mutation<{ message: string }, { postId: number; userId: number }>({
        query: (body) => ({
          url: "/Likes/like",
          method: "POST",
          body,
        }),
      }),
      unlikePost: builder.mutation<{ message: string }, { postId: number; userId: number }>({
        query: (body) => ({
          url: `/Likes/unlike`,
          method: "DELETE",
          body,
        }),
      }),
    }),
  })
  
  export const { useLikePostMutation, useUnlikePostMutation } = likesApi
  
  export const {
    endpoints: { likePost, unlikePost },
  } = likesApi